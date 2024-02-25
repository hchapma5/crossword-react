import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const port = process.env.PORT
const app = express()

console.log("hello world")


app.get('/', async (req, res) => {
    res.send("hello world")
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
