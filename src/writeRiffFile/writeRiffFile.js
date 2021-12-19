
const write4ByteFloat = require("../shared/write4ByteFloat/write4ByteFloat");
const write4ByteInteger = require("../shared/write4ByteInteger/write4ByteInteger");
const write4ByteString = require("../shared/write4ByteString/write4ByteString");

const flatten = (arr) => {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
};


const writeMAIN = (content) => {
    return [
        write4ByteString("MAIN"),
        write4ByteInteger(0), // Header Size
        write4ByteInteger(content.length), // Content Size
        ...content,
    ]
}

const writeSIZE = (size) => {
    return [
        write4ByteString("SIZE"),
        write4ByteInteger(12),
        write4ByteInteger(0),

        write4ByteInteger(size.x),
        write4ByteInteger(size.y),
        write4ByteInteger(size.z),
    ]
}

const writeXYZI = (xyzi) => {

    const content = flatten(xyzi.values.map(v => {
        return [
            v.x,
            v.y,
            v.z,
            v.i,
        ]
    }))

    return flatten([
        write4ByteString("XYZI"),
        write4ByteInteger(4 + content.length),
        write4ByteInteger(0),

        write4ByteInteger(xyzi.numVoxels),
        content
    ])
}

const writeRGBA = (rgba) => {

    const content = flatten(rgba.values.map(color => {
        return [
            color.r,
            color.g,
            color.b,
            color.a,
        ]
    }))

    return flatten([
        write4ByteString("RGBA"),
        write4ByteInteger(content.length),
        write4ByteInteger(0),
        content
    ]);
}

const writeRiffFile = (voxStructure) => {

    const content = flatten([
        writeSIZE(voxStructure.size),
        writeXYZI(voxStructure.xyzi),
        writeRGBA(voxStructure.rgba),
    ]);

    return writeMAIN(content);
}

module.exports = writeRiffFile;