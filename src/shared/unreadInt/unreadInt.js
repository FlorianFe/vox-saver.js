"use strict";
const unreadInt = (num) => {
    // fix signed int (-1 shows as -1,0,0,0)
    const data = [];
    num = num >>> 0;
    for (let i = 0; i < 4; i++) {
        data.push(num % 256);
        num = (num - data[i]) / 256;
    }
    return data;
};
module.exports = unreadInt;
//# sourceMappingURL=unreadInt.js.map