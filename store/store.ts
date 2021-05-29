import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import listsReducer from './reducers/listsReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
	lists: listsReducer,
	user: userReducer
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
