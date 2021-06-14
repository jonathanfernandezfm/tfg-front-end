import { motion } from 'framer-motion';
import React from 'react';

interface CompanieCardProps {
	companie: any;
}

const CompanieCard = ({ companie }: CompanieCardProps) => {
	return (
		<motion.div
			whileTap={{ scale: 0.95 }}
			whileHover={{ scale: 1.02 }}
			className="relative flex-shrink-0 p-4 bg-center bg-no-repeat bg-contain rounded-md bg-violet-200 h-28 w-28 min-w-max xl:w-36 xl:h-28 cursor-pointer"
			style={{
				backgroundImage: `${
					companie.logo_path
						? `url(${process.env.IMAGES_URL_500}${companie.logo_path})`
						: 'linear-gradient(#333b4a, #4d3d65)'
				}`,
				backgroundOrigin: 'content-box',
			}}
		></motion.div>
	);
};

export default CompanieCard;
