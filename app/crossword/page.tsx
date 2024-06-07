import clg from "crossword-layout-generator"
import CrosswordClues from "@/components/CrosswordClues"
import CrosswordGrid from "@/components/CrosswordGrid"

import { Button } from "@/components/ui/button"
import { CrosswordData, CrosswordPuzzle, WordPosition } from "@/types/types"

const CrosswordPage = async () => {
  // const layout: CrosswordPuzzle = clg.generateLayout(crosswordData.data)
  // const clues = Array.from(layout.result, (data) => ({
  //   clue: data.clue,
  //   direction: data.orientation,
  //   position: data.position,
  // }))
  // const wordPositions: WordPosition[] = Array.from(layout.result, (word) => ({
  //   position: word.position,
  //   startx: word.startx,
  //   starty: word.starty,
  // }))

  return (
    <div className="flex flex-col items-center border-2 border-grey-500 w-full p-8">
      {/* <h1 className="font-semibold text-2xl mb-4">{theme}</h1> */}
      <div className="flex w-full justify-evenly p-4">
        {/* <CrosswordGrid
          cols={layout.cols}
          wordPositions={wordPositions}
          layout={layout.table}
        />
        <CrosswordClues clues={clues} /> */}
      </div>
      <div className="justify-center mt-4">
        <Button>Get a new puzzle</Button>
      </div>
    </div>
  )
}

export default CrosswordPage
