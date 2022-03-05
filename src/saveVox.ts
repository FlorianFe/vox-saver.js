import writeChars from "./shared/writeChars/writeChars";

import writeString from "./shared/writeString/writeString";
import write4ByteInteger from "./shared/write4ByteInteger/write4ByteInteger";
import writeRiffFile from "./writeRiffFile/writeRiffFile";

const flatten = (arr : Array<any>) : Array<any> => {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
};

// https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt

const saveVox = (voxStructure : VoxStructure) : Array<number> => 
{
    return flatten([
        writeChars("VOX "),
        write4ByteInteger(150),
        writeRiffFile(voxStructure)
    ])
}

export = saveVox;