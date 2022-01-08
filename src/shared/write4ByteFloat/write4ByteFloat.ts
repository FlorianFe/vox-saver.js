
// see https://en.wikipedia.org/wiki/IEEE_754

const signedToUnsigned = (signed : number) : number => {
    return signed < 0 ? signed + 256 : signed;
}

const write4ByteFloat = (floatingPointNumber : number) : Array<number> =>
{
    const floatArray = new Float32Array(1);
    floatArray[0] = floatingPointNumber;
    const byteArray = new Int8Array(floatArray.buffer);
    const reducedByteArray = Array.from(byteArray.slice(0, 4))
        .map(val => signedToUnsigned(val));

    return reducedByteArray.reverse();
}

export = write4ByteFloat;
