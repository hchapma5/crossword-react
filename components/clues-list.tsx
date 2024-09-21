import { Clue } from "@/types/types";

interface ClueListProps {
  title: string;
  clues: Clue[];
}

export default function ClueList({ title, clues }: ClueListProps) {
  return (
    <>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <ul className="space-y-2">
        {clues.map((clue) => (
          <li key={clue.id} className="flex gap-2">
            <span className="flex-grow overflow-hidden text-ellipsis">
              {`${clue.id + 1}. ${clue.clue} (${clue.length})`}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
