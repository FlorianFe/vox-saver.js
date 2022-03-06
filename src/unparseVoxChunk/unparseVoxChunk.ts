import unreadInt from "../shared/unreadInt/unreadInt";
import writeChars from "../shared/writeChars/writeChars";
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
  chunk.push(writeChars(id))
  chunk.push([0,0,0,0])
  switch (id) {
    case "MAIN":
      console.warn("MAIN chunk is not implemented ..?..?..");
      break;
    case "PACK":
      chunk.push(unreadInt((data as PACK).numModels))
      break
    case "SIZE":
      chunk.push([unreadInt((data as SIZE).x), unreadInt((data as SIZE).y), unreadInt((data as SIZE).z)])
      break
    case "XYZI":
      chunk.push(unreadInt((data as XYZI).numVoxels))
      chunk.push((data as XYZI).values.map(c => [c.x, c.y, c.z, c.i]))
      break
    case "RGBA":
      chunk.push((data as RGBA).values.map(c => [c.r, c.g, c.b, c.a]))
      break
    case "nTRN":
      chunk.push(unreadInt((data as nTRN).nodeId))
      chunk.push(unreadDict((data as nTRN).nodeAttributes))
      chunk.push(unreadInt((data as nTRN).child))
      chunk.push(unreadInt((data as nTRN).reserved))
      chunk.push(unreadInt((data as nTRN).layer))
      chunk.push(unreadInt((data as nTRN).numFrames))
      chunk.push((data as nTRN).frames.map(f => unreadDict(f)))
      break
    case "nGRP":
      chunk.push(unreadInt((data as nGRP).nodeId))
      chunk.push(unreadDict((data as nGRP).nodeAttributes))
      chunk.push(unreadInt((data as nGRP).child))
      chunk.push((data as nGRP).children.map(c => unreadInt(c)))
      break
    case "nSHP":
      chunk.push(unreadInt((data as nSHP).nodeId))
      chunk.push(unreadDict((data as nSHP).nodeAttributes))
      chunk.push(unreadInt((data as nSHP).numModels))
      chunk.push((data as nSHP).models.map(c =>[unreadInt(c[0]),unreadDict(c[1])]))
      break
    case "MATL":
      chunk.push(unreadInt((data as MATL).materialId))
      chunk.push(unreadDict((data as MATL).materialProperties))
      break
    case "LAYR":
      chunk.push(unreadInt((data as LAYR).layerId))
      chunk.push(unreadDict((data as LAYR).layerAttributes))
      chunk.push(unreadInt((data as LAYR).reservedId))
      break
    case "rOBJ":
      chunk.push(unreadDict((data as rOBJ).renderAttributes))
      break
    case "rCAM":
      chunk.push(unreadInt((data as rCAM).cameraId))
      chunk.push(unreadDict((data as rCAM).cameraAttributes))
      break
    case "NOTE":
      chunk.push(unreadInt((data as NOTE).numColorNames))
      chunk.push((data as NOTE).colorNames.map(c => writeString(c)))
      break
    case "IMAP":
      chunk.push((data as IMAP).indexAssociations)
    default:  
      console.warn(`Unknown chunk ${id}`)
      break;
  }
  chunk = flatten(chunk)
  chunk.splice(4,0,...unreadInt(chunk.length-8))
  return chunk;
}

export = unparseVoxChunk;
