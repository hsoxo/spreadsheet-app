"use client";

import React from "react";
import Cell from "./Cell";
import { numberToChar } from "@/utils";

const Sheet = ({ rows, columns }: { rows: number; columns: number }) => {
  return (
    <table>
      <thead>
        <tr>
          <th />
          {[...Array(columns)]
            .map((_, i) => numberToChar(i))
            .map((char) => (
              <th key={char}>{char}</th>
            ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rows)].map((_, i) => (
          <tr key={i}>
            <th>{i + 1}</th>
            {[...Array(columns)].map((_, j) => (
              <td key={j}>
                <Cell x={i} y={j} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Sheet;
