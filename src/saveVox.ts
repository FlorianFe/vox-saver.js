import writeChars from "./shared/writeChars/writeChars";
import writeRiffFile from "./writeRiffFile/writeRiffFile";
import unreadInt from "./shared/unreadInt/unreadInt";
import { VoxStructure } from "../types/types";


// https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt

const saveVox = (voxStructure : VoxStructure) : Array<number> => 
{
    return ([
        writeChars("VOX "),
        unreadInt(150),
        writeRiffFile(voxStructure)
    ]).flat()
}

export = saveVox;