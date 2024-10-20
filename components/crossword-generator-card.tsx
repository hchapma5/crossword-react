import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CrosswordGeneratorButton from "./crossword-generator-button";

export default function CrosswordGeneratorCard() {
  return (
    <Card className="flex h-96 w-full cursor-pointer flex-col justify-between transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold sm:text-2xl">
          Generate your own crossword
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground sm:text-base">
          Create unique, personalized crosswords with the power of AI
        </p>
      </CardContent>
      <CardFooter className="justify-center">
        <CrosswordGeneratorButton />
      </CardFooter>
    </Card>
  );
}
