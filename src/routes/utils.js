import { ObjectId } from 'mongodb'
import { client } from '../index.js'

async function addHall(body) {
	return await client.db('myDB').collection('halls').insertOne(body)
}

async function getAllHalls() {
	return await client.db('myDB').collection('halls').find({}).toArray()
}

async function roomExists(id) {
	return await client
		.db('myDB')
		.collection('halls')
		.findOne({ _id: ObjectId(id) })
}

function isHallAvailable(bookings, body) {
	let result = true
	if (bookings) {
		bookings.forEach((booking) => {
			if (booking.date.getTime() === body.date.getTime()) {
				if (
					!(
						(body.startTime.getTime() < booking.startTime.getTime() ||
							body.startTime.getTime() >= booking.endTime.getTime()) &&
						(body.endTime.getTime() <= booking.startTime.getTime() ||
							body.endTime.getTime() > booking.endTime.getTime())
					)
				) {
					result = false
				}
			}
		})
	}
	return result
}

async function bookByHallId(id, body) {
	return await client
		.db('myDB')
		.collection('halls')
		.updateOne(
			{ _id: ObjectId(id) },
			{
				$addToSet: { bookings: body },
			}
		)
}

export { addHall, getAllHalls, roomExists, bookByHallId, isHallAvailable }
