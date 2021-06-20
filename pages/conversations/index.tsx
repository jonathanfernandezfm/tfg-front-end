import { useLazyQuery, useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardUser from '../../components/CardUser';
import Title from '../../components/Title';
import { GET_CONVERSATIONS } from '../../graphql/queries';
import { setConversations } from '../../store/reducers/messagesReducer';

const Conversations = () => {
	const dispatch = useDispatch();

	const [getConversations, { loading: loadingConversations }] = useLazyQuery(GET_CONVERSATIONS, {
		onCompleted: (data) => {
			if (!data.conversations) return;
			dispatch(setConversations({ conversations: data.conversations, me: me.id }));
		},
	});

	const me = useSelector((state: State) => state.user);
	const conversations = useSelector((state: State) => state.messages.openConversations);

	useEffect(() => {
		if (me) getConversations();
	}, [me]);

	return (
		<div className="mb-20 mt-14">
			<motion.img
				layoutId="background"
				src="/background.svg"
				alt="background"
				className="absolute top-0 items-center object-cover w-full h-1/2 -z-1 opacity-95"
			/>

			<Title text={'Messages'} className="xl:hidden" />
			{!loadingConversations ? (
				<div className="px-8 mt-6">
					{conversations?.map((conv: any, index: any) => (
						<CardUser key={index} user={conv.user} type={'chat'} href="/conversations" />
					))}
				</div>
			) : (
				<div className="flex flex-col gap-2 px-8 mt-10">
					<div className="w-full h-12 rounded-md animate-pulse bg-violet-300"></div>
					<div className="w-full h-12 rounded-md animate-pulse bg-violet-300"></div>
					<div className="w-full h-12 rounded-md animate-pulse bg-violet-300"></div>
				</div>
			)}
		</div>
	);
};

export default Conversations;
