"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const unreadInt_1 = __importDefault(require("../shared/unreadInt/unreadInt"));
const writeChars_1 = __importDefault(require("../shared/writeChars/writeChars"));
const unparseVoxChunk_1 = __importDefault(require("../unparseVoxChunk/unparseVoxChunk"));
const flatten = (arr) => {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
};
const writeMAIN = (content) => {
    return [
        (0, writeChars_1.default)("MAIN"),
        (0, unreadInt_1.default)(0),
        (0, unreadInt_1.default)(content.length),
        ...content,
    ];
};
const writeRiffFile = (voxStructure) => {
    let content = [];
    Object.keys(voxStructure).forEach((key) => {
        const value = voxStructure[key];
        if (value === undefined) {
            return;
        }
        value.forEach(subvalue => {
            content.push({ key, subvalue });
        });
    });
    content = content.sort((a, b) => a.subvalue.index - b.subvalue.index);
    content = content.map(chunks => (0, unparseVoxChunk_1.default)(chunks.key, chunks.subvalue));
    content = flatten(content.filter((key) => key !== undefined));
    content = writeMAIN(content);
    return content;
};
module.exports = writeRiffFile;
//# sourceMappingURL=writeRiffFile.js.map