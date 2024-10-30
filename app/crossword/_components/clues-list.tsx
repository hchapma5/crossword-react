import { Clue } from "@/types/types";

interface ClueListProps {
  title: string;
  clues: Clue[];
}

export default function ClueList({ title, clues }: ClueListProps) {
  return (
    <>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <ul className="w-full space-y-1">
        {clues.map((clue) => (
          <li key={clue.id} className="flex w-full">
            <span className="mr-2 flex-shrink-0 font-medium">{clue.id}.</span>
            <span className="flex-grow">{clue.clue}</span>
            <span className="ml-1 flex-shrink-0 text-sm text-muted-foreground">
              ({clue.length})
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
