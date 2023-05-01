"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const unreadInt_1 = __importDefault(require("../shared/unreadInt/unreadInt"));
const write4ByteInteger_1 = __importDefault(require("../shared/write4ByteInteger/write4ByteInteger"));
const writeString_1 = __importDefault(require("../shared/writeString/writeString"));
const lodash_1 = require("lodash");
const unreadDict = (data) => {
    const entries = Object.entries(data);
    return [(0, unreadInt_1.default)(entries.length), entries.map(([k, v]) => [(0, writeString_1.default)(k), (0, writeString_1.default)(v)])];
};
const unparseVoxChunk = (id, data) => {
    let chunk = [];
    // base https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt
    chunk.push(id.toUpperCase().split("").map(char => char.charCodeAt(0)));
    console.log(id, data);
    switch (id.toUpperCase()) {
        case "MAIN":
            throw Error("Main Chunk must be placed in root!");
        case "PACK":
            chunk.push((0, write4ByteInteger_1.default)(4)); // Header Size
            chunk.push((0, write4ByteInteger_1.default)(0)); // Content Size
            chunk.push((0, unreadInt_1.default)(data.numModels));
            break;
        case "SIZE":
            chunk.push((0, write4ByteInteger_1.default)(12)); // Header Size
            chunk.push((0, write4ByteInteger_1.default)(0)); // no children
            chunk.push((0, write4ByteInteger_1.default)(data.x));
            chunk.push((0, write4ByteInteger_1.default)(data.y));
            chunk.push((0, write4ByteInteger_1.default)(data.z));
            break;
        case "XYZI":
            const xyziValues = data.values.map(v => [v.x, v.y, v.z, v.i]);
            chunk.push((0, write4ByteInteger_1.default)(4 + 4 * xyziValues.length)); // Header Size
            chunk.push((0, write4ByteInteger_1.default)(0)); // no children
            chunk.push((0, write4ByteInteger_1.default)(xyziValues.length));
            chunk.push((0, lodash_1.flattenDeep)(xyziValues));
            break;
        case "RGBA":
            const rgbaValues = data.values.map(c => [c.r, c.g, c.b, c.a]);
            chunk.push((0, write4ByteInteger_1.default)((0, lodash_1.flattenDeep)(rgbaValues).length)); // Header Size
            chunk.push((0, write4ByteInteger_1.default)(0)); // no children
            chunk.push((0, lodash_1.flattenDeep)(rgbaValues));
            break;
        default:
            console.warn(`Unknown chunk ${id}`);
            return [];
    }
    return (0, lodash_1.flattenDeep)(chunk);
};
module.exports = unparseVoxChunk;
//# sourceMappingURL=unparseVoxChunk.js.map