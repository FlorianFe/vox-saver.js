
import write4ByteFloat from "../shared/write4ByteFloat/write4ByteFloat"
import write4ByteInteger from "../shared/write4ByteInteger/write4ByteInteger";
import writeString from "../shared/writeString/writeString";

const flatten = (arr : Array<any>) : Array<any> => {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
};

const writeMAIN = (content : Array<number>) => {
    return [
        writeString("MAIN"),
        write4ByteInteger(0), // Header Size
        write4ByteInteger(content.length), // Content Size
        ...content,
    ]
}

const writeSIZE = (size : SIZE) => {
    return [
        writeString("SIZE"),
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
        writeString("XYZI"),
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
        writeString("RGBA"),
        write4ByteInteger(content.length),
        write4ByteInteger(0),
        content
    ]);
}


const writeRiffFile = (voxStructure : VoxStructure) => {
    const content: ValueOf<VoxStructure>[] = [];
    const rest = Object.keys(voxStructure).map((key) => {
        const value = voxStructure[key as keyof VoxStructure]
        if (value === undefined) {
            return
        }
        value.forEach(subvalue => {

            content.push(functions[key as keyof VoxStructure](subvalue))
        })
        
        
    }).filter((key):key is any[] => key !== undefined)
    // console.log('rest',rest)
    // const compare = writeSIZE(voxStructure.SIZE)
    // console.log('compare',compare)
    // const content = flatten([
    //     writeSIZE(voxStructure.SIZE),
    //     writeXYZI(voxStructure.XYZI),
    //     writeRGBA(voxStructure.RGBA),
    //     ...rest
    // ]);
    
    return writeMAIN(content);
}

export = writeRiffFile;