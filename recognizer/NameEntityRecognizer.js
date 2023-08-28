const axios = require('axios');
const fs = require('fs');
const config = require('./API.json');

// 문어 version
const openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU" 
// 구어 version
// const openApiURL = "http://aiopen.etri.re.kr:8000/WiseNLU_spoken"


async function extractNER(keyword, text) {
    const response = await axios({
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
    });
    const basename = `./result`;
    const filename = `${new Date().toString().substring(0, 10)}_${keyword}.json`;
    fs.writeFileSync(basename + filename, JSON.stringify(response.data));
    return {file : response.data, filename : filename};
}

module.exports = {
    recognize: extractNER
};
// main();