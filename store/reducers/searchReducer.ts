import { Dispatch } from 'redux';

const SET_USERS_SEARCH = 'SET_USERS_SEARCH';
const SET_SERIES_SEARCH = 'SET_SERIES_SEARCH';
const CLEAR_SEARCH = 'CLEAR_SEARCH';

type SearchAction = {
	type: string;
	items?: any[];
};

const reducer = (state: any = [], action: SearchAction): any => {
	switch (action.type) {
		case SET_SERIES_SEARCH:
			return { ...state, series_search: action.items };
		case SET_USERS_SEARCH:
			return { ...state, users_search: action.items };
		case CLEAR_SEARCH:
			return { ...state, series_search: [], users_search: [] };
		default:
			return state;
	}
};

export const setSeriesSearch = (series: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SET_SERIES_SEARCH,
			items: series,
		});
	};
};

export const setUsersSearch = (users: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SET_USERS_SEARCH,
			items: users,
		});
	};
};
export const clearSeach = () => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: CLEAR_SEARCH,
		});
	};
};

export default reducer;
