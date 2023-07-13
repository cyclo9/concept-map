import * as go from 'gojs'
import { Selection } from '@/app/lib/types'
import { generateId } from '@/app/lib/id'

const initDiagram = (): go.Diagram => {
	const $ = go.GraphObject.make

	// * DIAGRAM
	const diagram = $(go.Diagram,
		{
			'undoManager.isEnabled': true,
			// double click bg to create new node
			'clickCreatingTool.archetypeNodeData': {
				label: 'New Node',
				color: '#ffffff',
				category: 'node'
			},
			model: new go.GraphLinksModel({ linkKeyProperty: 'key' }),
			initialPosition: go.Point.parse('0 0'),
			initialScale: 0.75,
			scrollMode: go.Diagram.InfiniteScroll
		})
	
	/**
	 * changes the color of the node
	 * @param color hex code
	 */
	const changeColor = (obj: any, color: string) => {
		diagram.commit((d) => {
			const part = obj.part.data
			d.model.set(part, 'color', color)
		})
	}

	/**
	 * creates an anchor node at the mouse cursor
	 * @param e 
	 */
	const createAxon = (e: any) => {
		diagram.commit((d) => {
			const node: object = { category: 'anchor' }
			d.model.addNodeData(node)
			// sets the location of the anchor at the cursor
			d.findPartForData(node)!.location = e.diagram.toolManager.contextMenuTool.mouseDownPoint

			const key = `anchor~${generateId(6)}`
			d.model.set(node, 'key', key)
		})
	}

	// * LINK TEMPLATE
	diagram.linkTemplate = $(go.Link,
		{
			relinkableFrom: true, relinkableTo: true,
			toShortLength: 2,
			zOrder: -1, // ensures that the links are always on the bottom
			cursor: 'pointer'
		},
		// this acts as the link's extended hitbox
		$(go.Shape, { isPanelMain: true, stroke: 'transparent', strokeWidth: 25 }),
		// this is what the user sees
		$(go.Shape, 'Rectangle',
			{ isPanelMain: true, strokeWidth: 5, stroke: '#000000' },
			new go.Binding('stroke', 'color'),
		),
		// Arrowhead
		$(go.Shape, { toArrow: 'Standard', scale: 1 }),
		// Label
		$(go.Panel, 'Auto',
			$(go.Shape, 'Rectangle',
				{ fill: 'white', stroke: null }
			),
			$(go.TextBlock,
				{ font: '13pt Gilmer', editable: true, margin: 2 },
				new go.Binding('text', 'label').makeTwoWay()
			)
		),
		{
			contextMenu: $('ContextMenu', 'Table',
				$(go.RowColumnDefinition, { column: 15, width: 3 }),
				// ! ROW 0 - WHITE
				$('ContextMenuButton',
					{ row: 0, column: 0, columnSpan: 3 },
					{ '_buttonFillOver': '#ffffff' },
					$(go.TextBlock, 'White',
						{ margin: 4, font: '13pt Gilmer' },
					), { click: (e, obj) => changeColor(obj, '#ffffff') }
				),
				// ! ROW 1 - GRAY
				$('ContextMenuButton',
					{ row: 1, column: 0 },
					{ '_buttonFillOver': '#9ca3af' },
					$(go.TextBlock, 'Gray',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#9ca3af') }
				),
				$('ContextMenuButton',
					{ row: 1, column: 1 },
					{ '_buttonFillOver': '#d1d5db' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#d1d5db') }
				),
				$('ContextMenuButton',
					{ row: 1, column: 2 },
					{ '_buttonFillOver': '#71717a' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#71717a') }
				),
				// ! ROW 2 - RED
				$('ContextMenuButton',
					{ row: 2, column: 0 },
					{ '_buttonFillOver': '#ff8888' },
					$(go.TextBlock, 'Red',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#ff8888') }
				),
				$('ContextMenuButton',
					{ row: 2, column: 1 },
					{ '_buttonFillOver': '#fca5a5' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#fca5a5') }
				),
				$('ContextMenuButton',
					{ row: 2, column: 2 },
					{ '_buttonFillOver': '#f87171' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#f87171') }
				),
				// TODO: ROW 3 - ORANGE
				$('ContextMenuButton',
					{ row: 3, column: 0 },
					{ '_buttonFillOver': '#fdba74' },
					$(go.TextBlock, 'Orange',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#fdba74') }
				),
				$('ContextMenuButton',
					{ row: 3, column: 1 },
					{ '_buttonFillOver': '#fed7aa' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#fed7aa') }
				),
				$('ContextMenuButton',
					{ row: 3, column: 2 },
					{ '_buttonFillOver': '#fb923c' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#fb923c') }
				),
				// ! ROW 4 - YELLOW
				$('ContextMenuButton',
					{ row: 4, column: 0 },
					{ '_buttonFillOver': '#fde68a' },
					$(go.TextBlock, 'Yellow',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#fde68a') }
				),
				$('ContextMenuButton',
					{ row: 4, column: 1 },
					{ '_buttonFillOver': '#fef9c3' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#fef9c3') }
				),
				$('ContextMenuButton',
					{ row: 4, column: 2 },
					{ '_buttonFillOver': '#fde047' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#fde047') }
				),
				// ! ROW 5 - LIME
				$('ContextMenuButton',
					{ row: 5, column: 0 },
					{ '_buttonFillOver': '#bef264' },
					$(go.TextBlock, 'Lime',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#bef264') }
				),
				$('ContextMenuButton',
					{ row: 5, column: 1 },
					{ '_buttonFillOver': '#d9f99d' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#d9f99d') }
				),
				$('ContextMenuButton',
					{ row: 5, column: 2 },
					{ '_buttonFillOver': '#a3e635' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#a3e635') }
				),
				// ! ROW 6 - GREEN
				$('ContextMenuButton',
					{ row: 6, column: 0 },
					{ '_buttonFillOver': '#8fef8f' },
					$(go.TextBlock, 'Green',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#8fef8f') }
				),
				$('ContextMenuButton',
					{ row: 6, column: 1 },
					{ '_buttonFillOver': '#86efac' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#d9f99d') }
				),
				$('ContextMenuButton',
					{ row: 6, column: 2 },
					{ '_buttonFillOver': '#4ade80' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#4ade80') }
				),
				// ! ROW 7 - CYAN
				$('ContextMenuButton',
					{ row: 7, column: 0 },
					{ '_buttonFillOver': '#67e8f9' },
					$(go.TextBlock, 'Cyan',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#67e8f9') }
				),
				$('ContextMenuButton',
					{ row: 7, column: 1 },
					{ '_buttonFillOver': '#a5f3fc' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#a5f3fc') }
				),
				$('ContextMenuButton',
					{ row: 7, column: 2 },
					{ '_buttonFillOver': '#22d3ee' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#22d3ee') }
				),
				// ! ROW 8 - SKY
				$('ContextMenuButton',
					{ row: 8, column: 0 },
					{ '_buttonFillOver': '#7dd3fc' },
					$(go.TextBlock, 'Sky',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#7dd3fc') }
				),
				$('ContextMenuButton',
					{ row: 8, column: 1 },
					{ '_buttonFillOver': '#bae6fd' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#bae6fd') }
				),
				$('ContextMenuButton',
					{ row: 8, column: 2 },
					{ '_buttonFillOver': '#38bdf8' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#38bdf8') }
				),
				// ! ROW 9 - BLUE
				$('ContextMenuButton',
					{ row: 9, column: 0 },
					{ '_buttonFillOver': '#60a5fa' },
					$(go.TextBlock, 'Blue',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#60a5fa') }
				),
				$('ContextMenuButton',
					{ row: 9, column: 1 },
					{ '_buttonFillOver': '#93c5fd' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#93c5fd') }
				),
				$('ContextMenuButton',
					{ row: 9, column: 2 },
					{ '_buttonFillOver': '#3b82f6' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#3b82f6') }
				),
				// ! ROW 10 - INDIGO
				$('ContextMenuButton',
					{ row: 10, column: 0 },
					{ '_buttonFillOver': '#818cf8' },
					$(go.TextBlock, 'Indigo',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#818cf8') }
				),
				$('ContextMenuButton',
					{ row: 10, column: 1 },
					{ '_buttonFillOver': '#a5b4fc' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#a5b4fc') }
				),
				$('ContextMenuButton',
					{ row: 10, column: 2 },
					{ '_buttonFillOver': '#6366f1' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#6366f1') }
				),
				// ! ROW 11 - VIOLET
				$('ContextMenuButton',
					{ row: 11, column: 0 },
					{ '_buttonFillOver': '#a78bfa' },
					$(go.TextBlock, 'Violet',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#a78bfa') }
				),
				$('ContextMenuButton',
					{ row: 11, column: 1 },
					{ '_buttonFillOver': '#c4b5fd' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#c4b5fd') }
				),
				$('ContextMenuButton',
					{ row: 11, column: 2 },
					{ '_buttonFillOver': '#8b5cf6' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#8b5cf6') }
				),
				// ! ROW 12 - PURPLE
				$('ContextMenuButton',
					{ row: 12, column: 0 },
					{ '_buttonFillOver': '#c084fc' },
					$(go.TextBlock, 'Purple',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#c084fc') }
				),
				$('ContextMenuButton',
					{ row: 12, column: 1 },
					{ '_buttonFillOver': '#d8b4fe' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#d8b4fe') }
				),
				$('ContextMenuButton',
					{ row: 12, column: 2 },
					{ '_buttonFillOver': '#a855f7' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#a855f7') }
				),
				// ! ROW 13 - FUCHSIA
				$('ContextMenuButton',
					{ row: 13, column: 0 },
					{ '_buttonFillOver': '#e879f9' },
					$(go.TextBlock, 'Fuchsia',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#e879f9') }
				),
				$('ContextMenuButton',
					{ row: 13, column: 1 },
					{ '_buttonFillOver': '#f0abfc' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#f0abfc') }
				),
				$('ContextMenuButton',
					{ row: 13, column: 2 },
					{ '_buttonFillOver': '#d946ef' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#d946ef') }
				),
				// ! ROW 14 - PINK
				$('ContextMenuButton',
					{ row: 14, column: 0 },
					{ '_buttonFillOver': '#f472b6' },
					$(go.TextBlock, 'Pink',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#f472b6') }
				),
				$('ContextMenuButton',
					{ row: 14, column: 1 },
					{ '_buttonFillOver': '#f9a8d4' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#f9a8d4') }
				),
				$('ContextMenuButton',
					{ row: 14, column: 2 },
					{ '_buttonFillOver': '#ec4899' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#ec4899') }
				),
			)
		}
	)

	// * NODE TEMPLATE
	const nodeTemplate = $(go.Node, 'Auto',
		{ zOrder: 1  }, // ensures that nodes are always on top
		new go.Binding('location', 'location', go.Point.parse).makeTwoWay(go.Point.stringify),
		$(go.Panel, go.Panel.Spot,
			{ width: 250, height: 190 },
			$(go.Shape, 'Ellipse',
				{
					strokeWidth: 3,
					fill: '#ffffff',
					portId: '',
					cursor: 'pointer',
					fromLinkable: true, fromLinkableSelfNode: false, fromLinkableDuplicates: false,
					toLinkable: true, toLinkableSelfNode: false, toLinkableDuplicates: false
				},
				new go.Binding('fill', 'color')
			),
			// this acts as the node's hitbox
			// draggable and openable
			$(go.Shape, 'Ellipse',
				{
					strokeWidth: 2,
					fill: 'lightgray',
					width: 190,
					height: 140,
					opacity: 0,
				},
			),
			// only draggable
			$(go.TextBlock,
				{
					width: 150,
					height: 100,
					font: '14pt Gilmer',
					editable: true,
					textAlign: 'center',
					verticalAlignment: go.Spot.Center,
					isMultiline: true,
					wrap: go.TextBlock.WrapFit,
					overflow: go.TextBlock.OverflowEllipsis,
					cursor: 'pointer'
				},
				new go.Binding('text', 'label').makeTwoWay()
			)
		),
		{
			contextMenu: $('ContextMenu', 'Table',
				$(go.RowColumnDefinition, { column: 15, width: 3 }),
				// ! ROW 0 - WHITE
				$('ContextMenuButton',
					{ row: 0, column: 0, columnSpan: 3 },
					{ '_buttonFillOver': '#ffffff' },
					$(go.TextBlock, 'White',
						{ margin: 4, font: '13pt Gilmer' },
					), { click: (e, obj) => changeColor(obj, '#ffffff') }
				),
				// ! ROW 1 - GRAY
				$('ContextMenuButton',
					{ row: 1, column: 0 },
					{ '_buttonFillOver': '#9ca3af' },
					$(go.TextBlock, 'Gray',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#9ca3af') }
				),
				$('ContextMenuButton',
					{ row: 1, column: 1 },
					{ '_buttonFillOver': '#d1d5db' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#d1d5db') }
				),
				$('ContextMenuButton',
					{ row: 1, column: 2 },
					{ '_buttonFillOver': '#71717a' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#71717a') }
				),
				// ! ROW 2 - RED
				$('ContextMenuButton',
					{ row: 2, column: 0 },
					{ '_buttonFillOver': '#ff8888' },
					$(go.TextBlock, 'Red',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#ff8888') }
				),
				$('ContextMenuButton',
					{ row: 2, column: 1 },
					{ '_buttonFillOver': '#fca5a5' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#fca5a5') }
				),
				$('ContextMenuButton',
					{ row: 2, column: 2 },
					{ '_buttonFillOver': '#f87171' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#f87171') }
				),
				// TODO: ROW 3 - ORANGE
				$('ContextMenuButton',
					{ row: 3, column: 0 },
					{ '_buttonFillOver': '#fdba74' },
					$(go.TextBlock, 'Orange',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#fdba74') }
				),
				$('ContextMenuButton',
					{ row: 3, column: 1 },
					{ '_buttonFillOver': '#fed7aa' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#fed7aa') }
				),
				$('ContextMenuButton',
					{ row: 3, column: 2 },
					{ '_buttonFillOver': '#fb923c' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#fb923c') }
				),
				// ! ROW 4 - YELLOW
				$('ContextMenuButton',
					{ row: 4, column: 0 },
					{ '_buttonFillOver': '#fde68a' },
					$(go.TextBlock, 'Yellow',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#fde68a') }
				),
				$('ContextMenuButton',
					{ row: 4, column: 1 },
					{ '_buttonFillOver': '#fef9c3' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#fef9c3') }
				),
				$('ContextMenuButton',
					{ row: 4, column: 2 },
					{ '_buttonFillOver': '#fde047' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#fde047') }
				),
				// ! ROW 5 - LIME
				$('ContextMenuButton',
					{ row: 5, column: 0 },
					{ '_buttonFillOver': '#bef264' },
					$(go.TextBlock, 'Lime',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#bef264') }
				),
				$('ContextMenuButton',
					{ row: 5, column: 1 },
					{ '_buttonFillOver': '#d9f99d' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#d9f99d') }
				),
				$('ContextMenuButton',
					{ row: 5, column: 2 },
					{ '_buttonFillOver': '#a3e635' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#a3e635') }
				),
				// ! ROW 6 - GREEN
				$('ContextMenuButton',
					{ row: 6, column: 0 },
					{ '_buttonFillOver': '#8fef8f' },
					$(go.TextBlock, 'Green',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#8fef8f') }
				),
				$('ContextMenuButton',
					{ row: 6, column: 1 },
					{ '_buttonFillOver': '#86efac' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#d9f99d') }
				),
				$('ContextMenuButton',
					{ row: 6, column: 2 },
					{ '_buttonFillOver': '#4ade80' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#4ade80') }
				),
				// ! ROW 7 - CYAN
				$('ContextMenuButton',
					{ row: 7, column: 0 },
					{ '_buttonFillOver': '#67e8f9' },
					$(go.TextBlock, 'Cyan',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#67e8f9') }
				),
				$('ContextMenuButton',
					{ row: 7, column: 1 },
					{ '_buttonFillOver': '#a5f3fc' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#a5f3fc') }
				),
				$('ContextMenuButton',
					{ row: 7, column: 2 },
					{ '_buttonFillOver': '#22d3ee' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#22d3ee') }
				),
				// ! ROW 8 - SKY
				$('ContextMenuButton',
					{ row: 8, column: 0 },
					{ '_buttonFillOver': '#7dd3fc' },
					$(go.TextBlock, 'Sky',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#7dd3fc') }
				),
				$('ContextMenuButton',
					{ row: 8, column: 1 },
					{ '_buttonFillOver': '#bae6fd' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#bae6fd') }
				),
				$('ContextMenuButton',
					{ row: 8, column: 2 },
					{ '_buttonFillOver': '#38bdf8' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#38bdf8') }
				),
				// ! ROW 9 - BLUE
				$('ContextMenuButton',
					{ row: 9, column: 0 },
					{ '_buttonFillOver': '#60a5fa' },
					$(go.TextBlock, 'Blue',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#60a5fa') }
				),
				$('ContextMenuButton',
					{ row: 9, column: 1 },
					{ '_buttonFillOver': '#93c5fd' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#93c5fd') }
				),
				$('ContextMenuButton',
					{ row: 9, column: 2 },
					{ '_buttonFillOver': '#3b82f6' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#3b82f6') }
				),
				// ! ROW 10 - INDIGO
				$('ContextMenuButton',
					{ row: 10, column: 0 },
					{ '_buttonFillOver': '#818cf8' },
					$(go.TextBlock, 'Indigo',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#818cf8') }
				),
				$('ContextMenuButton',
					{ row: 10, column: 1 },
					{ '_buttonFillOver': '#a5b4fc' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#a5b4fc') }
				),
				$('ContextMenuButton',
					{ row: 10, column: 2 },
					{ '_buttonFillOver': '#6366f1' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#6366f1') }
				),
				// ! ROW 11 - VIOLET
				$('ContextMenuButton',
					{ row: 11, column: 0 },
					{ '_buttonFillOver': '#a78bfa' },
					$(go.TextBlock, 'Violet',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#a78bfa') }
				),
				$('ContextMenuButton',
					{ row: 11, column: 1 },
					{ '_buttonFillOver': '#c4b5fd' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#c4b5fd') }
				),
				$('ContextMenuButton',
					{ row: 11, column: 2 },
					{ '_buttonFillOver': '#8b5cf6' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#8b5cf6') }
				),
				// ! ROW 12 - PURPLE
				$('ContextMenuButton',
					{ row: 12, column: 0 },
					{ '_buttonFillOver': '#c084fc' },
					$(go.TextBlock, 'Purple',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#c084fc') }
				),
				$('ContextMenuButton',
					{ row: 12, column: 1 },
					{ '_buttonFillOver': '#d8b4fe' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#d8b4fe') }
				),
				$('ContextMenuButton',
					{ row: 12, column: 2 },
					{ '_buttonFillOver': '#a855f7' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#a855f7') }
				),
				// ! ROW 13 - FUCHSIA
				$('ContextMenuButton',
					{ row: 13, column: 0 },
					{ '_buttonFillOver': '#e879f9' },
					$(go.TextBlock, 'Fuchsia',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#e879f9') }
				),
				$('ContextMenuButton',
					{ row: 13, column: 1 },
					{ '_buttonFillOver': '#f0abfc' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#f0abfc') }
				),
				$('ContextMenuButton',
					{ row: 13, column: 2 },
					{ '_buttonFillOver': '#d946ef' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#d946ef') }
				),
				// ! ROW 14 - PINK
				$('ContextMenuButton',
					{ row: 14, column: 0 },
					{ '_buttonFillOver': '#f472b6' },
					$(go.TextBlock, 'Pink',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#f472b6') }
				),
				$('ContextMenuButton',
					{ row: 14, column: 1 },
					{ '_buttonFillOver': '#f9a8d4' },
					$(go.TextBlock, 'L',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#f9a8d4') }
				),
				$('ContextMenuButton',
					{ row: 14, column: 2 },
					{ '_buttonFillOver': '#ec4899' },
					$(go.TextBlock, 'D',
						{ margin: 4, font: '13pt Gilmer' }
					), { click: (e, obj) => changeColor(obj, '#ec4899') }
				),
			)
		}
	)

	// * ANCHOR TEMPLATE
	const anchorTemplate = $(go.Node, 'Auto',
		{ zOrder: 1 },
		new go.Binding('location', 'location', go.Point.parse).makeTwoWay(go.Point.stringify),
		$(go.Shape, 'Circle',
			{
				strokeWidth: 3,
				stroke: 'black',
				width: 50,
				height: 50,
				fill: '#ffffff',
				portId: '',
				cursor: 'pointer',
				fromLinkable: true, fromLinkableSelfNode: false, fromLinkableDuplicates: false,
				toLinkable: true, toLinkableSelfNode: false, toLinkableDuplicates: false
			},
		),
		$(go.Panel, 'Auto',
			$(go.Shape, 'Circle',
				{
					stroke: null,
					width: 40,
					height: 40,
					fill: 'white'
				}
			)
		)
	)

	// adds the two node templates to the diagram
	const nodeTemplateMap = new go.Map<string, go.Part>()
	nodeTemplateMap.add('node', nodeTemplate)
	nodeTemplateMap.add('anchor', anchorTemplate)
	diagram.nodeTemplateMap = nodeTemplateMap

	// * CONTEXT MENU
	diagram.contextMenu = $(go.Adornment, 'Vertical',
		$('ContextMenuButton',
			$(go.TextBlock, 'Create Anchor',
				{ font: '13pt Gilmer', margin: 4}
			),
			{ click: createAxon }
		)
	)

	type OverlappingSelection = go.Set<go.Part> & Selection

	// Listens for a double click on an object
	diagram.addDiagramListener('ObjectDoubleClicked', (e: go.DiagramEvent) => {
		const selection = <OverlappingSelection>diagram.selection
		const hashId: string = Object.keys(selection.Rb)[0]
		const obj = selection.Rb[hashId].key.ub
		console.log(obj)
	})

	// Updates the key of the newly created node with a valid id
	diagram.addDiagramListener('PartCreated', (e: go.DiagramEvent) => {
		const node = e.diagram.model.nodeDataArray.slice(-1)[0]
		e.diagram.model.set(node, 'key', `[${generateId(6)}]~New Node`)	
	})

	// Updates the key of the newly created link with a valid id and preset color
	diagram.addDiagramListener('LinkDrawn', (e: go.DiagramEvent) => {
		// @ts-ignore
		const link = e.diagram.model.linkDataArray.slice(-1)[0]
		e.diagram.model.set(link, 'key', `axon~[${generateId(10)}]`)
		e.diagram.model.set(link, 'color', '#000000')
	})

	return diagram
}
export default initDiagram