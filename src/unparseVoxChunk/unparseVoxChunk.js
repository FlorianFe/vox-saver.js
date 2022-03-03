"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const unreadInt_1 = __importDefault(require("../shared/unreadInt/unreadInt"));
const writeString_1 = __importDefault(require("../shared/writeString/writeString"));
const unreadDict = (data) => {
    const entries = Object.entries(data);
    return [(0, unreadInt_1.default)(entries.length), entries.map(([k, v]) => [(0, writeString_1.default)(k), (0, writeString_1.default)(v)])];
};
const unparseVoxChunk = (id, data) => {
    const chunk = [];
    // base https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt
    chunk.push((0, writeString_1.default)(id));
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
            chunk.push(data.frames.map(f => unreadDict(f)));
            break;
        case "nGRP":
            chunk.push((0, unreadInt_1.default)(data.nodeId));
            chunk.push(unreadDict(data.nodeAttributes));
            chunk.push(data.children.map(c => (0, unreadInt_1.default)(c)));
            break;
        case "nSHP":
            chunk.push((0, unreadInt_1.default)(data.nodeId));
            chunk.push(unreadDict(data.nodeAttributes));
            chunk.push(unreadDict(data.models));
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
            chunk.push(data.colorNames.map(c => (0, writeString_1.default)(c)));
            break;
        case "IMAP":
            chunk.push((0, unreadInt_1.default)(data.size));
            chunk.push(data.indexAssociations.map(i => (0, unreadInt_1.default)(i)));
        default:
            console.warn(`Unknown chunk ${id}`);
            break;
    }
    if (id === 'rOBJ')
        return {
            renderAttributes: readDict(data),
        };
    if (id === 'rCAM')
        return {
            cameraId: read4ByteInteger(data.splice(0, 4)),
            cameraAttributes: readDict(data),
        };
    if (id === 'NOTE') {
        const obj = {
            numColorNames: read4ByteInteger(data.splice(0, 4)),
            colorNames: [],
        };
        for (let i = 0; i < obj.numColorNames; i++) {
            obj.colorNames.push(readString(data));
        }
        return obj;
    }
    if (id === 'IMAP')
        return {
            size: read4ByteInteger(data.splice(0, 4)),
            indexAssociations: data.splice(0, 256).map((c) => read4ByteInteger(c)),
        };
    return {};
};
module.exports = unparseVoxChunk;
//# sourceMappingURL=unparseVoxChunk.js.map