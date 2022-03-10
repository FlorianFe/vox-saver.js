const writeChars = (chars: string): number[] => {
    return chars.split("").map(char => char.charCodeAt(0));
}
export = writeChars;