"use client";

import { useEffect, useRef } from "react";
import { checkIfThumbnailExists } from "@/db/storage";
import { useCrossword } from "./crossword-provider";
import { captureScreenshotAndUploadToStorage } from "@/utils/image-utils";

export default function CrosswordGrid() {
  const {
    currentPosition,
    positions,
    handleInputChange,
    handleClick,
    handleKeyDown,
    setInputRef,
    rows,
    cols,
    crosswordId,
  } = useCrossword();

  const crosswordGridRef = useRef(null);

  useEffect(() => {
    checkIfThumbnailExists(crosswordId).then((exists) => {
      if (exists) return;
      captureScreenshotAndUploadToStorage(crosswordGridRef, crosswordId);
    });
  }, [crosswordId]);

  return (
    <div
      ref={crosswordGridRef}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        aspectRatio: `${cols} / ${rows}`,
        width: "auto",
        height: "auto",
        gap: "1px",
      }}
      className={`max-h-fit max-w-fit`}
    >
      {Array.from({ length: rows * cols }, (_, index) => {
        const rowIndex = Math.floor(index / cols);
        const colIndex = index % cols;
        const position = `${rowIndex},${colIndex}`;
        const cellData = positions.get(position);

        if (!cellData) return <div key={position} className="aspect-square" />;

        const isCurrentWord = cellData.indices.some(({ wordIndex }) => {
          return wordIndex === currentPosition.wordIndex;
        });

        return (
          <div
            key={position}
            className="relative aspect-square outline outline-1 outline-black"
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
              className={`h-full w-full text-center text-[2vmin] font-semibold ${
                isCurrentWord ? "bg-blue-100" : "bg-slate-100"
              }`}
              maxLength={1}
            />
          </div>
        );
      })}
    </div>
  );
}
