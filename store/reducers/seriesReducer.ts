import { Dispatch } from 'redux';

const SET_SERIES_DISCOVER = 'SET_SERIES_DISCOVER';
const SET_SERIES_POPULAR = 'SET_SERIES_POPULAR';
const SET_SERIES_TOP = 'SET_SERIES_TOP';
const SET_SERIES_SEARCH = 'SET_SERIES_SEARCH';
const SELECT_SERIE = 'SELECT_SERIE';
const SET_SERIE_CAST = 'SET_SERIE_CAST';
const SET_SERIE_RECOMENDATIONS = 'SET_SERIE_RECOMENDATIONS';

type SeriesAction = {
	type: string;
	series?: any[];
	serie?: any;
	cast?: any[];
	recomendations?: any[];
};

const reducer = (state: any = [], action: SeriesAction): any => {
	switch (action.type) {
		case SET_SERIES_DISCOVER:
			return { ...state, series_discover: action.series };
		case SET_SERIES_POPULAR:
			return { ...state, series_popular: action.series };
		case SET_SERIES_TOP:
			return { ...state, series_top_rated: action.series };
		case SET_SERIES_SEARCH:
			return { ...state, series_search: action.series };
		case SELECT_SERIE:
			return { ...state, serie_selected: action.serie };
		case SET_SERIE_CAST:
			return { ...state, serie_selected_cast: action.cast };
		case SET_SERIE_RECOMENDATIONS:
			return { ...state, serie_selected_recomendations: action.recomendations };
		default:
			return state;
	}
};

export const setDiscoverSeries = (series: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SET_SERIES_DISCOVER,
			series: series,
		});
	};
};

export const setPopularSeries = (series: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SET_SERIES_POPULAR,
			series: series,
		});
	};
};

export const setTopRatedSeries = (series: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SET_SERIES_TOP,
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

export const selectSerie = (serie: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SELECT_SERIE,
			serie: serie,
		});
	};
};

export const setSerieCast = (cast: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SET_SERIE_CAST,
			cast: cast,
		});
	};
};

export const setSerieRecomendations = (recomendations: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SET_SERIE_RECOMENDATIONS,
			recomendations: recomendations,
		});
	};
};

export default reducer;