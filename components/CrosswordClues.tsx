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
  <div className="mb-4">
    <h2 className="mb-2 text-xl font-bold">{title}</h2>
    <ol className="list-none pl-0">
      {clues.map((clue) => (
        <li key={clue.id} className="mb-2 flex gap-4">
          <span className="w-8 font-semibold text-gray-500">{clue.id}</span>
          <span>{clue.clue}</span>
        </li>
      ))}
    </ol>
  </div>
);

export default function CrosswordClues({ clues, className }: CluesProps) {
  const sortedClues = (direction: Direction) =>
    clues
      .filter((clue) => clue.direction === direction)
      .sort((a, b) => a.id - b.id);

  return (
    <div className={`flex flex-col gap-4 p-8 ${className}`}>
      <ClueList title="Across" clues={sortedClues("across")} />
      <ClueList title="Down" clues={sortedClues("down")} />
    </div>
  );
}
