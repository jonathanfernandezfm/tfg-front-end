import { motion } from 'framer-motion';
import React from 'react';

interface CardPlatformProps {
	platform: any;
}

const CardPlatform = ({ platform }: CardPlatformProps) => {
	return (
		<motion.div
			whileTap={{ scale: 0.95 }}
			whileHover={{ scale: 1.02 }}
			className="relative flex-shrink-0 p-4 bg-center bg-no-repeat bg-contain rounded-md cursor-pointer bg-violet-200 h-28 w-28 min-w-max xl:w-40"
			style={{
				backgroundImage: `${
					platform.logo_path
						? `url(${process.env.IMAGES_URL_500}${platform.logo_path})`
						: 'linear-gradient(#333b4a, #4d3d65)'
				}`,
				backgroundOrigin: 'content-box',
			}}
		/>
	);
};

export default CardPlatform;
