/*
    sentence_morp       condition : type == 'NNP'           | key == morp_lemma         | save : lemma, type, count
    sentence_morp_eval  condition : traget contain 'NNG'    | key == morp_eval_target   | save : count
    sentence_word_item  condition :                         | key == word_text          | save : count
    sentence_NE_item                                        | key == NE_text            | save : count, text, type
*/

class CountCriteria {
    condition(obj) {throw new Error('not implemented');}
    getKey(obj) {throw new Error('not implemented');}
    getValue(obj) {throw new Error('not implemented');}
    getItemList(obj) {throw new Error('not implemented');}
    getSaveName(){throw new Error('not implemented');}
};

class Morp extends CountCriteria {
    constructor(keyword) {
        super();
        this.keyword = keyword;
    }
    condition(obj) {
        return obj["type"] == 'NNP' || obj["type"] == 'NNG';
    }
    getKey(obj) {
        return obj.lemma;
    }
    getValue(obj) {
        return {
            text : this.getKey(obj),
            type : obj.type
        };
    }
    getItemList(obj) {
        return obj["morp"];
    }
    getSaveName() {
        return `./count/${this.keyword}_morp`;
    }
};

class MorpEval extends CountCriteria {
    constructor(keyword) {
        super();
        this.keyword = keyword;
    }
    condition(obj) {
        for (let type of ["NNP", "NNG"]) {
            if (obj["result"].includes(type))
                return true;
        }
        return false;
    }
    getKey(obj) {
        return obj.target;
    }
    getValue(obj) {
        return {
            text : this.getKey(obj),
        };
    }
    getItemList(obj) {
        return obj["morp_eval"];
    }
    getSaveName() {
        return `./count/${this.keyword}_morpEval`;
    }
};

class Word extends CountCriteria {
    constructor(keyword) {
        super();
        this.keyword = keyword;
    }
    condition(obj) {
        return true;
    }
    getKey(obj) {
        return obj.text;
    }
    getValue(obj) {
        return {
            text : this.getKey(obj),
        };
    }
    getItemList(obj) {
        return obj["word"];
    }
    getSaveName() {
        return `./count/${this.keyword}_word`;
    }
}

class NE extends CountCriteria {
    constructor(keyword) {
        super();
        this.keyword = keyword;
    }
    condition(obj) {
        return true;
    }
    getKey(obj) {
        return obj.text;
    }
    getValue(obj) {
        return {
            text : this.getKey(obj),
            type : obj.type
        };
    }
    getItemList(obj) {
        return obj["NE"];
    }
    getSaveName() {
        return `./count/${this.keyword}_NE`;
    }
}



module.exports = {
    Morp : Morp,
    MorpEval : MorpEval,
    Word : Word,
    NE : NE
};