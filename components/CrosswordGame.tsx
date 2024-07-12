"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  WordPosition,
  Position,
  Direction,
  DirectionsMap,
} from "@/types/types";
import { isPuzzleComplete } from "@/actions/isPuzzleComplete";
import { Button } from "./ui/button";

interface CrosswordGameProps {
  cols: number;
  rows: number;
  positions: WordPosition[];
  directions: DirectionsMap;
  layout: string[][];
}

export default function CrosswordGame(props: CrosswordGameProps) {
  const { positions, directions, layout, rows, cols } = props;
  const [selected, setSelected] = useState<Position>(positions[0].position);
  const [direction, setDirection] = useState<Direction>(
    directions[`${selected[0]}-${selected[1]}`],
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
    const word = positions.find(
      (word) => word.position[0] === row + 1 && word.position[1] === col + 1,
    );
    return word ? word.id : undefined;
  };

  const hideEmptyCells = (row: number, col: number) =>
    layout[row][col] === "-" ? "invisible border-none" : "";

  useEffect(() => {
    console.log(selected);
    const [row, col] = selected;
    const input = inputRefs.current[row - 1][col - 1];
    if (input) {
      input.focus();
    }
    setDirection(
      directions[`${row}-${col}`] === "intersection"
        ? direction
        : directions[`${row}-${col}`],
    );
  }, [selected]);

  return (
    <form action={isPuzzleComplete}>
      <table className="border-collapse">
        g
        <tbody>
          {layout.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((_, colIndex) => (
                <td
                  key={`row-${rowIndex}-col-${colIndex}`}
                  className={`relative aspect-square h-16 w-16 border border-black text-center ${hideEmptyCells(rowIndex, colIndex)}`}
                >
                  {layout[rowIndex][colIndex] !== "-" && (
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
                          let nextPosition = selected;
                          if (direction === "across") {
                            nextPosition = [selected[0], selected[1] + 1];
                          } else if (direction === "down") {
                            nextPosition = [selected[0] + 1, selected[1]];
                          }
                          if (
                            inputRefs.current[nextPosition[0] - 1] &&
                            inputRefs.current[nextPosition[0] - 1][
                              nextPosition[1] - 1
                            ]
                          )
                            setSelected(nextPosition);
                        }}
                        onKeyDown={(e) => {
                          let nextPosition = selected;
                          if (e.key === "ArrowUp") {
                            nextPosition = [selected[0] - 1, selected[1]];
                          } else if (e.key === "ArrowDown") {
                            nextPosition = [selected[0] + 1, selected[1]];
                          } else if (e.key === "ArrowLeft") {
                            nextPosition = [selected[0], selected[1] - 1];
                          } else if (e.key === "ArrowRight") {
                            nextPosition = [selected[0], selected[1] + 1];
                          }
                          if (
                            inputRefs.current[nextPosition[0] - 1] &&
                            inputRefs.current[nextPosition[0] - 1][
                              nextPosition[1] - 1
                            ]
                          )
                            setSelected(nextPosition);
                        }}
                        onClick={() =>
                          setSelected([rowIndex + 1, colIndex + 1])
                        }
                        className="h-full w-full text-center text-xl"
                        maxLength={1}
                      />
                    </>
                  )}
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
