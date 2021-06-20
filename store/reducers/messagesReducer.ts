import { Dispatch } from 'redux';

const SET_CONVERSATION = 'SET_CONVERSATION';
const SET_CONVERSATIONS = 'SET_CONVERSATIONS';
const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE';
const RECEIVED_NEW_MESSAGE = 'RECEIVED_NEW_MESSAGE';

type MessagesAction = {
	type: string;
	conversation?: any;
	conversations?: any;
	newMessage?: any;
};

const reducer = (state: any = [], action: MessagesAction): any => {
	switch (action.type) {
		case SET_CONVERSATION:
			return {
				...state,
				conversations: {
					...state.conversations,
					[action.conversation.user]: action.conversation.messages,
				},
			};
		case SET_CONVERSATIONS:
			const openConversations = action.conversations.conversations.map((conv: any) => {
				if (conv.user1.id !== action.conversations.me) return { user: conv.user1 };
				else return { user: conv.user2 };
			});

			return { ...state, openConversations: openConversations };
		case SEND_NEW_MESSAGE:
			if (!state.conversations) state.conversations = [];
			let messagesSend = state.conversations[action.newMessage.to.id];
			if (!messagesSend) messagesSend = [];
			return {
				...state,
				conversations: {
					...state.conversations,
					[action.newMessage.to.id]: [...messagesSend, action.newMessage],
				},
			};

		case RECEIVED_NEW_MESSAGE:
			if (!state.conversations) state.conversations = [];
			let messagesReceived = state.conversations[action.newMessage.from.id];
			if (!messagesReceived) messagesReceived = [];
			return {
				...state,
				conversations: {
					...state.conversations,
					[action.newMessage.from.id]: [...messagesReceived, action.newMessage],
				},
			};

		default:
			return state;
	}
};

export const setConversation = (conversation: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SET_CONVERSATION,
			conversation: conversation,
		});
	};
};

export const setConversations = (conversations: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SET_CONVERSATIONS,
			conversations: conversations,
		});
	};
};

export const sendNewMessage = (newMessage: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: SEND_NEW_MESSAGE,
			newMessage: newMessage,
		});
	};
};
export const receivedNewMessage = (newMessage: any) => {
	return async (dispatch: Dispatch) => {
		dispatch({
			type: RECEIVED_NEW_MESSAGE,
			newMessage: newMessage,
		});
	};
};

export default reducer;
