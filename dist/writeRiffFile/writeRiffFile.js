"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var write4ByteFloat = require("../shared/write4ByteFloat/write4ByteFloat");
var write4ByteInteger = require("../shared/write4ByteInteger/write4ByteInteger");
var write4ByteString = require("../shared/write4ByteString/write4ByteString");
var flatten = function (arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
};
var writeMAIN = function (content) {
    return __spreadArray([
        write4ByteString("MAIN"),
        write4ByteInteger(0),
        write4ByteInteger(content.length)
    ], content, true);
};
var writeSIZE = function (size) {
    return [
        write4ByteString("SIZE"),
        write4ByteInteger(12),
        write4ByteInteger(0),
        write4ByteInteger(size.x),
        write4ByteInteger(size.y),
        write4ByteInteger(size.z),
    ];
};
var writeXYZI = function (xyzi) {
    var content = flatten(xyzi.values.map(function (v) {
        return [
            v.x,
            v.y,
            v.z,
            v.i,
        ];
    }));
    return flatten([
        write4ByteString("XYZI"),
        write4ByteInteger(4 + content.length),
        write4ByteInteger(0),
        write4ByteInteger(xyzi.numVoxels),
        content
    ]);
};
var writeRGBA = function (rgba) {
    var content = flatten(rgba.values.map(function (color) {
        return [
            color.r,
            color.g,
            color.b,
            color.a,
        ];
    }));
    return flatten([
        write4ByteString("RGBA"),
        write4ByteInteger(content.length),
        write4ByteInteger(0),
        content
    ]);
};
var writeRiffFile = function (voxStructure) {
    var content = flatten([
        writeSIZE(voxStructure.size),
        writeXYZI(voxStructure.xyzi),
        writeRGBA(voxStructure.rgba),
    ]);
    return writeMAIN(content);
};
module.exports = writeRiffFile;
