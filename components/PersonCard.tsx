import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

interface PersonCardProps {
	person: any;
}

const PersonCard = ({ person }: PersonCardProps) => {
	return (
		<Link href={`/persons/${person.id}`}>
			<motion.div
				whileTap={{ scale: 0.95 }}
				className="relative flex-shrink-0 h-40 bg-gray-300 bg-center bg-no-repeat bg-cover rounded-md shadow-md w-28 min-w-max"
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
		</Link>
	);
};

export default PersonCard;
