import { Dispatch } from 'redux';

const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';
const REMOVE_USER = 'REMOVE_USER';
const GET_USER = 'GET_USER';

type UserAction = {
	type: string;
	user: User;
};

interface User {
	token?: string;
	username: string;
	name: string;
	surname: string;
	email: string;
	birthDate: string;
	gender: string;
	public: boolean;
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
		case UPDATE_USER:
			return {
				...state,
				name: action.user.name,
				surname: action.user.surname,
				gender: action.user.gender,
				birthDate: action.user.birthDate,
				city: action.user.city,
				public: action.user.public,
			};
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

export const updateUser = (user: User) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: UPDATE_USER,
			user: user,
		});
	};
};

export default reducer;
