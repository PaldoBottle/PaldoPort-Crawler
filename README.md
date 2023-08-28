# PaldoPort-Crawler
Public 팔도포트 (Paldo Port) - 전국 팔도의 소중한 추억 기록집🍎

## 파일 구조

/result/$가져온 날짜_${tag name}.json : 가져온 텍스트를 분류한 데이터


/count/$가져온 날짜_${tag name}_${분류기준}.json : 분류기준을 기준으로 count하여 정렬한 토큰 개수 데이터

counter/CountCriteria : 분류 기준을 정의함

## 사용법
npm install (node version 18)

recognizer/API.json 파일에 http://aiopen.etri.re.kr 에서 발급받은 API_KEY 값을 저장

ANALYSIS_CODE 을 ner로 설정

npm start "${tag name}"


## 문제점
나온 단어들을 많이 나온 순서대로 정리해봤는데 큰 의미가 없었음