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

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'k005779_24@localhost',
    password: '5hst8E4ZAWr5',
});

  function setDataWithoutUser (data)  {
    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connected to the MySQL database');
      });
      
}

 function setDataWithUser({firstname, lastname, email, telnr}){


    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connected to the MySQL database');
      });
      
connection.query(`INSERT INTO contact (first_name, last_name, email, telnr) VALUES (${mysql.escape(firstname)},${mysql.escape(lastname)},${mysql.escape(email)},${mysql.escape(telnr)})`, (error, results, fields) => {
  if(error) throw error;
  console.log("Results: "+ results);
  console.log("Fields: " +fields);
});

      connection.end();
}

function runTagScraper(toScrape) {
    console.log(toScrape);
    request(toScrape, function (err,res,body){
    if(err){
        console.log(err, "Error occurred while fetching html")
    }
    else 
    {
        /** console.log(body);
        let $ = cheerio.load(body);
        $('') */
    }
});

}

app.use(cors())

app.get('/', function (req, res) {
    res.json('This is our DRI Webscraper')
})

app.get('/getDRI', function (req, res) {

    // User und Company Objekte wurden als String verschickt -> in JSON parsen
    let user = JSON.parse(req.query.user);
    let company = JSON.parse(req.query.company)
    if(user) {
        setDataWithUser(user.surname, user.last_name, user.email, user.phone)
    }

    console.log(company);
    console.log(user);

    

    if (company.website) {
        var compdata
        const pgsUrl = `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?category=ACCESSIBILITY&category=PERFORMANCE&category=SEO&locale=pt&strategy=DESKTOP&url=${company.website}&prettyPrint=true&key=${pgsAuthKey}`
        var karriereseite = false;
        const tags = runTagScraper(company.website)

        axios(pgsUrl).then(response => {
            compdata = response.data
            res.send(response.data.lighthouseResult.categories)
            console.log(response.data.lighthouseResult.categories.performance.score + " : Performance")
            console.log(response.data.lighthouseResult.categories.accessibility.score + " : Barrierefreiheit")
            console.log(response.data.lighthouseResult.categories.seo.score + " : SEO Rating")
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
