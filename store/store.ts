import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import listsReducer from './reducers/listsReducer';

const reducer = combineReducers({
	lists: listsReducer,
});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
