"use strict";
var pow = Math.pow;
var RANGE_4 = [0, 1, 2, 3];
var MAX_OF_4_BYTE_INTEGER = pow(2, 32) - 1;
var write4ByteInteger = function (number) {
    if (number % 1 !== 0)
        throw Error("expect number to be an integer. Found: " + number);
    if (number < 0)
        throw Error("expect number to be positive");
    if (number > MAX_OF_4_BYTE_INTEGER)
        throw Error("expect number to be less than 2^32");
    return RANGE_4.map(function (index) { return (number >> (index * 8)) % 256; });
};
module.exports = write4ByteInteger;
