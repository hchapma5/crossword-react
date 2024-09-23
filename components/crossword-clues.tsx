"use client";

import { ScrollArea } from "./ui/scroll-area";
import ClueList from "./clues-list";
import { useCrossword } from "./crossword-provider";
import { Direction } from "@/types/types";

export default function CrosswordClues() {
  const { clues, theme } = useCrossword();

  const sortedClues = (direction: Direction) =>
    clues
      .filter((clue) => clue.direction === direction)
      .sort((a, b) => a.id - b.id);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-2xl font-bold">{theme}</h2>
      </div>
      <ScrollArea className="w-full flex-grow">
        <div className="w-full space-y-4 p-4">
          <ClueList title="Across" clues={sortedClues("across")} />
          <ClueList title="Down" clues={sortedClues("down")} />
        </div>
      </ScrollArea>
    </div>
  );
}
