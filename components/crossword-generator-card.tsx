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
    <>
      <Card className="mx-auto w-full max-w-sm cursor-pointer transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Generate your own crossword
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Create unique, personalized crosswords with the power of AI
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <CrosswordGeneratorButton />
        </CardFooter>
      </Card>
    </>
  );
}
