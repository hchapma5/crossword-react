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

  const acrossClues = clues.filter((clue) => clue.direction === "across");
  const downClues = clues.filter((clue) => clue.direction === "down");

  return (
    <Card className="flex w-1/4 flex-col gap-4 p-4">
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
