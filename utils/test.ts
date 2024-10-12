// Generate test data for a hello, world crossword (ui testing)

import { insertCrosswordData } from "@/db/query";
import { generateCrosswordGameData } from "./crossword-utils";

const testData = [
  {
    clue: "Hello, _____",
    answer: "WORLD",
  },
  {
    clue: "_____, world",
    answer: "HELLO",
  },
];

const { answers } = generateCrosswordGameData(testData);

insertCrosswordData({
  theme: "Test Theme",
  data: testData,
  createdBy: "test",
  answers,
});
