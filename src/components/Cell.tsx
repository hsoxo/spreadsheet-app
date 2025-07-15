"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSheetStore } from "../store";
import { useCellValue } from "@/store/selectors";
import { numberToChar } from "@/utils/numberCharConversion";

const Cell = ({ x, y }: { x: number; y: number }) => {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState("");
  const [localRawValue, setLocalRawValue] = useState("");

  const cellName = useMemo(() => `${numberToChar(y)}${x + 1}`, [x, y]);

  const setCell = useSheetStore((state) => state.setCell);
  const { value, rawValue } = useCellValue(cellName);
  const handleConfirm = () => {
    setCell(cellName, localRawValue);
    setEditing(false);
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    setLocalRawValue(rawValue);
  }, [rawValue]);

  return (
    <div
      data-testid={`cell-${cellName}`}
      onClick={() => setEditing(true)}
      className="w-32 h-8 bg-gray-100 flex items-center justify-center border border-gray-300 cursor-pointer"
    >
      {editing ? (
        <div className="px-1">
          <input
            autoFocus
            type="text"
            value={localRawValue}
            onChange={(e) => setLocalRawValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleConfirm();
              }
            }}
            onBlur={handleConfirm}
            className="w-full h-full outline-none"
          />
        </div>
      ) : (
        localValue
      )}
    </div>
  );
};

export default Cell;
