import dotenv from 'dotenv'
import express from 'express'
import crosswordRouter from './api/crosswordRouter'

dotenv.config()

const port = process.env.PORT
const app = express()

app.use(express.json())

app.use('/api', crosswordRouter)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
