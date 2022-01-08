
const write4ByteString = require("./shared/write4ByteString/write4ByteString");
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
    const SPACE = " ";
    
    return flatten([
        write4ByteString("VOX" + SPACE),
        write4ByteInteger(150),
        writeRiffFile(voxStructure)
    ])
}

export = saveVox;