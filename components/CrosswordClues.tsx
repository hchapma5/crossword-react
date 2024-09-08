import React from "react";
import { Direction } from "@/types/types";

interface Clue {
  clue: string;
  direction: Direction;
  id: number;
}

interface CluesProps {
  clues: Clue[];
  className?: string;
}

interface ClueListProps {
  title: string;
  clues: Clue[];
}

const ClueList: React.FC<ClueListProps> = ({ title, clues }) => (
  <>
    <h2 className="mb-2 text-lg font-bold lg:text-2xl">{title}</h2>
    <ol className="flex list-none flex-col gap-y-2 pl-0">
      {clues.map((clue) => (
        <li key={clue.id} className="flex gap-2">
          <span className="w-6 flex-shrink-0 font-semibold text-gray-500">
            {clue.id}.
          </span>
          <span>{clue.clue}</span>
        </li>
      ))}
    </ol>
  </>
);

export default function CrosswordClues({ clues, className }: CluesProps) {
  const sortedClues = (direction: Direction) =>
    clues
      .filter((clue) => clue.direction === direction)
      .sort((a, b) => a.id - b.id);

  return (
    <div
      className={`flex flex-col gap-4 rounded-lg p-4 text-xs md:text-sm xl:text-base ${className}`}
    >
      <ClueList title="Across" clues={sortedClues("across")} />
      <ClueList title="Down" clues={sortedClues("down")} />
    </div>
  );
}
