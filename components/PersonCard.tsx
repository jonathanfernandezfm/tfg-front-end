import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectPerson } from '../store/reducers/personsReducer';

interface PersonCardProps {
	person: any;
}

const PersonCard = ({ person }: PersonCardProps) => {
	const dispatch = useDispatch();
	const router = useRouter();

	const handleClick = () => {
		dispatch(selectPerson(person));
		router.push(`/persons/${person.id}`);
	};

	return (
		<motion.div
			whileTap={{ scale: 0.95 }}
			whileHover={{ scale: 1.02 }}
			onClick={handleClick}
			className="relative flex-shrink-0 h-40 bg-gray-300 bg-center bg-no-repeat bg-cover rounded-md shadow-md cursor-pointer w-28 min-w-max xl:w-36 xl:h-56"
			style={{
				backgroundImage: `${
					person.profile_path
						? `url(${process.env.IMAGES_URL_500}${person.profile_path})`
						: 'linear-gradient(#333b4a, #4d3d65)'
				}`,
			}}
		>
			<div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent rounded-b-md"></div>
			<span className="absolute bottom-0 m-2 text-left text-white">{person.name}</span>
		</motion.div>
	);
};

export default PersonCard;
