const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
const pgsAuthKey = 'AIzaSyDCqSuQrMeDBvf-srs7SL4cyPL-4YvsCUA'
const sanitize = require('sanitize-filename');//Using this npm module to sanitize file names.
const fs = require('fs');
const { Scraper, Root, OpenLinks } = require('nodejs-web-scraper');
const Crawler = require('node-html-crawler');
var driUrl;
const request = require('request');
var mysql = require('mysql');



async function crawlGoogleImage(searchTerm) {
    const axios = require('axios');
    const cheerio = require('cheerio');
    const searchUrl = `https://www.google.com/search?q=${searchTerm}&tbm=isch`;
    const response = await axios.get(searchUrl);
    const $ = cheerio.load(response.data);
    const firstImage = $('img').first();
    return firstImage.attr('src');
  }

function parseHtmlBody(htmlBody) {
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(htmlBody);
    const document = dom.window.document;
    return document.documentElement.innerHTML;
  }

const searchString = (input, search) => {
    if (input.indexOf(search) !== -1) {
      // If the search string is found, return true
      return true;
    } else {
      // If the search string is not found, return false
      return false;
    }
  }

var connection = mysql.createConnection({
    database: 'k005779_24_dri',
    host: 'localhost',
    user: 'root'
});

  function setDataWithoutUser (data)  {
    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connected to the MySQL database');
      });
      
}

 function setDataWithUser(props){
    console.log("First name", props);


    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connected to the MySQL database');
      });
      
// Create the INSERT statement
const sql = "INSERT INTO contact (first_name, last_name, email, telnr) VALUES (?,?,?,?)";
connection.query(sql, [props.surname, props.last_name, props.email, props.phone],(error, results, fields) => {
  if(error) throw error;

});

      connection.end();
}

    function runTagScraper(toScrape) {
    var score = 0;
    console.log(toScrape);
    request(toScrape, function (err,res,body){
    if(err){
        console.log(err, "Error occurred while fetching html")
    }
    else 
    {
        const GTSearch = 'https://www.googletagmanager.com/gtm.js';
        const LISearch = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
        const FBSearch = 'https://connect.facebook.net';
        const inputString = parseHtmlBody(body);
        const isGT = searchString(inputString, GTSearch);
        const isLI = searchString(inputString, LISearch);
        const isFB = searchString(inputString, FBSearch);

        console.log('isGT', isGT);

        if(isGT){
            score += 1;
        }
        if (isLI) {
            score += 1;
        } 
        if (isFB) {
            score += 1;
        }
        console.log(score);
    }

});
return score; 

}

app.use(cors())

app.get('/', function (req, res) {
    res.json('This is our DRI Webscraper')
})

app.get('/getDRI', function (req, res) {

    var totalDRI = 0;

    // User und Company Objekte wurden als String verschickt -> in JSON parsen
    let user = JSON.parse(req.query.user);
    let company = JSON.parse(req.query.company)
    console.log("User", user.surname);
    if(user) {
        setDataWithUser(user)
    }

    if (company.website) {
        var compdata
        const pgsUrl = `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?category=ACCESSIBILITY&category=PERFORMANCE&category=SEO&locale=pt&strategy=DESKTOP&url=${company.website}&prettyPrint=true&key=${pgsAuthKey}`
        var karriereseite = false;
        var tagscore = runTagScraper(company.website)

        axios(pgsUrl).then(response => {
            compdata = response.data
            console.log(response.data.lighthouseResult.categories.performance.score + " : Performance")
            console.log(response.data.lighthouseResult.categories.accessibility.score + " : Barrierefreiheit")
            console.log(response.data.lighthouseResult.categories.seo.score + " : SEO Rating")
            console.log(typeof JSON.parse(response.data.lighthouseResult.categories.performance.score));
            console.log('Tagscore', tagscore)
            totalDRI = totalDRI + +response.data.lighthouseResult.categories.performance.score * 25 + 
                                    +response.data.lighthouseResult.categories.accessibility.score * 25 + 
                                     +response.data.lighthouseResult.categories.seo.score * 25 + (tagscore * 10);
            console.log("The following DRI was achieved: ", totalDRI);
            res.send(JSON.stringify(totalDRI));
        })
    } else {
        axios(`https://www.google.com/search?q=${company.title}`).then(res => {
            const html = res.data;
            const $ = cheerio.load(html);
            // ToDo: Website finden
            $('.yuRUbf', html).each(() => {
                console.log($(this).find('a').attr('href'));
            })
        }).finally(() => {
            res.send(200);
        })
    }
})


app.get('/results', (req, res) => {
    let querytext = req.query?.text;
    const url = `https://firmen.wko.at/${querytext}`
    axios(url).then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        let companies = []
        $('article', html).each(function () {
            const title = $(this).find('h3').text()
            const street = $(this).find('.street').text()
            const zip = $(this).find('.zip').text()?.split(' ')[0]
            const city = $(this).find('.locality').text()
            const website = $(this).find('[itemprop=url]').text()
            
            companies.push({ title, street, zip, city, website })

            driUrl = website
        })
        res.json(companies);
    }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
