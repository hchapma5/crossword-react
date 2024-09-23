"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ScreenCapture from "./screen-capture";
import { checkIfThumbnailExists } from "@/db/storage";
import { useCrossword } from "./crossword-provider";

export default function CrosswordGrid() {
  const {
    currentPosition,
    positionsMap,
    handleInputChange,
    handleClick,
    handleKeyDown,
    setInputRef,
    rows,
    cols,
  } = useCrossword();
  const [needsScreenCapture, setNeedsScreenCapture] = useState(false);

  const crosswordId = useParams().id as string;

  useEffect(() => {
    checkIfThumbnailExists(crosswordId).then((exists) => {
      setNeedsScreenCapture(!exists);
    });
  }, [crosswordId]);

  const puzzleContent = (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        aspectRatio: `${cols} / ${rows}`,
        width: '100%',
        gap: '1px',
      }}
      className='max-h-fit max-w-fit'
    >
      {Array.from({ length: rows * cols }, (_, index) => {
        const rowIndex = Math.floor(index / cols)
        const colIndex = index % cols;
        const position = `${rowIndex},${colIndex}`;
        const cellData = positionsMap.get(position);

        if (!cellData) return <div key={position} className="aspect-square" />;

        const isCurrentWord = cellData.indices.some(({ wordIndex }) => {
          return wordIndex === currentPosition.wordIndex;
        });

        return (
          <div
            key={position}
            className="relative outline outline-1 outline-black aspect-square"
          >
            {cellData.id && (
              <label className="absolute left-0 top-0 text-[1vmin] font-semibold">
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
              className={`w-full h-full text-center text-[2vmin] font-semibold ${
                isCurrentWord ? "bg-blue-100" : "bg-slate-100"
              }`}
              maxLength={1}
            />
          </div>
        );
      })}
    </div>
  );

  return needsScreenCapture ? (
    <ScreenCapture imageId={crosswordId}>{puzzleContent}</ScreenCapture>
  ) : (
    puzzleContent
  );
}
