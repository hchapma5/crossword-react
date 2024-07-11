"use client";

import { useState } from "react";
import { WordConfiguration, Position } from "@/types/types";
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
  const [position, setPosition] = useState<Position>(wordConfigs[0].position);
  // const [direction, setDirection] = useState<"across" | "down">("across");
  const [boardState, setBoardState] = useState<string[][]>(
    Array.from({ length: rows }, () => Array(cols).fill("")),
  );

  const isBeginingOfWord = (row: number, col: number) => {
    const word = wordConfigs.find(
      (word) => word.position[0] === row && word.position[1] === col,
    );
    return word ? word.id : undefined;
  };

  const hideEmptyCells = (row: number, col: number) =>
    layout[row][col] === "-" ? "invisible border-none" : "";

  return (
    <form action={isPuzzleComplete}>
      <table className="border-collapse">
        <tbody>
          {layout.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((letter, colIndex) => (
                <td
                  key={`row-${rowIndex}-col-${colIndex}`}
                  className={`aspect-square h-16 w-16 items-center justify-center border border-black text-center`}
                  // ${hideEmptyCells(rowIndex, colIndex)}
                >
                  <>
                    <label
                      htmlFor="word-position"
                      className="flex items-center justify-center font-semibold"
                    >
                      {isBeginingOfWord(rowIndex, colIndex)}
                    </label>
                    {letter}
                    {/* <input
                      type="text"
                      name={`row-${rowIndex}-col-${colIndex}`}
                      id={`row-${rowIndex}-col-${colIndex}`}
                      value={boardState[rowIndex][colIndex]}
                      onChange={(e) => {
                        const input = e.target.value;
                        if (input.match(/^[a-zA-Z]*$/)) {
                          setBoardState((prev) => {
                            const newState = [...prev];
                            newState[rowIndex][colIndex] = input.toUpperCase();
                            return newState;
                          });
                        }
                        console.log(input, rowIndex, colIndex);
                      }}
                      className="h-full w-full text-center text-xl"
                      maxLength={1}
                    /> */}
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
