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

interface Notification {
	text: string;
	type: 'success' | 'error' | 'info';
}

type State = {
	lists: List[];
	user: User;
	notification: Notification;
	series: any;
};
