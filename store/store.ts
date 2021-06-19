import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import listsReducer from './reducers/listsReducer';
import userReducer from './reducers/authReducer';
import notificationReducer from './reducers/notificationsReducer';
import seriesReducer from './reducers/seriesReducer';
import searchReducer from './reducers/searchReducer';
import usersReducer from './reducers/usersReducer';
import personsReducer from './reducers/personsReducer';

const reducer = combineReducers({
	lists: listsReducer,
	user: userReducer,
	notification: notificationReducer,
	series: seriesReducer,
	search: searchReducer,
	users: usersReducer,
	persons: personsReducer,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
