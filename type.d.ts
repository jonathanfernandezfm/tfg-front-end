interface List {
	id: number;
	icon: string;
	name: string;
	description: string;
	locked: boolean;
	public: boolean;
	series: any;
	user: any;
}

interface ListState {
	lists: [];
	list_seen: List;
	list_liked: List;
}

interface ListInput {
	icon: string;
	name: string;
	description: string;
}

interface Notification {
	text: string;
	type: 'success' | 'error' | 'info';
}

type State = {
	lists: any;
	user: User;
	notification: Notification;
	series: any;
	search: any;
	users: any;
};
