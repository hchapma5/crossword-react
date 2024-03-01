import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";

interface CluesProps {
  clues: {
    clue: string;
    direction: string;
    position: number;
  }[];
}

export default function CrosswordClues(props: CluesProps) {
  const { clues } = props;

  const acrossClues = clues.filter((clue) => clue.direction === "across");
  const downClues = clues.filter((clue) => clue.direction === "down");

  return (
    <Card className="flex flex-col p-4 gap-4 w-1/4">
      <CardTitle>Clues</CardTitle>
      <CardDescription>Across</CardDescription>
      <CardContent>
        {acrossClues.map((clue) => (
          <div key={clue.position} className="flex gap-4">
            <p className="font-semibold text-gray-500">{clue.position}</p>
            <p>{clue.clue}</p>
          </div>
        ))}
      </CardContent>
      <CardDescription>Down</CardDescription>
      <CardContent>
        {downClues.map((clue) => (
          <div key={clue.position} className="flex gap-4">
            <p className="font-semibold text-gray-500">{clue.position}</p>
            <p>{clue.clue}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
