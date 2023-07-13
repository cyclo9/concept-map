import db from "@/app/lib/mongo"
import { Document } from "mongodb"

import { Node, Axon } from '@/app/lib/types'
import Login from "@/app/components/Login/page"
import Graph from "@/app/components/Graph/page"

export default async function Page() {
	const nodesArray: Document[] = await db.collection('nodes').find().toArray()
	const axonsArray: Document[] = await db.collection('axons').find().toArray()
	const _ = await db.collection('_').find().toArray()

	// maps the nodes and axons into an array usable by GoJS
	const GoJSNodes: Node[] = nodesArray.map(node => (
		{
			key: node.id,
			location: node.location,
			label: node.label,
			color: node.color,
			category: node.category,
			data: node.data
		}
	))
	const GoJSLinks: Axon[] = axonsArray.map(axon => (
		{
			key: axon.id,
			from: axon.from,
			to: axon.to,
			label: axon.label,
			color: axon.color
		}
	))
	const key: string = _[0].key

	; (await db.collection('log').find().toArray()).forEach((doc: any) => {
		const filter = { id: doc.id }
		const update = { $set: { log: [] } }
		db.collection('log').updateOne(filter, update)
	})

	return (
		<>
			<Login hash={key}>
				<Graph
					nodes={GoJSNodes}
					links={GoJSLinks}
				/>
			</Login>
		</>
	)
}
