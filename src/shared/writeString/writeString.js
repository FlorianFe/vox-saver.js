"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const unreadInt_1 = __importDefault(require("../unreadInt/unreadInt"));
const writeString = (text) => {
    const textArray = text.split("");
    return [...(0, unreadInt_1.default)(textArray.length), ...textArray.map(char => char.charCodeAt(0))];
};
module.exports = writeString;
//# sourceMappingURL=writeString.js.map