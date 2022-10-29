const PORT = 8000 
const axios = require('axios') 
const cheerio = require('cheerio') 
const express = require('express') 
const app = express() 
const cors = require('cors')
const pgsAuthKey = 'AIzaSyDCqSuQrMeDBvf-srs7SL4cyPL-4YvsCUA'
const https = require('https')



app.use(cors()) 

app.get('/', function (req, res) { 
    res.json('This is our DRI Webscraper') 
}) 

app.get('/getDRI', function (req, res) { 
    var compdata
    const pgsUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${req.query.text}&key=${pgsAuthKey}`

    axios(pgsUrl).then(response => {
        console.log(response.data)
        compdata = response.data
    }).then(res.send(compdata))
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