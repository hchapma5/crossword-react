import { Clue, Direction } from "../types/types";
import { ScrollArea } from "./ui/scroll-area";
import ClueList from "./clues-list";

interface CrosswordCluesProps {
  clues: Clue[];
}

export default function CluesContainer({ clues }: CrosswordCluesProps) {
  const sortedClues = (direction: Direction) =>
    clues
      .filter((clue) => clue.direction === direction)
      .sort((a, b) => a.id - b.id);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="text-2xl font-bold">Clues</h2>
      </div>
      <ScrollArea className="flex-grow">
        <div className="space-y-4 p-4">
          <ClueList title="Across" clues={sortedClues("across")} />
          <ClueList title="Down" clues={sortedClues("down")} />
        </div>
      </ScrollArea>
    </div>
  );
}
