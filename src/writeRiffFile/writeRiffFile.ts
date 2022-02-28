
import write4ByteFloat from "../shared/write4ByteFloat/write4ByteFloat"
import write4ByteInteger from "../shared/write4ByteInteger/write4ByteInteger";
import write4ByteString from "../shared/write4ByteString/write4ByteString";

const flatten = (arr : Array<any>) : Array<any> => {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
};

const writeMAIN = (content : Array<number>) => {
    return [
        write4ByteString("MAIN"),
        write4ByteInteger(0), // Header Size
        write4ByteInteger(content.length), // Content Size
        ...content,
    ]
}

const writeSIZE = (size : Size) => {
    return [
        write4ByteString("SIZE"),
        write4ByteInteger(12),
        write4ByteInteger(0),

        write4ByteInteger(size.x),
        write4ByteInteger(size.y),
        write4ByteInteger(size.z),
    ]
}

const writeXYZI = (xyzi : XYZI) => {

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

const writeRGBA = (rgba : RGBA) => {

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

const writeRiffFile = (voxStructure : VoxStructure) => {
    console.log(Object.keys(voxStructure))
    const rest = Object.keys(voxStructure).map((key) => {
        if (['size','xyzi','rgba'].includes(key)) {
            return;
        }
        
        try {
            // @ts-ignore
            return [...write4ByteString(voxStructure[key].values.id),...voxStructure[key].values];
        } catch (error) {
            try {
                // @ts-ignore
            console.log('id failed:',voxStructure[key].values.id,error);
            }
            catch {
                
            }
        }
        
    }).filter((key):key is any[] => key !== undefined)
    console.log('rest',rest)
    const compare = writeSIZE(voxStructure.size)
    console.log('compare',compare)
    const content = flatten([
        writeSIZE(voxStructure.size),
        writeXYZI(voxStructure.xyzi),
        writeRGBA(voxStructure.rgba),
        ...rest
    ]);
    
    return writeMAIN(content);
}

export = writeRiffFile;