"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const unparseVoxChunk_1 = __importDefault(require("../unparseVoxChunk/unparseVoxChunk"));
const isObject_1 = __importDefault(require("lodash/isObject"));
const write4ByteInteger_1 = __importDefault(require("../shared/write4ByteInteger/write4ByteInteger"));
const writeMAIN = (content) => {
    return [
        "MAIN".split("").map(char => char.charCodeAt(0)),
        (0, write4ByteInteger_1.default)(0),
        (0, write4ByteInteger_1.default)(content.length),
        content,
    ];
};
const writeRiffFile = (voxStructure) => {
    let content = [];
    Object.keys(voxStructure).forEach((key) => {
        const value = voxStructure[key];
        if (value === undefined || ((0, isObject_1.default)(value) && Object.keys(value).length === 0)) {
            return;
        }
        content.push((0, unparseVoxChunk_1.default)(key, value));
    });
    content = writeMAIN(content.flat()).flat();
    return content;
};
module.exports = writeRiffFile;
//# sourceMappingURL=writeRiffFile.js.map