import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import cors from 'cors'
import HallRouter from './routes/hall.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/hall', HallRouter)
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log('App running on port', PORT)
})

// To connect to atlas mongoDB
const MONGO_URL = process.env.MONGO_URL

const createConnection = async () => {
	const client = new MongoClient(MONGO_URL)
	await client.connect()
	console.log('Mongo connected')
	return client
}

//Creating a new connection to mongodb
export const client = await createConnection()

//Initial check up
app.get('/', function (req, res) {
	res.send('App is up and running!!')
})
// console.log(new Date('2020-10-20T21:09:00Z'))
