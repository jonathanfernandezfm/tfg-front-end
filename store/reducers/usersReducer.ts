import { Dispatch } from 'redux';

const SELECT_USER = 'SELECT_USER';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_FOLLOWERS = 'SET_FOLLOWERS';
const SET_FOLLOWS = 'SET_FOLLOWS';

type UserAction = {
	type: string;
	users?: any;
	user?: any;
	followers?: any;
	follows?: any;
	follow?: any;
};

const reducer = (state: any = [], action: UserAction): any => {
	switch (action.type) {
		case SELECT_USER:
			return { ...state, selected_user: action.user };
		case FOLLOW:
			return {
				...state,
				selected_user: {
					...state.selected_user,
					followersCount: state.selected_user.followersCount + 1,
					isFollowed: true,
				},
				followers: state.followers ? [...state.followers, action.follow] : [],
			};
		case UNFOLLOW:
			return {
				...state,
				selected_user: {
					...state.selected_user,
					followersCount: state.selected_user.followersCount - 1,
					isFollowed: false,
				},
				followers: state.followers ? state.followers.filter((f: any) => f.id != action.follow.id) : [],
			};
		case SET_FOLLOWERS:
			return { ...state, followers: action.followers };
		case SET_FOLLOWS:
			return { ...state, follows: action.follows };
		default:
			return state;
	}
};

export const selectUser = (user: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SELECT_USER,
			user: user,
		});
	};
};

export const follow = (followedUser: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: FOLLOW,
			follow: followedUser,
		});
	};
};

export const unfollow = (unfollowedUser: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: UNFOLLOW,
			follow: unfollowedUser,
		});
	};
};

export const setFollowers = (followers: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SET_FOLLOWERS,
			followers: followers,
		});
	};
};

export const setFollows = (follows: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SET_FOLLOWS,
			follows: follows,
		});
	};
};

export default reducer;
