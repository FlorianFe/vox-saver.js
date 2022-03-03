import unreadInt from "../unreadInt/unreadInt";


const writeString = (text : string) : number[] =>
{
    const textArray = text.split("")
    return [...unreadInt(textArray.length), ...textArray.map(char => char.charCodeAt(0))];
}

export = writeString;
