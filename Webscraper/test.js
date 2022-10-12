const sanitize = require('sanitize-filename');//Using this npm module to sanitize file names.
const fs = require('fs');
const { Scraper, Root, OpenLinks } = require('nodejs-web-scraper');

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

    const root = new Root({ pagination: { queryString: 'page_num', begin: 1, end: 100 } });

    const jobAds = new OpenLinks('.list-row h2 a', { getPageHtml });//Opens every job ad, and calls a hook after every page is done.

    root.addOperation(jobAds);

    await scraper.scrape(root);
})() 