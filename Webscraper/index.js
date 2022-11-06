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

function runTagScraper(){
    var invoked = false
    var process = childProcess

    // listen for errors
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true
        callback(err)
    })
}
function scrapeTags(){

    (async () => {
        const config = {
            baseSiteUrl: `https://www.profesia.sk`,
            startUrl: `https://www.profesia.sk/praca/`,
            removeStyleAndScriptTags: false//Telling the scraper NOT to remove style and script tags, cause i want it in my html files, for this example.        
        }
    
        let directoryExists;
    
        const getPageHtml = (html, pageAddress) => {//Saving the HTML file, using the page address as a name.
    
            if(!directoryExists){
                fs.mkdirSync('./html');
                directoryExists = true;
            }
            const name = sanitize(pageAddress)
            fs.writeFile(`./html/${name}.html`, html, () => { })
        }
    
        const scraper = new Scraper(config);
    
        const root = new Root({});
    
        const jobAds = new OpenLinks('.list-row h2 a', { getPageHtml });//Opens every job ad, and calls a hook after every page is done.
    
        root.addOperation(jobAds);
    
        await scraper.scrape(root);
    })() 

}

app.use(cors()) 

app.get('/', function (req, res) { 
    res.json('This is our DRI Webscraper') 
}) 

app.get('/getDRI', function (req, res) { 
    var compdata
    const pgsUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${req.query.text}&key=${pgsAuthKey}`

    scrapeTags()

    axios(pgsUrl).then(response => {
        console.log(response.data)
        compdata = response.data
        res.send(compdata)
    })
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

            companies.push({ title, street, zip, city,website, url })
        }) 
        res.json(companies)
    }).catch(err => console.log(err))
}) 

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
