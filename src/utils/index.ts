export const numberToChar = (n: number) => String.fromCharCode(65 + n);

export const charToNumber = (char: string) => char.charCodeAt(0) - 65;
