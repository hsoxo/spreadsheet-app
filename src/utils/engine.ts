import { charToNumber } from "./numberCharConversion";

export const getValue = (data: string[][], cell: string) => {
  if (!/^[A-Z][0-9]+$/.test(cell)) {
    throw new Error("Invalid cell name");
  }

  const col = charToNumber(cell[0]);
  const row = parseInt(cell[1]) - 1;

  return data[row]?.[col] || "";
};

export enum ErrorType {
  CIRCULAR_REF = "#CIRCULAR_REF",
  ERROR = "#ERROR",
}

export const getComputedValue = (
  cell: string,
  sheet: string[][],
  visited: Set<string> = new Set()
): string => {
  const raw = getValue(sheet, cell);
  if (!raw) return "";
  if (!raw.startsWith("=")) return raw;

  if (visited.has(cell)) return ErrorType.CIRCULAR_REF;

  visited.add(cell);

  const expr = raw.slice(1);
  const resolvedExpr = expr.replace(/([A-Z][0-9]+)/g, (ref) => {
    return getComputedValue(ref, sheet, new Set(visited)) || "0";
  });

  if (resolvedExpr.includes(ErrorType.CIRCULAR_REF)) {
    return ErrorType.CIRCULAR_REF;
  }
  try {
    const result = eval(resolvedExpr);
    return String(result);
  } catch (e) {
    console.error(e);
    return ErrorType.ERROR;
  }
};
