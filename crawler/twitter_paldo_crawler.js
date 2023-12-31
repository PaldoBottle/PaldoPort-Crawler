const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

let URL = 'https://twitter.com/search?q=%23%ED%86%B5%EC%98%81%EC%97%AC%ED%96%89&src=recent_search_click'

async function run (){

    // 브라우저 열기
	
	const browser = await puppeteer.launch({ 
		headless: true
	 });
    const page = await browser.newPage();  

	// 웹사이트 로딩, 아래 주소에 원하는 페이지의 주소를 넣어주자
    await page.goto(URL, {timeout: 0, waitUntil: 'domcontentloaded'});
	
	 //스크린샷 캡쳐
	 await page.screenshot({path: 'example.png', fullPage:true});

	 // 피드 로드 대기
	 await page.waitForSelector('.css-1dbjc4n')
	 
	  // 페이지의 HTML을 가져온다.
	  const content = await page.content();

	  //스크린샷 캡쳐
	await page.screenshot({path: 'example.png', fullPage:true});

	  // $에 cheerio를 로드한다.
	  const $ = cheerio.load(content);
	  // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
	  const lists = $('._aabd._aa8k._al3l');


	console.log("crawling result: ");
	  // 모든 리스트를 순환한다.
	  lists.each((index, list) => {
		console.log(index + '번째 피드');

		// const $imgdata = cheerio.load(list);
		// var imgHref = $imgdata('img').attr('src');
		// if (imgHref) {
		// 	console.log('사진 링크: ', imgHref + '\n');
		// }

		const $articleData = cheerio.load(list);
		var feedArticle = $articleData('.css-1dbjc4n > .css-901oao');
		if (feedArticle) {
			var cleanArticle = removeSC(feedArticle);
			var hashtags = extractHashtags(feedArticle);
			console.log('해시태그: ');
			hashtags.forEach(hashtag => {
				process.stdout.write(hashtag + ' ');
			});
			
			console.log('\n\n' + '피드 내용: ', cleanArticle + '\n');
		}
	

		const $feedData = cheerio.load(list);
		var feedHref = $feedData('.css-1dbjc4n.r-18u37iz > a').attr('href');
		if (feedHref) {
			feedHref = 'https://twitter.com/' + feedHref;
			console.log('피드 링크: ', feedHref + '\n');
		}
		console.log('\n\n\n');


	  });
	  // 브라우저를 종료한다.
	  browser.close();
    
}

function removeSC(inputString) {
	return inputString.replace(/[^\w\s가-힣]/gi, '');
}

function extractHashtags(inputString) {
    const hashtagRegex = /#[^\s#]+/g;
    const hashtags = inputString.match(hashtagRegex);
    return hashtags || []; // 매치되는 해시태그가 없으면 빈 배열 반환
}




run();
