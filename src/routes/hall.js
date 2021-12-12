import {
	addHall,
	getAllHalls,
	roomExists,
	bookByHallId,
	isHallAvailable,
} from './utils.js'
import express from 'express'

const router = express.Router()

//To add hall data
router.post('/add', async (request, response) => {
	const body = request.body
	const result = await addHall(body)
	response.send(result)
})

router.get('/', async (request, response) => {
	let halls = await getAllHalls()
	response.send(halls)
})

router.post('/booking/:id', async (request, response) => {
	const { id } = request.params
	const result = await roomExists(id)
	const body = request.body

	if (result) {
		body.startTime = new Date(`${body.date}T${body.startTime}Z`)
		body.endTime = new Date(`${body.date}T${body.endTime}Z`)
		body.date = new Date(body.date)

		if (isHallAvailable(result.bookings, body)) {
			const updated = await bookByHallId(id, body)
			response.send({ message: 'Hall booked successfully!' })
		} else {
			response.send({ message: 'Sorry! that slot has already been booked' })
		}
		return
	}
	response.send({ message: 'room not found' })
})
export default router
