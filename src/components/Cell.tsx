"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { useSheetStore } from "../store";
import { useCellValue } from "@/store/selectors";
import { numberToChar } from "@/utils";

const Cell = ({ x, y }: { x: number; y: number }) => {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState("");

  const cellName = useMemo(() => `${numberToChar(y)}${x + 1}`, [x, y]);

  const setCell = useSheetStore((state) => state.setCell);
  const { value } = useCellValue(cellName);
  const handleConfirm = () => {
    setCell(cellName, localValue);
    setEditing(false);
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div
      onClick={() => setEditing(true)}
      className="w-40 h-8 bg-gray-100 flex items-center justify-center border border-gray-300 cursor-pointer"
    >
      {editing ? (
        <input
          autoFocus
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setCell(cellName, localValue);
              setEditing(false);
            }
          }}
          onBlur={handleConfirm}
        />
      ) : (
        localValue
      )}
    </div>
  );
};

export default Cell;
