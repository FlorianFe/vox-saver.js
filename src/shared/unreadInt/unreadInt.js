"use strict";
const unreadInt = (num) => {
    const data = [];
    for (let i = 0; i < 4; i++) {
        data.push(num % 256);
        num = (num - data[i]) / 256;
    }
    return data;
};
module.exports = unreadInt;
//# sourceMappingURL=unreadInt.js.map