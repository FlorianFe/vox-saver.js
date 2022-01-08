"use strict";
var write4ByteString = require("./shared/write4ByteString/write4ByteString");
var write4ByteInteger = require("./shared/write4ByteInteger/write4ByteInteger");
var write4ByteFloat = require("./shared/write4ByteFloat/write4ByteFloat");
var writeRiffFile = require("./writeRiffFile/writeRiffFile");
var flatten = function (arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
};
// https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt
var saveVox = function (voxStructure) {
    return flatten([
        write4ByteString("VOX "),
        write4ByteInteger(150),
        writeRiffFile(voxStructure)
    ]);
};
module.exports = saveVox;
