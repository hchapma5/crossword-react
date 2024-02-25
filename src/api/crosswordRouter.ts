import express, { Request, Response } from 'express'
import askGeminiForCrosswordData from './genAI'

const crosswordRouter = express.Router()

crosswordRouter.post('/crossword', async (req: Request, res: Response) => {
    const theme = req.body.theme
    const totalWordCount = req.body.totalWordCount

    const crosswordData = await askGeminiForCrosswordData(theme, totalWordCount)

    if (crosswordData) {
        res.status(200).json(crosswordData)
    } else {
        res.status(500).send('Error generating crossword data')
    }

})

export default crosswordRouter