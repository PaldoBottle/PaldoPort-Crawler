const fs = require('fs');
const {Morp,MorpEval, Word, NE} = require("./counter/CountCriteria")
const {Counter} = require("./counter/Counter")
const {crawl} = require('./crawler/paldo_insta_crawler');
const {recognize} = require('./recognizer/NameEntityRecognizer')

// const filename = "Mon Aug 28_통영여행_문어";
// const file = require(`./result/${filename}.json`)

function checkCrawled(keyword) {
    let crawled = false;
    let name = '';
    const crawledFiles = fs.readdirSync("./result");
    crawledFiles.forEach(filename => {
        console.log(filename);
        if (filename.includes(keyword)) {
            crawled = true;
            name = filename;    
            return ;
        }
    });
    return {
        alreadyCrawled : crawled, 
        filename : name
    };
}

async function main ()
{
    if (process.argv.length <= 2) return;
    const keyword = process.argv[2];
    let data = {};
    // check if crawled
    let {alreadyCrawled, filename} = checkCrawled(keyword);
    if (!alreadyCrawled) {
        // parse
        const parseResult = await crawl(keyword);
        // compress parsed results
        const article = parseResult.reduce((prev, post) => {
            return prev + post.cleanArticle;
        }, '');
        // get recognized name entity data
        const recognized = await recognize(keyword, article);
        data = recognized.file;
        filename = recognized.filename;
    }else {
        data = require(`./result/${filename}`);
    }

    // // count collected posts
    const counter = new Counter();
    const criterias = [
        new NE(filename),
        new Morp(filename),
        new MorpEval(filename),
        new Word(filename)
    ];
    for (let criteria of criterias) {
        counter.count(criteria, data["return_object"]["sentence"]);
    }
}

main();

