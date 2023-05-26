'use server'

import db from "@/app/lib/mongo"

export async function getKey() {
	const _ = await db.collection('_').find().toArray()
	return _[0].key
}