"use client";

import { charToNumber } from "@/utils/numberCharConversion";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SheetState = {
  data: Array<Array<string>>;
  setCell: (cell: string, value: string) => void;
};

export const useSheetStore = create<SheetState>()(
  persist(
    (set) => ({
      data: [],
      setCell: (cell: string, value: string) =>
        set((state) => {
          const col = charToNumber(cell[0]);
          const row = parseInt(cell[1]) - 1;
          const newData = [...state.data];
          if (!newData[row]) {
            newData[row] = [];
          }
          newData[row][col] = value;
          return { data: newData };
        }),
    }),
    {
      name: "sheet-storage",
    }
  )
);
