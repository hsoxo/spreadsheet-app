import { charToNumber, numberToChar } from "../numberCharConversion";
import { expect, test, describe } from "vitest";

describe("charToNumber", () => {
  test("converts a character to its corresponding number", () => {
    expect(charToNumber("A")).toBe(0);
    expect(charToNumber("B")).toBe(1);
    expect(charToNumber("Z")).toBe(25);
  });
});

describe("numberToChar", () => {
  test("converts a number to its corresponding character", () => {
    expect(numberToChar(0)).toBe("A");
    expect(numberToChar(1)).toBe("B");
    expect(numberToChar(25)).toBe("Z");
  });
});
