interface List {
	id: number,
	icon: number,
	name: string,
	description: string,
}

interface ListInput {
	icon: number,
	name: string,
	description: string,
}

type State = {
	lists: List[]
}