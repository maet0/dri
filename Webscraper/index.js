const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const fs = require('fs');

(async () => {

    const config = {
        baseSiteUrl: `https://www.karriere.at`,
        startUrl: `https://www.karriere.at/jobs/bmw/linz`,
        removeStyleAndScriptTags: false //Telling the scraper NOT to remove style and script tags, needed for Insight Tags / Trackers etc.      
    }

    let directoryExists;

    const getPageHtml = (html, pageAddress) => {//Saving the HTML file, using the page address as a name.
        console.log("Requesting data")
        if(!directoryExists){
            fs.mkdirSync('./html');
            directoryExists = true;
            console.log("Directory Created")
        }
        const name = sanitize(pageAddress)
        fs.writeFile(`./html/${name}.html`, html, () => { })
        console.log("File created!")
    }

    const scraper = new Scraper(config);

    const root = new Root({ pagination: { queryString: 'page_num', begin: 1, end: 100 } });

    const jobAds = new OpenLinks('.m-jobsListItem__dataContainer h2 a', { getPageHtml });//Opens every job ad, and calls a hook after every page is done.

    root.addOperation(jobAds);

    await scraper.scrape(root);
}

);

