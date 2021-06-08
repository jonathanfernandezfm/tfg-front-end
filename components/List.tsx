import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { removeSelectedList } from '../store/reducers/listsReducer';

interface ListProps {
	icon: ReactElement | null;
	name: string;
	id: number;
}

const List = ({ icon, name, id }: ListProps) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch(removeSelectedList());
		if (id) router.push(`lists/${id}`);
	};

	return (
		<motion.button
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.95 }}
			onClick={onClick}
			className="flex items-center w-full gap-4 px-6 py-3 rounded-md shadow-md focus:outline-none focus-within:ring-4 ring-violet-300 bg-violet-50"
		>
			{icon}
			<span className="font-semibold">{name}</span>
		</motion.button>
	);
};

export default List;
