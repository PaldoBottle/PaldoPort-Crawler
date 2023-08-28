const {Morp,MorpEval, Word, NE} = require("./CountCriteria")
const {Counter} = require("./Counter")

const filename = "Mon Aug 28_통영여행_문어";

const counter = new Counter();
const file = require(`./result/${filename}.json`)

const criterias = [
    new NE(filename),
    new Morp(filename),
    new MorpEval(filename),
    new Word(filename)
];

for (let criteria of criterias) {
    counter.count(criteria, file["return_object"]["sentence"]);
}
