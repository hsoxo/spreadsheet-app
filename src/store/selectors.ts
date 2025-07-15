import { useSheetStore } from ".";
import { getValue, getComputedValue } from "@/utils/engine";

export function useCellValue(cell: string) {
  const data = useSheetStore((s) => s.data);
  const rawValue = getValue(data, cell) || "";
  const isFormula = rawValue.startsWith("=");

  return {
    value: isFormula ? getComputedValue(cell, data) : rawValue,
    isFormula: isFormula,
    rawValue,
  };
}
