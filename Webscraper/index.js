const PORT = 8000 
const axios = require('axios') 
const cheerio = require('cheerio') 
const express = require('express') 
const app = express() 
const cors = require('cors') 

app.use(cors()) 

app.get('/', function (req, res) { 
    res.json('This is my webscraper') 
}) 

app.get('/results', (req, res) => {
    let querytext = req.query?.text; 
    const url = `https://firmen.wko.at/${querytext}` 
    console.log(req.query.text) 
    axios(url).then(response => {
        const html = response.data 
        const $ = cheerio.load(html) 
        let companies = [] 
        $('article', html).each(function () { //<-- cannot be a function expression
            const title = $(this).find('h3').text() 
            const street = $(this).find('.street').text() 
            const zip = $(this).find('.zip').text() 
            const city = $(this).find('.locality').text() 
            const url = $(this).find('a').attr('href') 
            companies.push({ title, street, zip, city, url })
        }) 
        res.json(companies)
    }).catch(err => console.log(err))
}) 

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))