"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { WordConfiguration, Position, Direction } from "@/types/types";
import { isPuzzleComplete } from "@/actions/isPuzzleComplete";
import { Button } from "./ui/button";

interface CrosswordGameProps {
  cols: number;
  rows: number;
  wordConfigs: WordConfiguration[];
  layout: string[][];
}

export default function CrosswordGame(props: CrosswordGameProps) {
  const { wordConfigs, layout, rows, cols } = props;
  const [selected, setSelected] = useState<Position>(wordConfigs[0].position);
  const [direction, setDirection] = useState<Direction>(
    wordConfigs[0].orientation,
  );

  const inputRefs = useRef<Array<Array<HTMLInputElement | null>>>(
    Array.from({ length: rows }, () => Array(cols).fill(null)),
  );

  const setInputRef = useCallback(
    (rowIndex: number, colIndex: number) => (el: HTMLInputElement | null) => {
      if (inputRefs.current) {
        inputRefs.current[rowIndex][colIndex] = el;
      }
    },
    [],
  );

  const isBeginingOfWord = (row: number, col: number) => {
    const word = wordConfigs.find(
      (word) => word.position[0] === row + 1 && word.position[1] === col + 1,
    );
    return word ? word.id : undefined;
  };

  const hideEmptyCells = (row: number, col: number) =>
    layout[row][col] === "-" ? "invisible border-none" : "";

  const selectionController = (row: number, col: number) => {
    //TODO: Implement selectionController
  };

  useEffect(() => {
    const [row, col] = selected;
    const input = inputRefs.current[row - 1][col - 1];
    if (input) {
      input.focus();
    }
  }, [selected]);

  return (
    <form action={isPuzzleComplete}>
      <table className="border-collapse">
        <tbody>
          {layout.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((_, colIndex) => (
                <td
                  key={`row-${rowIndex}-col-${colIndex}`}
                  className={`relative aspect-square h-16 w-16 border border-black text-center ${hideEmptyCells(rowIndex, colIndex)}`}
                >
                  <>
                    <label
                      htmlFor="word-position"
                      className="absolute flex items-center justify-center font-semibold"
                    >
                      {isBeginingOfWord(rowIndex, colIndex)}
                    </label>
                    <input
                      type="text"
                      name={`row-${rowIndex}-col-${colIndex}`}
                      id={`row-${rowIndex}-col-${colIndex}`}
                      ref={setInputRef(rowIndex, colIndex)}
                      onChange={(e) => {
                        e.target.value.match(/^[a-zA-Z]*$/)
                          ? (e.target.value = e.target.value.toUpperCase())
                          : (e.target.value = "");
                      }}
                      className="h-full w-full text-center text-xl"
                      maxLength={1}
                    />
                  </>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Button type="submit">Submit</Button>
    </form>
  );
}
