

const write4ByteString = (text : string) : Array<number> =>
{
    if(text.length !== 4) throw Error("4 Byte String should have 4 characters");
    return text.split("").map(char => char.charCodeAt(0));
}

export = write4ByteString;
