import { motion } from 'framer-motion';
import React from 'react';
import Title from '../../components/Title';

const ConversationUser = () => {
	return (
		<>
			<motion.img
				layoutId="background"
				src="/background.svg"
				alt="background"
				className="absolute top-0 items-center object-cover w-full h-1/2 -z-1 opacity-95"
			/>
			<Title text={'Messages'} className="xl:hidden" />
		</>
	);
};

export default ConversationUser;
