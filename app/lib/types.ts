export interface Node {
	key: string,
	location: string,
	label: string,
	color: string,
	category: string,
	data: string
}

export interface Axon {
	key: string,
	from: string,
	to: string,
	label: string,
	color: string
}

export interface Selection {
	Rb: {
		[key: string]: {
			key: {
				ub: {
					key: string,
					label: string,
					location: string,
					color: string,
					category: string
				}
			}
		}
	}
}

export interface Log {
	type: string,
	text?: string,
}