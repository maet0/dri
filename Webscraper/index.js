const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
const pgsAuthKey = 'AIzaSyDCqSuQrMeDBvf-srs7SL4cyPL-4YvsCUA'
const fs = require('fs');
var driUrl;
const request = require('request');
var mysql = require('mysql');
const generateReport = require('./pdfgenerator/generatepdf');
const {parse} = require('node-html-parser');
var html1;


function parseHtmlBody(htmlBody) {
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(htmlBody);
    const document = dom.window.document;
    return document.documentElement.innerHTML;
}

function searchString(input, search) {
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

function setDataWithoutUser(data) {
    connection.connect(function (err) {
        if (err) throw err;
        console.log('Connected to the MySQL database');
    });

}

function setDataWithUser(props) {
    console.log("First name", props);


    connection.connect(function (err) {
        if (err) throw err;
        console.log('Connected to the MySQL database');
    });

    // Create the INSERT statement
    const sql = "INSERT INTO contact (first_name, last_name, email, telnr) VALUES (?,?,?,?)";
    connection.query(sql, [props.surname, props.last_name, props.email, props.phone], (error, results, fields) => {
        if (error) throw error;

    });

    connection.end();
}

function runTagScraper(toScrape) {
    try {
        const response = request(toScrape);
        const inputString = parseHtmlBody(response.body);

        const GTSearch = 'https://www.googletagmanager.com/gtm.js';
        const LISearch = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
        const FBSearch = 'https://connect.facebook.net';

        const isGT = searchString(inputString, GTSearch);
        const isLI = searchString(inputString, LISearch);
        const isFB = searchString(inputString, FBSearch);

        let score = 0;
        if (isGT) {
            score += 1;
        }
        if (isLI) {
            score += 1;
        }
        if (isFB) {
            score += 1;
        }

        const returnObj = {
            isGT: isGT,
            isFB: isFB,
            isLI: isLI,
            score: 0,
        };

        console.log("returnObj", returnObj)
        return returnObj;
    } catch (error) {
        console.error(error, 'Error occurred while fetching html');
    }
}


app.use(cors())

app.get('/', function (req, res) {
    res.json('This is our DRI Webscraper')
})

app.get('/getDRI', async function (req, respo) {

    var totalDRI = 0;

    // User und Company Objekte wurden als String verschickt -> in JSON parsen
    let user = JSON.parse(req.query.user);
    let company = JSON.parse(req.query.company)
    console.log("User", user.surname);
    /* if (user) {
        setDataWithUser(user)
    } */

    if (company.website == null || company.website == "" || company.website == " ") {
        console.log(company.title);
        axios(`https://www.google.com/search?q=${company.title}`)
          .then(res => {
            
            html1 = parse(res.data)
            const website = html1.querySelector('.egMi0 a').rawAttributes.href.substring(7)
            console.log(website)
            const html = res.data;
            const $ = cheerio.load(html);
            var search = company.title + " " + company.street
            console.log(getGoogleImage(search))
            var compdata;
            const pgsUrl = `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?category=ACCESSIBILITY&category=PERFORMANCE&category=SEO&locale=pt&strategy=DESKTOP&url=${website}&prettyPrint=true&key=${pgsAuthKey}`
            var karriereseite = false;
            let pathToPDF;
            var tagscore = runTagScraper(website)
            let data;
    
            axios(pgsUrl).then(response => {
                
                compdata = response.data
                console.log(response.data.lighthouseResult.categories.performance.score + " : Performance")
                console.log(response.data.lighthouseResult.categories.accessibility.score + " : Barrierefreiheit")
                console.log(response.data.lighthouseResult.categories.seo.score + " : SEO Rating")
                console.log(typeof JSON.parse(response.data.lighthouseResult.categories.performance.score));
                totalDRI = totalDRI + +response.data.lighthouseResult.categories.performance.score * 25 +
                    +response.data.lighthouseResult.categories.accessibility.score * 35 +
                    +response.data.lighthouseResult.categories.seo.score * 30 + (tagscore.score * 10);
                console.log("The following DRI was achieved: ", totalDRI);
    
                for (let i = 0; i < company.title.length; i++) {
                    console.log(company.title.charCodeAt(i));
                }
                console.log("title", JSON.stringify(company.title, '\u001f'));
                data = {
                    name: company.title,
                    url: company.website,
                    person: {
                        first_name: user.surname,
                        last_name: user.last_name,
                    },
                    stats: {
                        gtm: tagscore.isGT,
                        linkedin_inisght_tag: tagscore.isLI,
                        metapixel: tagscore.isFB,
                        performance: response.data.lighthouseResult.categories.performance.score,
                        seo: response.data.lighthouseResult.categories.seo.score,
                        accessibility: response.data.lighthouseResult.categories.accessibility.score
                    }
                }
            })
            .finally(() => {
                pathToPDF = generateReport(data);
                console.log("PathToPDF IS NOW ", pathToPDF)
                console.log("Test 2")
                console.log('Tagscore', tagscore)
                respo.statusCode = 200;
                respo.setHeader('Content-Type', 'application/json');
                respo.json({ score: totalDRI })
            })
          })
          .catch(err => {
            console.error(err);
          });
        }
        else 
        {
        var search = company.title + " " + company.street
        console.log(getGoogleImage(search))
        var compdata
        const pgsUrl = `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?category=ACCESSIBILITY&category=PERFORMANCE&category=SEO&locale=pt&strategy=DESKTOP&url=${company.website}&prettyPrint=true&key=${pgsAuthKey}`
        var karriereseite = false;
        let pathToPDF;
        var tagscore = runTagScraper(company.website)


        axios(pgsUrl).then(response => {
            compdata = response.data
            console.log(response.data.lighthouseResult.categories.performance.score + " : Performance")
            console.log(response.data.lighthouseResult.categories.accessibility.score + " : Barrierefreiheit")
            console.log(response.data.lighthouseResult.categories.seo.score + " : SEO Rating")
            console.log(typeof JSON.parse(response.data.lighthouseResult.categories.performance.score));
            totalDRI = totalDRI + +response.data.lighthouseResult.categories.performance.score * 25 +
                +response.data.lighthouseResult.categories.accessibility.score * 25 +
                +response.data.lighthouseResult.categories.seo.score * 25 + (tagscore.score * 10);
            console.log("The following DRI was achieved: ", totalDRI);

            for (let i = 0; i < company.title.length; i++) {
                console.log(company.title.charCodeAt(i));
            }
            console.log("title", JSON.stringify(company.title, '\u001f'));
            const data = {
                name: company.title,
                url: company.website,
                person: {
                    first_name: user.surname,
                    last_name: user.last_name,
                },
                stats: {
                    gtm: tagscore.isGT,
                    linkedin_inisght_tag: tagscore.isLI,
                    metapixel: tagscore.isFB,
                    performance: response.data.lighthouseResult.categories.performance.score,
                    seo: response.data.lighthouseResult.categories.seo.score,
                    accessibility: response.data.lighthouseResult.categories.accessibility.score
                }
            }
            console.log('Tagscore', tagscore)

            pathToPDF = generateReport(data);
            console.log("PathToPDF IS NOW ", pathToPDF)

        }).finally(() => {
            console.log("we lit 1")
           // fs.readFileSync(pathToPDF, (err, data) => {
               // if (err) return;
                respo.statusCode = 200;
                respo.setHeader('Content-Type', 'application/json');
                respo.json({ score: totalDRI, file: pathToPDF })
          //  })
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

async function getGoogleImage(searchTerm) {
    console.log("searching for "+searchTerm)
    const response = await axios.get(`https://www.google.com/search?q=${searchTerm}&tbm=isch`)
        const $ = cheerio.load(response.data);
        return $('img').first().attr('src');


}

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
