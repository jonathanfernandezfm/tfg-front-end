import { Dispatch } from 'redux';

const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';
const GET_USER = 'GET_USER';

type UserAction = {
	type: string;
	user: User;
};

interface User {
	token: string;
	username: string;
	name: string;
	surname: string;
	email: string;
	birthDate: string;
	gender: string;
	city: string;
}

const reducer = (state: User = null, action: UserAction): User => {
	switch (action.type) {
		case SET_USER:
			return action.user;
		case GET_USER:
			return state;
		case REMOVE_USER:
			return null;
		default:
			return state;
	}
};

export const setUser = (user: User) => {
	return async (dispatch: Dispatch) => {
		localStorage.setItem('user-token', user.token);

		dispatch({
			type: SET_USER,
			user: user,
		});
	};
};

export const removeUser = () => {
	return async (dispatch: Dispatch) => {
		localStorage.removeItem('user-token');

		dispatch({
			type: REMOVE_USER,
		});
	};
};

export default reducer;
