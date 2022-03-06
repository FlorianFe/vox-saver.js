import unreadInt from "../shared/unreadInt/unreadInt";
import writeChars from "../shared/writeChars/writeChars";
import unparseVoxChunk from "../unparseVoxChunk/unparseVoxChunk";
import { VoxStructure } from "../../types/types";

const flatten = (arr : Array<any>) : Array<any> => {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
};

const writeMAIN = (content : Array<number>) => {
    return [
        writeChars("MAIN"),
        unreadInt(0), // Header Size
        unreadInt(content.length), // Content Size
        ...content,
    ]
}


const writeRiffFile = (voxStructure : VoxStructure) => {
    let content: any[] = [];
    Object.keys(voxStructure).forEach((key: string) => {
        const value = voxStructure[key as keyof VoxStructure]
        if (value === undefined) {
            return
        }

        value.forEach(subvalue => {
            content.push({key, subvalue})
        })
    })
    
    content = content.sort((a,b) => a.subvalue.index - b.subvalue.index)
    content = content.map(chunks => unparseVoxChunk(chunks.key,chunks.subvalue))
    content = flatten(content.filter((key):key is any[] => key !== undefined))
    content = writeMAIN(content)
    return content;
}

export = writeRiffFile;