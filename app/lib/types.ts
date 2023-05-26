export interface Node {
	key: string,
	location: string,
	label: string,
	color: string,
	category: string
}

export interface Axon {
	key: string,
	from: string,
	to: string
}