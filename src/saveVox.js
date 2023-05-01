"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const writeChars_1 = __importDefault(require("./shared/writeChars/writeChars"));
const writeRiffFile_1 = __importDefault(require("./writeRiffFile/writeRiffFile"));
const unreadInt_1 = __importDefault(require("./shared/unreadInt/unreadInt"));
// https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt
const saveVox = (voxStructure) => {
    return ([
        (0, writeChars_1.default)("VOX "),
        (0, unreadInt_1.default)(150),
        (0, writeRiffFile_1.default)(voxStructure)
    ]).flat();
};
module.exports = saveVox;
//# sourceMappingURL=saveVox.js.map