import { Dispatch } from 'redux';

const SET_LISTS = 'SET_LISTS';
const ADD_LIST = 'ADD_LIST';
const REMOVE_LIST = 'REMOVE_LIST';
const SET_SELECTED_LIST = 'SET_SELECTED_LIST';
const REMOVE_SELECTED_LIST = 'REMOVE_SELECTED_LIST';
const EDIT_LIST = 'EDIT_LIST';

type ListsAction = {
	type: string;
	lists?: List[];
	list: List;
	id?: string;
};

const reducer = (state: any = [], action: ListsAction): List[] => {
	switch (action.type) {
		case SET_LISTS:
			return { ...state, lists: action.lists };
		case ADD_LIST:
			return { ...state, lists: [...state.lists, ...action.lists] };
		case REMOVE_LIST:
			return { ...state, lists: state.lists.filter((l: any) => l.id !== action.id) };
		case SET_SELECTED_LIST:
			return { ...state, selected_list: action.list };
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

export const removeList = (id: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: REMOVE_LIST,
			id: id,
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
			list: list,
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
