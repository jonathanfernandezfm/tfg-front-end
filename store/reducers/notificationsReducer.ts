import { Dispatch } from 'redux';

const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
let timeout: NodeJS.Timeout;

type NotificationAction = {
	type: string;
	notification: Notification;
};

interface Notification {
	text: string;
	type: 'success' | 'error' | 'info';
}

const reducer = (state: Notification = null, action: NotificationAction): Notification => {
	switch (action.type) {
		case SHOW_NOTIFICATION:
			return action.notification;
		case HIDE_NOTIFICATION:
			return null;
		default:
			return state;
	}
};

export const showNotification = (notification: Notification) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SHOW_NOTIFICATION,
			notification: notification,
		});

		clearTimeout(timeout);
		timeout = setTimeout(() => {
			dispatch({
				type: HIDE_NOTIFICATION,
			});
		}, 3000);
	};
};

export const hideNotification = () => {
	return async (dispatch: Dispatch) => {
		clearTimeout(timeout);

		dispatch({
			type: HIDE_NOTIFICATION,
		});
	};
};

export default reducer;
