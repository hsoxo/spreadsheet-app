"use client";

import { charToNumber } from "@/utils";
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
      setCell: (cell: string, value) =>
        set((state) => {
          const col = charToNumber(cell[0]);
          const row = parseInt(cell[1]);
          const newData = [...state.data];
          if (!newData[row]) {
            newData[row] = [];
          }
          newData[row][col] = value;
          console.log(newData);
          return { data: newData };
        }),
    }),
    {
      name: "sheet-storage", // 存入 localStorage 的 key
    }
  )
);
