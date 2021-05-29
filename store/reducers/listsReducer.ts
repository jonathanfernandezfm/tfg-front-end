import { Dispatch } from 'redux';

const SET_LISTS = 'SET_LISTS';
const ADD_LIST = 'ADD_LIST';
const EDIT_LIST = 'EDIT_LIST';

type ListsAction = {
	type: string;
	lists: List[];
};

const reducer = (state: List[] = [], action: ListsAction): List[] => {
	switch (action.type) {
		case SET_LISTS:
			return action.lists;
		case ADD_LIST:
			return [...state, ...action.lists];
		default:
			return state;
	}
};

export const create = (list: ListInput) => {
	return async (dispatch: Dispatch) => {
		console.log(list);
		dispatch({
			type: ADD_LIST,
			lists: [list],
		});
	};
};

export const setLists = (lists: ListInput[]) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SET_LISTS,
			lists: [...lists],
		});
	};
};

export default reducer;
