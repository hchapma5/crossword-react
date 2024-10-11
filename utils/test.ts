// Generate test data for a hello, world crossword (ui testing)

import { insertCrosswordData } from "@/db/query";
import { generateCrosswordGameData } from "./crossword-utils";

const testData = [
  {
    clue: "Hello, _____",
    answer: "world",
  },
  {
    clue: "_____, world",
    answer: "hello",
  },
];

const { completedPuzzle } = generateCrosswordGameData(testData);

insertCrosswordData({
  theme: "hello, world",
  data: testData,
  createdBy: "test",
  answers: completedPuzzle,
});
