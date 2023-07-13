'use client'

import { ReactDiagram } from 'gojs-react'
import initDiagram from './Diagram'
import { useState, useRef } from 'react'

import { Node, Axon } from '@/app/lib/types'
import {
	createDoc,
	updateDoc,
	deleteDoc
} from './actions'
import Log from '@/app/components/Log/page'

export default function Graph({
	nodes,
	links
}: {
	nodes: Node[],
	links: Axon[]
}) {

	const initLoad = useRef<boolean>(true)
	/**
	 * Handles the creation, modification, and deletion of nodes and links.
	 * @param changes 
	 */
	const handleModelChange = (changes: go.IncrementalData) => {
		if (!initLoad.current) {
			const {
				insertedNodeKeys: newNodes,
				modifiedNodeData: modifiedNodes,
				removedNodeKeys: deletedNodes,
				insertedLinkKeys: newLinks,
				modifiedLinkData: modifiedLinks,
				removedLinkKeys: deletedLinks,
			} = changes;

			// node info is found in modifiedNodes
			newNodes && modifiedNodes ? modifiedNodes.forEach((node) => {
				createDoc({
					id: node.key,
					location: node.location,
					label: 'New Node',
					color: '#ffffff',
					category: node.category,
					data: ''
				}, 'nodes')
			}) : null

			// nodes are also considered modified when created
			modifiedNodes && !newNodes ? modifiedNodes.forEach((node) => {
				updateDoc(node.key, {
					label: node.label,
					location: node.location,
					color: node.color
				}, 'nodes')
			}) : null

			deletedNodes ? deletedNodes.forEach((key) => {
				// @ts-ignore
				deleteDoc(key, 'nodes')
			}) : null

			newLinks && modifiedLinks ? modifiedLinks.forEach((link) => {
				createDoc({
					id: link.key,
					from: link.from,
					to: link.to,
					label: '',
					color: link.color
				}, 'axons')
			}) : null

			modifiedLinks && !newLinks ? modifiedLinks.forEach((link) => {
				updateDoc(link.key, {
					from: link.from,
					to: link.to,
					label: link.label,
					color: link.color
				}, 'axons')
			}): null

			deletedLinks ? deletedLinks.forEach((key) => {
				// @ts-ignore
				deleteDoc(key, 'axons')
			}): null


		} else initLoad.current = false
	}

	return (
		<>
			<ReactDiagram
				initDiagram={initDiagram}
				onModelChange={handleModelChange}
				divClassName='absolute w-screen h-screen bg-white'
				nodeDataArray={nodes}
				linkDataArray={links}
			/>
			<Log />
		</>
	)
}