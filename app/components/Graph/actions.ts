'use server'

import db from "@/app/lib/mongo"

export async function deleteNode(id: string) {
	await db.collection('nodes').deleteOne({ id: id })
}

export async function createDoc(data: object, collection: string) {
	await db.collection(collection).insertOne(data)
}

export async function updateDoc(id: string, data: object, collection: string) {
	const filter = { id: id }
	const update = { $set: data }
	await db.collection(collection).updateOne(filter, update)
		.catch((e) => console.log(e))
		.finally(() => console.log('Ok'))
}

export async function deleteDoc(id: string, collection: string) {
	await db.collection(collection).deleteOne({ id: id })
}