"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const unreadInt_1 = __importDefault(require("../shared/unreadInt/unreadInt"));
const writeChars_1 = __importDefault(require("../shared/writeChars/writeChars"));
const writeString_1 = __importDefault(require("../shared/writeString/writeString"));
const unreadDict = (data) => {
    const entries = Object.entries(data);
    return [(0, unreadInt_1.default)(entries.length), entries.map(([k, v]) => [(0, writeString_1.default)(k), (0, writeString_1.default)(v)])];
};
const flatten = (arr) => {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
};
const unparseVoxChunk = (id, data) => {
    let chunk = [];
    // base https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt
    chunk.push((0, writeChars_1.default)(id));
    chunk.push([0, 0, 0, 0]);
    switch (id) {
        case "MAIN":
            console.warn("MAIN chunk is not implemented ..?..?..");
            break;
        case "PACK":
            chunk.push((0, unreadInt_1.default)(data.numModels));
            break;
        case "SIZE":
            chunk.push([(0, unreadInt_1.default)(data.x), (0, unreadInt_1.default)(data.y), (0, unreadInt_1.default)(data.z)]);
            break;
        case "XYZI":
            chunk.push((0, unreadInt_1.default)(data.numVoxels));
            chunk.push(data.values.map(c => [c.x, c.y, c.z, c.i]));
            break;
        case "RGBA":
            chunk.push(data.values.map(c => [c.r, c.g, c.b, c.a]));
            break;
        case "nTRN":
            chunk.push((0, unreadInt_1.default)(data.nodeId));
            chunk.push(unreadDict(data.nodeAttributes));
            chunk.push((0, unreadInt_1.default)(data.child));
            chunk.push((0, unreadInt_1.default)(data.reserved));
            chunk.push((0, unreadInt_1.default)(data.layer));
            chunk.push((0, unreadInt_1.default)(data.numFrames));
            chunk.push(data.frames.map(f => unreadDict(f)));
            break;
        case "nGRP":
            chunk.push((0, unreadInt_1.default)(data.nodeId));
            chunk.push(unreadDict(data.nodeAttributes));
            chunk.push((0, unreadInt_1.default)(data.child));
            chunk.push(data.children.map(c => (0, unreadInt_1.default)(c)));
            break;
        case "nSHP":
            chunk.push((0, unreadInt_1.default)(data.nodeId));
            chunk.push(unreadDict(data.nodeAttributes));
            chunk.push((0, unreadInt_1.default)(data.numModels));
            chunk.push(data.models.map(c => [(0, unreadInt_1.default)(c[0]), unreadDict(c[1])]));
            break;
        case "MATL":
            chunk.push((0, unreadInt_1.default)(data.materialId));
            chunk.push(unreadDict(data.materialProperties));
            break;
        case "LAYR":
            chunk.push((0, unreadInt_1.default)(data.layerId));
            chunk.push(unreadDict(data.layerAttributes));
            chunk.push((0, unreadInt_1.default)(data.reservedId));
            break;
        case "rOBJ":
            chunk.push(unreadDict(data.renderAttributes));
            break;
        case "rCAM":
            chunk.push((0, unreadInt_1.default)(data.cameraId));
            chunk.push(unreadDict(data.cameraAttributes));
            break;
        case "NOTE":
            chunk.push((0, unreadInt_1.default)(data.numColorNames));
            chunk.push(data.colorNames.map(c => (0, writeString_1.default)(c)));
            break;
        case "IMAP":
            chunk.push(data.indexAssociations);
        default:
            console.warn(`Unknown chunk ${id}`);
            break;
    }
    chunk = flatten(chunk);
    chunk.splice(4, 0, ...(0, unreadInt_1.default)(chunk.length - 8));
    return chunk;
};
module.exports = unparseVoxChunk;
//# sourceMappingURL=unparseVoxChunk.js.map