import { Dispatch } from 'redux';

const SET_SERIES_DISCOVER = 'SET_SERIES_DISCOVER';
const SET_SERIES_SEARCH = 'SET_SERIES_SEARCH';

type SeriesAction = {
	type: string;
	series: any[];
};

const reducer = (state: any = [], action: SeriesAction): any => {
	switch (action.type) {
		case SET_SERIES_DISCOVER:
			return { ...state, series_discover: action.series };
		case SET_SERIES_SEARCH:
			return { ...state, series_search: action.series };
		default:
			return state;
	}
};

export const setSeries = (series: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SET_SERIES_DISCOVER,
			series: series,
		});
	};
};

export const setSeriesSearch = (series: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SET_SERIES_SEARCH,
			series: series,
		});
	};
};

export default reducer;
