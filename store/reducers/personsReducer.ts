import { Dispatch } from 'redux';

const SELECT_PERSON = 'SELECT_PERSON';
const PERSON_SERIES = 'PERSON_SERIES';

type PersonAction = {
	type: string;
	person?: any;
	series?: any;
};

const reducer = (state: any = [], action: PersonAction): any => {
	switch (action.type) {
		case SELECT_PERSON:
			return { ...state, selected_person: action.person };
		case PERSON_SERIES:
			return { ...state, selected_person_series: action.series };
		default:
			return state;
	}
};

export const selectPerson = (person: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SELECT_PERSON,
			person: person,
		});
	};
};

export const setPersonSeries = (series: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: PERSON_SERIES,
			series: series,
		});
	};
};

export default reducer;
