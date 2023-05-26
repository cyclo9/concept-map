import db from "@/app/lib/mongo"
import { Document } from "mongodb"

import { Node, Axon } from '@/app/lib/types'
import Login from "./components/Login/page"

export default async function Page() {
	const nodesArray: Document[] = await db.collection('nodes').find().toArray()
	const axonsArray: Document[] = await db.collection('axons').find().toArray()
	const _ = await db.collection('_').find().toArray()

	const nodes: Node[] = nodesArray.map(node => (
		{
			key: node.id,
			location: node.location,
			label: node.label,
			color: node.color,
			category: node.category
		}
	))
	const axons: Axon[] = axonsArray.map(axon => (
		{
			key: axon.id,
			from: axon.from,
			to: axon.to
		}
	))
	const key: string = _[0].key

	return (
		<>
			<Login hash={key}>
				<p>Yay</p>
			</Login>
		</>
	)
}
