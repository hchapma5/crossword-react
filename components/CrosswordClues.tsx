import { Direction } from "@/types/types";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";

interface CluesProps {
  clues: {
    clue: string;
    direction: Direction;
    id: number;
  }[];
}

export default function CrosswordClues(props: CluesProps) {
  const { clues } = props;

  const acrossClues = clues
    .filter((clue) => clue.direction === "across")
    .sort((a, b) => a.id - b.id);
  const downClues = clues
    .filter((clue) => clue.direction === "down")
    .sort((a, b) => a.id - b.id);

  return (
    <Card className="flex flex-col gap-4 bg-pink-300 p-8">
      <CardTitle>Clues</CardTitle>
      <CardDescription>Across</CardDescription>
      <CardContent>
        {acrossClues.map((clue) => (
          <div key={clue.id} className="flex gap-4">
            <p className="font-semibold text-gray-500">{clue.id}</p>
            <p>{clue.clue}</p>
          </div>
        ))}
      </CardContent>
      <CardDescription>Down</CardDescription>
      <CardContent>
        {downClues.map((clue) => (
          <div key={clue.id} className="flex gap-4">
            <p className="font-semibold text-gray-500">{clue.id}</p>
            <p>{clue.clue}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
