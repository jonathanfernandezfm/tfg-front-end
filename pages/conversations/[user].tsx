import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ArrowLeft, PaperPlaneTilt } from 'phosphor-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SEND_MESSAGE } from '../../graphql/mutations';
import { GET_CONVERSATION_MESSAGES, GET_USER } from '../../graphql/queries';
import { sendNewMessage, setConversation } from '../../store/reducers/messagesReducer';
import { selectUser } from '../../store/reducers/usersReducer';

const ConversationUser = () => {
	const router = useRouter();
	const { user } = router.query;
	const dispatch = useDispatch();

	const [getUser, { loading }] = useLazyQuery(GET_USER, {
		onCompleted: (data) => {
			if (!data.getUser) router.replace('/home');
			dispatch(selectUser(data.getUser));
		},
		onError: (errors) => {
			console.error('errors', errors);
			router.replace('/home');
		},
	});

	const [getConversations, { loading: loadingMessages }] = useLazyQuery(GET_CONVERSATION_MESSAGES, {
		onCompleted: (data) => {
			if (!data.conversation) return;
			dispatch(setConversation({ messages: data.conversation.messages, user: user }));
		},
	});

	const [sendMessage] = useMutation(SEND_MESSAGE, {
		onCompleted: (data) => {
			dispatch(sendNewMessage(data.sendMessage));
			window.scroll({
				top: document.body.scrollHeight,
				behavior: 'smooth',
			});
		},
	});

	const userSelected = useSelector((state: State) => state.users.selected_user);
	const messages = useSelector((state: State) => {
		const conversations = state.messages.conversations;
		if (conversations) return conversations[user.toString()];
		else return undefined;
	});
	const me = useSelector((state: State) => state.user);

	useEffect(() => {
		if (user) {
			if (!userSelected) {
				getUser({ variables: { id: user } });
			}

			getConversations({ variables: { user: user } });
			window.scroll({
				top: document.body.scrollHeight,
			});
		}
	}, [userSelected]);

	const onBack = () => {
		router.back();
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const message = event.target.message.value;
		if (!message || message === '') return;
		sendMessage({ variables: { user: user, message: message } });

		event.target.message.value = '';
	};

	return (
		<div className="mb-20 ">
			<motion.img
				layoutId="background"
				src="/background.svg"
				alt="background"
				className="fixed top-0 items-center object-cover w-full -z-1 opacity-95"
			/>
			<motion.div className="sticky top-0 z-20 flex items-center w-full gap-4 px-8 py-3 text-3xl font-bold text-black transition-all bg-transparent bg-white shadow-lg">
				<button className="focus:outline-none" onClick={onBack}>
					<ArrowLeft size={28} />
				</button>
				{!loading ? (
					<h1 className="text-xl font-semibold">{userSelected?.userInfo.username}</h1>
				) : (
					<div className="w-full h-10 rounded-md animate-pulse bg-violet-300"></div>
				)}
			</motion.div>

			{!loadingMessages ? (
				<ul className="flex flex-col gap-2 px-8 pb-4 mt-8 mb-40 overflow-scroll overflow-x-hidden">
					{messages?.map((m: any) => (
						<motion.li
							exit={{ x: 0 }}
							initial={m.from.id === me?.id ? { x: 50 } : { x: -50 }}
							animate={{ x: 0 }}
							transition={{
								type: 'spring',
								damping: 12,
								mass: 0.75,
								stiffness: 200,
							}}
							className={`${
								m.from.id === me?.id
									? 'self-end message-bubble-sent bg-indigo-600 text-white rounded-t-lg rounded-bl-lg'
									: 'self-start message-bubble-received bg-indigo-100 rounded-t-lg rounded-br-lg'
							} p-2 bg-indigo-100 shadow-md mt-1`}
							key={m.id}
						>
							{m.message}
						</motion.li>
					))}
				</ul>
			) : (
				<div className="flex flex-col gap-2 px-8 mt-10">
					<div className="w-full h-10 rounded-md animate-pulse bg-violet-300"></div>
					<div className="w-full h-10 rounded-md animate-pulse bg-violet-300"></div>
					<div className="w-full h-10 rounded-md animate-pulse bg-violet-300"></div>
					<div className="w-full h-10 rounded-md animate-pulse bg-violet-300"></div>
					<div className="w-full h-10 rounded-md animate-pulse bg-violet-300"></div>
					<div className="w-full h-10 rounded-md animate-pulse bg-violet-300"></div>
					<div className="w-full h-10 rounded-md animate-pulse bg-violet-300"></div>
					<div className="w-full h-10 rounded-md animate-pulse bg-violet-300"></div>
				</div>
			)}

			<div>
				<form onSubmit={handleSubmit}>
					<div className="fixed left-0 w-full p-4 pb-8 bg-white bottom-12">
						<div className="flex items-center text-lg rounded-md shadow-md focus-within:ring-4 ring-violet-400 ring-2 ">
							<input
								autoComplete="off"
								placeholder="Write here..."
								name="message"
								className="w-full p-4 text-black rounded-md focus:outline-none"
							/>
							<button type="submit" className="mx-4 focus:outline-none">
								<PaperPlaneTilt size={28} className="text-indigo-800" />
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ConversationUser;
