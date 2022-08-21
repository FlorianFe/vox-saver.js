
const fs = require('fs');
const util = require('util');
const test = require('ava');
const readVox = require('vox-reader');
const writeVox = require('../index');
const { diff } = require("json-diff")
const { omit, flatten } = require("ramda");
const { range} = require("lodash")


test('test extended.vox', (t : any) => 
{
    const buffer = fs.readFileSync('./test/extended.vox')
    const parsedBuffer = readVox(buffer);
    const vox = omit(
        Object.entries(parsedBuffer)
            .filter(([_key, value]) => Object.keys((value as Object)).length === 0)
            .map(([key, _value]) => key),
        parsedBuffer);
    console.log(util.inspect(vox, false, null, true))
    const writtenVox = writeVox(vox)
    const validationVox = readVox(writtenVox)
    t.assert(diff(vox, validationVox) === undefined, "vox-reader and vox-writer should be the same (handling extended files)");
    
    t.pass();
});

test('generate sphere', (t : any) => 
{   
    const SIZE = 20;
    const RADIUS = 8;

    const checkIfInsideSphere = (x : number, y : number, z : number) => {

        const cx = x - SIZE / 2;
        const cy = y - SIZE / 2;
        const cz = z - SIZE / 2;

        return cx * cx + cy * cy + cz * cz < RADIUS * RADIUS;
    }

    const xyziValues = 
        flatten(range(0, SIZE).map((z : number) => 
            range(0, SIZE).map((y : number) => 
                range(0, SIZE).map((x : number) => 
                    ({ x, y, z, i: checkIfInsideSphere(x, y, z) ? 1 : 0 })
                )
            )
        ))
        .filter((v : any) => checkIfInsideSphere(v.x, v.y, v.z))
    

    const vox = {
        size: { x: SIZE, y: SIZE, z: SIZE },
        xyzi: {
            numVoxels: xyziValues.length,
            values: xyziValues
        },
        rgba: {
            values: [
                {r: 255, g: 255, b: 255, a: 0},
                ...range(0, 254).map(() => ({r: 255, g: 255, b: 255, a: 255})),
            ]
        }
    }

    console.log(vox);

    const writtenVox = writeVox(vox)
    fs.writeFileSync('./test/sphere.vox', Buffer.from(writtenVox))

    t.pass();
});