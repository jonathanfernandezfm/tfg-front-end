interface List {
	id: number;
	icon: string;
	name: string;
	description: string;
}

interface ListInput {
	icon: string;
	name: string;
	description: string;
}

type State = {
	lists: List[];
	user: User;
};
