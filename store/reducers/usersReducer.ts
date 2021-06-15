import { Dispatch } from 'redux';

const SELECT_USER = 'SELECT_USER';

type UserAction = {
	type: string;
	users?: any;
	user?: any;
};

const reducer = (state: any = [], action: UserAction): any => {
	switch (action.type) {
		case SELECT_USER:
			return { ...state, selected_user: action.user };
		default:
			return state;
	}
};

export const selectUser = (user: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SELECT_USER,
			user: user,
		});
	};
};

export default reducer;
