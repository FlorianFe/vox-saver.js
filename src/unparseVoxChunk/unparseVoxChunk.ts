import unreadInt from "../shared/unreadInt/unreadInt";
import write4ByteInteger from "../shared/write4ByteInteger/write4ByteInteger";
import writeString from "../shared/writeString/writeString";
import { 
  PACK, SIZE, XYZI, RGBA, 
  nTRN, nGRP, nSHP, MATL, 
  LAYR, rOBJ, rCAM, NOTE, IMAP} from "../../types/types";

const unreadDict = (data : { [key: string]: any}) =>
{
    const entries = Object.entries(data)
    return [unreadInt(entries.length), entries.map(([k, v]) => [writeString(k), writeString(v)])];
}
const flatten = (arr : Array<any>) : Array<any> => {
  return arr.reduce((flat, toFlatten) => {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
};
const unparseVoxChunk = (id : string, data : any): any[] =>
{
  let chunk = []
  // base https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt
  chunk.push(id.toUpperCase().split("").map(char => char.charCodeAt(0)))
  
  switch (id.toUpperCase()) {
    case "MAIN":
      throw Error("Main Chunk must be placed in root!")
    case "PACK":
      chunk.push(write4ByteInteger(4)) // Header Size
      chunk.push(write4ByteInteger(0)) // Content Size
      chunk.push(unreadInt((data as PACK).numModels))
      break;
    case "SIZE":
      chunk.push(write4ByteInteger(12)) // Header Size
      chunk.push(write4ByteInteger(0)) // no children
      chunk.push(write4ByteInteger((data as SIZE).x))
      chunk.push(write4ByteInteger((data as SIZE).y))
      chunk.push(write4ByteInteger((data as SIZE).z))
      break;
    case "XYZI":
      const xyziValues = (data as XYZI).values.map(v => [v.x, v.y, v.z, v.i]);

      chunk.push(write4ByteInteger(4 + 4 * xyziValues.length)) // Header Size
      chunk.push(write4ByteInteger(0)) // no children
      chunk.push(write4ByteInteger(xyziValues.length)); 
      chunk.push(flatten(xyziValues))
      break;
    case "RGBA":
      const rgbaValues = (data as RGBA).values.map(c => [c.r, c.g, c.b, c.a]);

      chunk.push(write4ByteInteger(flatten(rgbaValues).length)) // Header Size
      chunk.push(write4ByteInteger(0)) // no children
      chunk.push(flatten(rgbaValues))
      break;
    default:  
      console.warn(`Unknown chunk ${id}`)
      return [];
  }

  return flatten(chunk);
}

export = unparseVoxChunk;
