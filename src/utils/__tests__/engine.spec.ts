import { getValue, getComputedValue, ErrorType } from "../engine";
import { describe, expect, test } from "vitest";

describe("getValue", () => {
  test("should return correct value", () => {
    const data = [
      ["A", "B", "C"],
      ["D", "E", "F"],
    ];
    expect(getValue(data, "A1")).toBe("A");
    expect(getValue(data, "B2")).toBe("E");

    expect(getValue(data, "E3")).toBe("");
  });

  test("should return error message", () => {
    const data = [
      ["A", "B", "C"],
      ["D", "E", "F"],
    ];
    expect(() => getValue(data, "11")).toThrow("Invalid cell name");
    expect(() => getValue(data, "AA1")).toThrow("Invalid cell name");
    expect(() => getValue(data, "a1")).toThrow("Invalid cell name");
    expect(() => getValue(data, " A1")).toThrow("Invalid cell name");
    expect(() => getValue(data, "A1 ")).toThrow("Invalid cell name");
  });
});

describe("getComputedValue", () => {
  test("should return correct value", () => {
    const data = [
      ["1", "4", "7"],
      ["2", "=A1 + C2", "8"],
      ["3", "6", "=B1 + B2"],
    ];

    expect(getComputedValue("B2", data)).toBe("9");

    expect(getComputedValue("C3", data)).toBe("13");
  });

  test("should return error message", () => {
    const data = [
      ["1", "4", "7"],
      ["2", "=A1 + C3", "8"],
      ["3", "6", "=B1 + B2"],
    ];

    expect(getComputedValue("C3", data)).toBe(ErrorType.CIRCULAR_REF);
  });
});
