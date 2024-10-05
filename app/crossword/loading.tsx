"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";
import { generateRandomCrosswordGrid } from "@/utils/layout-generator";

export default function Loading() {
  const [mockData, setMockData] = useState(generateRandomCrosswordGrid);

  const rows = mockData.rows;
  const cols = mockData.cols;
  const layout = mockData.positions;

  // get theme from search params
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "Theme";

  useEffect(() => {
    const interval = setInterval(() => {
      setMockData(generateRandomCrosswordGrid);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center bg-background p-4">
      <div className="flex h-[80vh] w-full flex-col gap-4 md:flex-row">
        <div className="flex w-full justify-center overflow-hidden rounded-lg bg-gray-200 p-10">
          {/* Crossword Grid Skeleton */}
          <div
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
              const isFilled = layout.has(position);

              if (isFilled)
                return <Skeleton key={index} className="aspect-square" />;
              return <div className="aspect-square" key={index} />;
            })}
          </div>
        </div>
        {/* Clues Container Skeleton */}
        <div className="flex h-full w-full max-w-xs flex-col">
          <div className="flex items-center border-b p-4">
            <h2 className="text-2xl font-bold">{theme}</h2>
          </div>
          <ScrollArea className="w-full flex-grow">
            <div className="w-full space-y-4 p-4">
              <>
                <h3 className="mb-2 font-semibold">Across</h3>
                <ul className="w-full space-y-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <li key={index} className="flex w-full gap-x-2">
                      <Skeleton className="h-6 w-6 flex-shrink-0" />
                      <div className="flex flex-grow flex-col gap-y-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-1/2" />
                      </div>
                      <Skeleton className="h-6 w-6 flex-shrink-0" />
                    </li>
                  ))}
                </ul>
              </>
              <>
                <h3 className="mb-2 font-semibold">Down</h3>
                <ul className="w-full space-y-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <li key={index} className="flex w-full gap-x-2">
                      <Skeleton className="h-6 w-6 flex-shrink-0" />
                      <div className="flex flex-grow flex-col gap-y-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-1/2" />
                      </div>
                      <Skeleton className="h-6 w-6 flex-shrink-0" />
                    </li>
                  ))}
                </ul>
              </>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
