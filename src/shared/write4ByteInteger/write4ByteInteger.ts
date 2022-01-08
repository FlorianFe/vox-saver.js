
const { pow } = Math;
const RANGE_4 = [0, 1, 2, 3];
const MAX_OF_4_BYTE_INTEGER = pow(2, 32) - 1;

const write4ByteInteger = (number : number) : Array<number> =>
{
    if(number % 1 !== 0) throw Error("expect number to be an integer. Found: " + number);
    if(number < 0) throw Error("expect number to be positive");
    if(number > MAX_OF_4_BYTE_INTEGER) throw Error("expect number to be less than 2^32");

    return RANGE_4.map(index => (number >> (index * 8)) % 256);
}

export = write4ByteInteger;

