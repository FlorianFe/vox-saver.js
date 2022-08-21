# vox-saver

npm module for writing [.vox](https://github.com/ephtracy/voxel-model/blob/master/MagicaVoxel-file-format-vox.txt) files which are exported in [MagickaVoxel](https://ephtracy.github.io/). It's the inverse function to [vox-reader.js](https://github.com/FlorianFe/vox-reader.js)

## 💾 Installation

```bash
npm install --save vox-saver
```

## 🚀 Usage

Example for generating a voxel sphere

```js

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

const writtenVox = writeVox(vox)
fs.writeFileSync('./test/sphere.vox', Buffer.from(writtenVox))

```

## 📖 License

(c) 2022 Florian Fechner. [MIT License](https://github.com/FlorianFe/vox-saver.js/blob/master/LICENSE)

Extended features added by Maximilian Gaedig
