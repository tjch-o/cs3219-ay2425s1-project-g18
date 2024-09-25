import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connectToDatabase } from './db'
import { router as addQuestionRoute } from '../routes/addQuestionRoute'
import { router as deleteQuestionRoute } from '../routes/deleteQuestionRoute'

dotenv.config({ path: './.env' })

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const port: string | undefined = process.env.PORT

connectToDatabase()

app.use(addQuestionRoute)
app.use(deleteQuestionRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
