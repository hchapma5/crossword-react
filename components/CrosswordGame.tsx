"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface CrosswordGameProps {
  rows: number;
  cols: number;
  navigationArray: Array<Array<string>>;
  positionsMap: Map<
    string,
    { indices: { wordIndex: number; letterIndex: number }[]; id?: number }
  >;
  className?: string;
}

export default function CrosswordGame({
  rows,
  cols,
  navigationArray,
  positionsMap,
  className,
}: CrosswordGameProps) {
  const [currentPosition, setCurrentPosition] = useState({
    wordIndex: 0,
    letterIndex: 0,
  });
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  const setInputRef = useCallback(
    (position: string) => (el: HTMLInputElement | null) => {
      if (el && inputRefs.current) {
        inputRefs.current.set(position, el);
      }
    },
    [],
  );

  const moveToNextPosition = useCallback(() => {
    setCurrentPosition((prev) => {
      if (prev.letterIndex < navigationArray[prev.wordIndex].length - 1) {
        return { ...prev, letterIndex: prev.letterIndex + 1 };
      } else if (prev.wordIndex < navigationArray.length - 1) {
        return { wordIndex: prev.wordIndex + 1, letterIndex: 0 };
      }
      return prev;
    });
  }, [navigationArray]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toUpperCase();
      e.target.value = value.match(/^[A-Z]$/) ? value : "";
      if (value) moveToNextPosition();
    },
    [moveToNextPosition],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      const position = positionsMap.get(e.currentTarget.id)!.indices;
      const { wordIndex, letterIndex } =
        position[0].wordIndex === currentPosition.wordIndex
          ? position[1]
          : position[0];
      setCurrentPosition({
        wordIndex: wordIndex,
        letterIndex: letterIndex,
      });
    },
    [currentPosition, positionsMap],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Backspace":
          e.preventDefault();
          e.currentTarget.value = "";
          setCurrentPosition((prev) => ({
            ...prev,
            letterIndex: Math.max(0, prev.letterIndex - 1),
          }));
          break;
        case "Tab":
          e.preventDefault();
          setCurrentPosition((prev) => ({
            ...prev,
            letterIndex: e.shiftKey
              ? Math.max(0, prev.letterIndex - 1)
              : Math.min(
                  navigationArray[prev.wordIndex].length - 1,
                  prev.letterIndex + 1,
                ),
          }));
          break;
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
          e.preventDefault();
          const [currentRow, currentCol] = e.currentTarget.id
            .split(",")
            .map(Number);
          let nextRow = currentRow;
          let nextCol = currentCol;

          switch (e.key) {
            case "ArrowUp":
              nextRow = Math.max(0, currentRow - 1);
              break;
            case "ArrowDown":
              nextRow = Math.min(rows - 1, currentRow + 1);
              break;
            case "ArrowLeft":
              nextCol = Math.max(0, currentCol - 1);
              break;
            case "ArrowRight":
              nextCol = Math.min(cols - 1, currentCol + 1);
              break;
          }

          const nextCellId = `${nextRow},${nextCol}`;
          const nextCell = document.getElementById(
            nextCellId,
          ) as HTMLInputElement;
          if (nextCell) {
            handleClick({
              currentTarget: nextCell,
            } as React.MouseEvent<HTMLInputElement>);
          }
          break;
        case " ":
          e.preventDefault();
          break;
      }
    },
    [navigationArray, rows, cols, handleClick],
  );

  useEffect(() => {
    const selectedCell =
      navigationArray[currentPosition.wordIndex][currentPosition.letterIndex];
    inputRefs.current.get(selectedCell)?.focus();
  }, [currentPosition, navigationArray]);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
      className={`grid gap-[1px] ${className}`}
    >
      {Array.from({ length: rows * cols }, (_, index) => {
        const rowIndex = Math.floor(index / cols);
        const colIndex = index % cols;
        const position = `${rowIndex},${colIndex}`;
        const cellData = positionsMap.get(position);

        if (!cellData) return <div key={position} />;

        const isCurrentWord = cellData.indices.some(({ wordIndex }) => {
          return wordIndex === currentPosition.wordIndex;
        });

        return (
          <div
            key={position}
            className="relative aspect-square outline outline-1 outline-black"
          >
            {cellData.id && (
              <label className="absolute left-0 top-0 text-xs font-semibold">
                {cellData.id}
              </label>
            )}
            <input
              type="text"
              name={position}
              id={position}
              ref={setInputRef(position)}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onClick={handleClick}
              autoCorrect="off"
              autoComplete="off"
              onSelect={(e) => e.currentTarget.setSelectionRange(0, 1)}
              className={`h-full w-full text-center text-xl font-semibold ${isCurrentWord ? "bg-blue-100" : "bg-slate-100"}`}
              maxLength={1}
            />
          </div>
        );
      })}
    </div>
  );
}
