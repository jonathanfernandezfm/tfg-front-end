import { Dispatch } from "redux";

const GET_LISTS = "GET_LISTS";
const ADD_LIST = "ADD_LIST";
const EDIT_LIST = "EDIT_LIST";

type ListsAction = {
	type: string
	lists: List[]
}

const reducer = (state: List[] = [], action: ListsAction): List[] => {
	switch (action.type) {
		case GET_LISTS:
			return action.lists;
		case ADD_LIST:
			console.log(state, action.lists)
			return [...state, ...action.lists];
		default:
			return state;
	}
};

export const create = (list: ListInput) => {
	return async (dispatch: Dispatch) => {
		// const newList = await listsService.createNew(content);

		console.log(list);
		dispatch({
			type: ADD_LIST,
			lists: [list],
		});
	};
};

export const getLists = () => {
	return async (dispatch: Dispatch) => {
		const lists = [
			{
				icon: 1,
				name: 'List 1',
				id: 95557,
			},
			{
				icon: 2,
				name: 'List 1',
				id: 95558,
			},
		];

		dispatch({
			type: GET_LISTS,
			lists: lists,
		});
	};
};

export default reducer;
