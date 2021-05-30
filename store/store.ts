import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import listsReducer from './reducers/listsReducer';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationsReducer';
import seriesReducer from './reducers/seriesReducer';

const reducer = combineReducers({
	lists: listsReducer,
	user: userReducer,
	notification: notificationReducer,
	series: seriesReducer,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
