import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CrosswordGeneratorButton from "./crossword-generator-button";

export default function CrosswordGeneratorBanner() {
  return (
    <Card className="flex h-fit w-full cursor-pointer flex-col justify-between p-4 sm:flex-row sm:justify-evenly sm:p-6">
      <div className="mb-4 sm:mb-0">
        <CardHeader className="p-0 text-start sm:p-4">
          <CardTitle className="text-lg font-bold sm:text-xl md:text-2xl">
            Generate your own crossword
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-center sm:p-4 sm:text-left">
          <p className="text-xs text-muted-foreground sm:text-sm md:text-base">
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
