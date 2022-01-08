"use strict";
var write4ByteString = function (text) {
    if (text.length !== 4)
        throw Error("4 Byte String should have 4 characters");
    return text.split("").map(function (char) { return char.charCodeAt(0); });
};
module.exports = write4ByteString;
