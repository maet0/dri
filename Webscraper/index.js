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

var driUrl;


function runTagScraper() {
    var invoked = false
    var process = childProcess

    // listen for errors
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true
        callback(err)
    })
}

// Scrape for Google/Facebook/LinkedIn Tags
function scrapeTags() {

    (async () => {
        console.log(driUrl)
        const config = {
            baseSiteUrl: `${driUrl}`,
            startUrl: `${driUrl}`,
            removeStyleAndScriptTags: false //Telling the scraper NOT to remove style and script tags
        }

        const getPageHtml = (html, pageAddress) => {//Saving the HTML file, using the page address as a name.

            if (!directoryExists) {
                fs.mkdirSync('./html');
                directoryExists = true;
            }
            const name = sanitize(pageAddress)
            fs.writeFile(`./html/${name}.html`, html, () => { })
        }

        const scraper = new Scraper(config);
        const root = new Root({});
        await scraper.scrape(root);
    })()

}

app.use(cors())

app.get('/', function (req, res) {
    res.json('This is our DRI Webscraper')
})

app.get('/getDRI', function (req, res) {
    let user = JSON.parse(req.query.user);
    let company = JSON.parse(req.query.company);
    if (company.website) {
        var compdata
        const pgsUrl = `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?category=ACCESSIBILITY&category=PERFORMANCE&category=SEO&locale=pt&strategy=DESKTOP&url=${company.website}&prettyPrint=true&key=${pgsAuthKey}`
        var karriereseite = false;
        // scrapeTags(karriereseite)

        axios(pgsUrl).then(response => {
            compdata = response.data
            res.send(response.data.lighthouseResult.categories)
            console.log(response.data.lighthouseResult.categories.performance.score + " : Performance")
            console.log(response.data.lighthouseResult.categories.accessibility.score + " : Barrierefreiheit")
            console.log(response.data.lighthouseResult.categories.seo.score + " : SEO Rating")
        })
    } else {
        // Auf Google nach Website suchen
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
            const url = $(this).find('a').attr('href')
            const website = $(this).find('[itemprop=url]').text()

            companies.push({ title, street, zip, city, website, url })

            driUrl = website
        })
        res.json(companies)
    }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
