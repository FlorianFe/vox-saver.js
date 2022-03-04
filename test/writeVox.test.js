"use strict";
const fs = require('fs');
const util = require('util');
const test = require('ava');
const readVox = require('vox-reader');
const writeVox = require('../index');
const { diff } = require("json-diff");
// test('test deer.vox', (t : any) => 
// {
//     const buffer = fs.readFileSync('./test/deer.vox')
//     const vox = readVox(buffer)
//     const parsedVox = readVox(writeVox(vox))
//     t.assert(diff(vox, parsedVox) === undefined, "vox-reader and vox-writer should be the same");
//     t.pass();
// });
test('test extended.vox', (t) => {
    const buffer = fs.readFileSync('./test/extended.vox');
    const vox = readVox(buffer);
    console.log(util.inspect(vox, false, null, true));
    const writtenVox = writeVox(vox);
    fs.writeFileSync('./test/extended-out.vox', Buffer.from(writtenVox));
    const validationVox = readVox(writtenVox);
    t.assert(diff(vox, validationVox) === undefined, "vox-reader and vox-writer should be the same (handling extended files)");
    t.pass();
});
//# sourceMappingURL=writeVox.test.js.map