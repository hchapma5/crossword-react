"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Position, Direction } from "@/types/types";
import { Button } from "./ui/button";
import { isPuzzleComplete } from "@/app/crossword/[id]/page";
import next from "next";
import { set } from "react-hook-form";

interface CrosswordGameProps {
  rows: number;
  cols: number;
  wordArray: Array<{ direction: Direction; startingPosition: Position }>;
  positionMap: Map<string, number | null>;
}

export default function CrosswordGame(props: CrosswordGameProps) {
  const { rows, cols, wordArray, positionMap } = props;
  const [selected, setSelected] = useState<Position>(
    wordArray[0].startingPosition,
  );
  const [currentWord, setCurrentWord] = useState<number>(0);
  const [direction, setDirection] = useState<Direction>(wordArray[0].direction);

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

  //TODO: Handle care nextPosition ref already filled in with a value AND last word in the list is selected
  const setNextPosition = () => {
    let nextPosition = selected;
    switch (direction) {
      case "across":
        nextPosition = [selected[0], selected[1] + 1];
        break;
      case "down":
        nextPosition = [selected[0] + 1, selected[1]];
        break;
    }
    if (positionMap.has(nextPosition[0] + "," + nextPosition[1]))
      setSelected(nextPosition);
    else {
      setCurrentWord(currentWord + 1);
      setDirection(wordArray[currentWord + 1].direction);
      setSelected(wordArray[currentWord + 1].startingPosition);
    }
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
          {Array(rows)
            .fill(Array(cols).fill(""))
            .map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((_: any, colIndex: number) => (
                  <td
                    key={`${rowIndex},${colIndex}`}
                    className={`relative aspect-square h-12 w-12 border border-black text-center ${positionMap.has(`${rowIndex + 1},${colIndex + 1}`) ? "" : "invisible border-none"}`}
                  >
                    <>
                      <label
                        htmlFor="word-position"
                        className="absolute flex items-center justify-center font-semibold"
                      >
                        {positionMap.get(`${rowIndex + 1},${colIndex + 1}`)}
                      </label>
                      {positionMap.has(`${rowIndex + 1},${colIndex + 1}`) && (
                        <input
                          type="text"
                          name={`${rowIndex + 1},${colIndex + 1}`}
                          id={`${rowIndex + 1},${colIndex + 1}`}
                          ref={setInputRef(rowIndex, colIndex)}
                          onChange={(e) => {
                            e.target.value.match(/^[a-zA-Z]*$/)
                              ? (e.target.value = e.target.value.toUpperCase())
                              : (e.target.value = "");
                            setNextPosition();
                          }}
                          onKeyDown={(e) => {
                            let nextPosition = selected;
                            switch (e.key) {
                              case "ArrowUp":
                                nextPosition = [selected[0] - 1, selected[1]];
                                break;
                              case "ArrowDown":
                                nextPosition = [selected[0] + 1, selected[1]];
                                break;
                              case "ArrowLeft":
                                nextPosition = [selected[0], selected[1] - 1];
                                break;
                              case "ArrowRight":
                                nextPosition = [selected[0], selected[1] + 1];
                                break;
                              case "Tab":
                                e.preventDefault(); // Prevent default tabbing behavior
                                //TODO: Implement tabbing behavior
                                break;
                            }
                            if (
                              positionMap.has(
                                nextPosition[0] + "," + nextPosition[1],
                              )
                            )
                              setSelected(nextPosition);
                          }}
                          onClick={() => {
                            setSelected([rowIndex + 1, colIndex + 1]);
                          }}
                          // Handle Delete and Backspace
                          onSelect={(e) =>
                            e.currentTarget.setSelectionRange(0, 1)
                          }
                          className={`h-full w-full bg-slate-50 text-center text-xl`}
                          maxLength={1}
                        />
                      )}
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
