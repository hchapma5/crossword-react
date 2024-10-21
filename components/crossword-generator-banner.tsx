import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CrosswordGeneratorButton from "./crossword-generator-button";

export default function CrosswordGeneratorBanner() {
  return (
    <Card className="flex h-fit w-full cursor-pointer justify-evenly">
      <div>
        <CardHeader className="text-start">
          <CardTitle className="text-xl font-bold sm:text-2xl">
            Generate your own crossword
          </CardTitle>
        </CardHeader>
        <CardContent className="col-start-1 col-end-2 row-start-2 row-end-3 text-center">
          <p className="text-sm text-muted-foreground sm:text-base">
            Create unique, personalized crosswords with the power of AI
          </p>
        </CardContent>
      </div>
      <div className="flex items-center justify-center">
        <CrosswordGeneratorButton />
      </div>
    </Card>
  );
}
