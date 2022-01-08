"use strict";
// see https://en.wikipedia.org/wiki/IEEE_754
var signedToUnsigned = function (signed) {
    return signed < 0 ? signed + 256 : signed;
};
var write4ByteFloat = function (floatingPointNumber) {
    var floatArray = new Float32Array(1);
    floatArray[0] = floatingPointNumber;
    var byteArray = new Int8Array(floatArray.buffer);
    var reducedByteArray = Array.from(byteArray.slice(0, 4))
        .map(function (val) { return signedToUnsigned(val); });
    return reducedByteArray.reverse();
};
module.exports = write4ByteFloat;
