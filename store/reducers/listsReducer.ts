import { Dispatch } from 'redux';

const SET_LISTS = 'SET_LISTS';
const ADD_LIST = 'ADD_LIST';
const SET_SELECTED_LIST = 'SET_SELECTED_LIST';
const REMOVE_SELECTED_LIST = 'REMOVE_SELECTED_LIST';
const EDIT_LIST = 'EDIT_LIST';

type ListsAction = {
	type: string;
	lists: List[];
};

const reducer = (state: any = [], action: ListsAction): List[] => {
	switch (action.type) {
		case SET_LISTS:
			return { ...state, lists: action.lists };
		case ADD_LIST:
			return { ...state, lists: [...state.lists, ...action.lists] };
		case SET_SELECTED_LIST:
			return { ...state, selected_list: action.lists[0] };
		case REMOVE_SELECTED_LIST:
			return { ...state, selected_list: null };
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

export const selectList = (list: List) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SET_SELECTED_LIST,
			lists: [list],
		});
	};
};

export const removeSelectedList = () => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: REMOVE_SELECTED_LIST,
		});
	};
};

export default reducer;
