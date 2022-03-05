"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const writeChars_1 = __importDefault(require("./shared/writeChars/writeChars"));
const write4ByteInteger_1 = __importDefault(require("./shared/write4ByteInteger/write4ByteInteger"));
const writeRiffFile_1 = __importDefault(require("./writeRiffFile/writeRiffFile"));
const flatten = (arr) => {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
};
// https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt
const saveVox = (voxStructure) => {
    return flatten([
        (0, writeChars_1.default)("VOX "),
        (0, write4ByteInteger_1.default)(150),
        (0, writeRiffFile_1.default)(voxStructure)
    ]);
};
module.exports = saveVox;
//# sourceMappingURL=saveVox.js.map