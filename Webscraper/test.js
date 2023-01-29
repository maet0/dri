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
const { parse } = require('node-html-parser');
var html1;
/* 
getGoogleImage("Spectory OG Waltherstraße")

async function getGoogleImage(searchTerm) {
    console.log("searching for "+searchTerm)
    const response = await axios.get(`https://www.google.com/search?q=${searchTerm}&tbm=isch`)
        const $ = cheerio.load(response.data);
        return $('img').first().attr('src');
}
 */
gaga("Ligensa")

function gaga(company) {
    console.log(company);
    axios(`https://www.google.com/search?q=${company}`)
        .then(res => {
            html1 = parse(res.data)
            console.log(html1.querySelector('.egMi0 a').rawAttributes)
            const html = res.data;
            const $ = cheerio.load(html);
            $('.yuRUbf').each(() => {
                console.log("searching");
                console.log($(this).find('a'));
                // Hier können Sie das gefundene Ergebnis verarbeiten und 
                // den Rest des Codes ausführen, wenn es erforderlich ist
            });
        })
}