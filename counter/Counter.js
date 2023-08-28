const fs = require('fs');

class Counter {
    constructor() {}
    count(criteria, sentences) {
        let result = new Map();
        sentences.forEach(sentence => {
            let itemList = criteria.getItemList(sentence);
            if (itemList == undefined) throw new Error("No item list")
            itemList.forEach(item => {
                const key = criteria.getKey(item);
                const value = result.get(key);
                if (value === undefined) {
                    result.set(key, {
                        ...criteria.getValue(item),
                        count : 1
                    });
                }else {
                    value.count += 1;
                }
            });
        });
        result = Array.from(result.values());
        result.sort((left, right) => {
            if (left.count > right.count) {
                return -1;
            }else if (left.count < right.count) {
                return 1;
            }else {
                return 0;
            }
        });
        fs.writeFileSync(`${criteria.getSaveName()}.json`, JSON.stringify(result), 'utf8');
        // return sentences;
    }
};

module.exports = {
    Counter: Counter
};