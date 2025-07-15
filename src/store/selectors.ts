import { useSheetStore } from ".";
import { charToNumber } from "@/utils";

const getValue = (data: string[][], cell: string) => {
  const col = charToNumber(cell[0]);
  const row = parseInt(cell[1]);
  return data[row]?.[col];
};

export const getComputedValue = (
  cell: string,
  sheet: string[][],
  visited: Set<string> = new Set()
): string => {
  const raw = getValue(sheet, cell);

  if (!raw.startsWith("=")) return raw;

  if (visited.has(cell)) return "#ERROR";

  visited.add(cell);

  const expr = raw.slice(1);

  const resolvedExpr = expr.replace(/([A-Z][0-9]+])/g, (ref) => {
    return getComputedValue(ref, sheet, new Set(visited));
  });

  try {
    const result = eval(resolvedExpr);
    return String(result);
  } catch (e) {
    console.error(e);
    return "#ERROR";
  }
};

export function useCellValue(cell: string) {
  const data = useSheetStore((s) => s.data);
  const rawValue = getValue(data, cell) || "";
  const isFormula = rawValue.startsWith("=");

  return {
    value: isFormula ? getComputedValue(rawValue, data) : rawValue,
    isFormula: isFormula,
    rawValue,
  };
}
