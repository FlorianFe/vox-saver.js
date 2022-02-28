"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const write4ByteInteger_1 = __importDefault(require("../shared/write4ByteInteger/write4ByteInteger"));
const write4ByteString_1 = __importDefault(require("../shared/write4ByteString/write4ByteString"));
const flatten = (arr) => {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
};
const writeMAIN = (content) => {
    return [
        (0, write4ByteString_1.default)("MAIN"),
        (0, write4ByteInteger_1.default)(0),
        (0, write4ByteInteger_1.default)(content.length),
        ...content,
    ];
};
const writeSIZE = (size) => {
    return [
        (0, write4ByteString_1.default)("SIZE"),
        (0, write4ByteInteger_1.default)(12),
        (0, write4ByteInteger_1.default)(0),
        (0, write4ByteInteger_1.default)(size.x),
        (0, write4ByteInteger_1.default)(size.y),
        (0, write4ByteInteger_1.default)(size.z),
    ];
};
const writeXYZI = (xyzi) => {
    const content = flatten(xyzi.values.map(v => {
        return [
            v.x,
            v.y,
            v.z,
            v.i,
        ];
    }));
    return flatten([
        (0, write4ByteString_1.default)("XYZI"),
        (0, write4ByteInteger_1.default)(4 + content.length),
        (0, write4ByteInteger_1.default)(0),
        (0, write4ByteInteger_1.default)(xyzi.numVoxels),
        content
    ]);
};
const writeRGBA = (rgba) => {
    const content = flatten(rgba.values.map(color => {
        return [
            color.r,
            color.g,
            color.b,
            color.a,
        ];
    }));
    return flatten([
        (0, write4ByteString_1.default)("RGBA"),
        (0, write4ByteInteger_1.default)(content.length),
        (0, write4ByteInteger_1.default)(0),
        content
    ]);
};
const writeRiffFile = (voxStructure) => {
    console.log(Object.keys(voxStructure));
    const rest = Object.keys(voxStructure).map((key) => {
        if (['size', 'xyzi', 'rgba'].includes(key)) {
            return;
        }
        try {
            // @ts-ignore
            return [...(0, write4ByteString_1.default)(voxStructure[key].values.id), ...voxStructure[key].values];
        }
        catch (error) {
            try {
                // @ts-ignore
                console.log('id failed:', voxStructure[key].values.id, error);
            }
            catch (_a) {
            }
        }
    }).filter((key) => key !== undefined);
    console.log('rest', rest);
    const compare = writeSIZE(voxStructure.size);
    console.log('compare', compare);
    const content = flatten([
        writeSIZE(voxStructure.size),
        writeXYZI(voxStructure.xyzi),
        writeRGBA(voxStructure.rgba),
        ...rest
    ]);
    return writeMAIN(content);
};
module.exports = writeRiffFile;
//# sourceMappingURL=writeRiffFile.js.map