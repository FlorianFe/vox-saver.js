
const writeString = require("./shared/writeString/writeString");
const write4ByteInteger = require("./shared/write4ByteInteger/write4ByteInteger");
const writeRiffFile = require("./writeRiffFile/writeRiffFile");

const flatten = (arr : Array<any>) : Array<any> => {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
};

// https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt

const saveVox = (voxStructure : VoxStructure) : Array<number> => 
{
    return flatten([
        writeString("VOX "),
        write4ByteInteger(150),
        writeRiffFile(voxStructure)
    ])
}

export = saveVox;