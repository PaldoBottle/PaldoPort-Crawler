const axios = require('axios');
const fs = require('fs');
const config = require('./API.json');
const {crawl} = require('./paldo_insta_crawler')

// 문어 version
const openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU" 
// 구어 version
// const openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU_spoken"


async function extractNER(keyword, text) {
    await axios({
        method: "post",
        url : openApiURL,
        headers : {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization" :  config.API_KEY
        },
        data: {
            "argument" : {
                "text": text,
                "analysis_code": config.ANALYSIS_CODE
            }
        }
    }).then((response) => {
        fs.writeFileSync(`./result/${new Date().toString().substring(0, 10)}_${keyword}.json`, JSON.stringify(response.data));
    });
}

async function main ()
{
    const keyword = "통영여행";
    const parseResult = await crawl(keyword);
    // parseResult.forEach((item) => {
    //     console.log(typeof(item.cleanArticle));
    // });
    const article = parseResult.reduce((prev, post) => {
        return prev + post.cleanArticle;
    }, '');
    // console.log(article);
    extractNER(keyword, article);
}

main();


// extractNER(`통영여행 다녀온 썰 #통영시지원 이벤트에 당첨되어 다녀왔습니다!
// 그동안 통영을 출장으로만 갔었는데,이번에는 관광과 체험을 신나게 하고 왔어요!
// 제가 다녀온 곳들을 해시태그로 정리해 드릴게요
// 훈이시락국 구독자님들 네분이 추천해주신 시락국집!
// 이순신공원 바다와 산, 수국과 아름다운 풍경이 있는 공원입니다.
// 항남우짜 숙소 근처에 있어서 간 분식집인데 후기는 다음 이야기로 풀게요
// 숙박비와 체험비를 제공받았으며 식비와 차비는 사비로 부담하였습니다.
// 친구야통영가자 통영애온나 통영여행 통영여행코스 #통영에서`);