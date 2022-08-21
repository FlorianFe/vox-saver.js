import unreadInt from "../shared/unreadInt/unreadInt";
import writeChars from "../shared/writeChars/writeChars";
import unparseVoxChunk from "../unparseVoxChunk/unparseVoxChunk";
import isObject from "lodash/isObject";
import { VoxStructure } from "../../types/types";
import write4ByteInteger from "../shared/write4ByteInteger/write4ByteInteger";

const flatten = (arr : Array<any>) : Array<any> => {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
};

const writeMAIN = (content : Array<number>) => {
    return [
        "MAIN".split("").map(char => char.charCodeAt(0)),
        write4ByteInteger(0), // Header Size
        write4ByteInteger(content.length), // Content Size
        content,
    ]
}


const writeRiffFile = (voxStructure : VoxStructure) => {
    let content: any[] = [];
    Object.keys(voxStructure).forEach((key: string) => {
        const value = voxStructure[key as keyof VoxStructure]
        if (value === undefined || (isObject(value) && Object.keys(value).length === 0)) {
            return
        }
        content.push(unparseVoxChunk(key,value))
    })

    console.log(flatten(content))
    content = flatten(writeMAIN(flatten(content)))
    
    return content;
}

export = writeRiffFile;