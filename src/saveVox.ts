import writeChars from "./shared/writeChars/writeChars";
import writeRiffFile from "./writeRiffFile/writeRiffFile";
import unreadInt from "./shared/unreadInt/unreadInt";
import { VoxStructure } from "../types/types";

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
        unreadInt(150),
        writeRiffFile(voxStructure)
    ])
}

export = saveVox;