import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Star } from 'phosphor-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectSerie } from '../store/reducers/seriesReducer';

interface CardProps {
	className?: string;
	serie: any;
}

const Card = ({ className, serie }: CardProps) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(selectSerie(serie));
		router.push(`/series/${serie.id}`);
	};

	return (
		<motion.div
			whileTap={{ scale: 0.95 }}
			whileHover={{ scale: 1.02 }}
			onClick={handleClick}
			className={`relative cursor-pointer flex-shrink-0 h-40 bg-violet-300 bg-center bg-no-repeat bg-cover rounded-md shadow-md xl:shadow-lg w-28 overflow-hidden min-w-max xl:w-80 xl:h-48 ${className}`}
			style={{
				backgroundImage: `${serie.backdrop_path ? '' : 'linear-gradient(#333b4a, #4d3d65)'}`,
				minWidth: '7rem',
			}}
		>
			{serie.backdrop_path && (
				<img
					src={`${process.env.IMAGES_URL_500}${serie.backdrop_path}`}
					className="absolute object-cover w-full h-full"
				/>
			)}
			<div className="absolute flex items-center justify-start gap-1 text-white xl:m-3 left-1">
				<Star size={16} color="yellow" weight="fill" />
				<span className="xl:text-xl">{serie.vote_average.toFixed(1)}</span>
			</div>
			<div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent rounded-b-md"></div>
			<span className="absolute bottom-0 m-2 text-left text-white xl:text-2xl xl:m-4 xl:font-semibold">
				{serie.name}
			</span>
		</motion.div>
	);
};

export default Card;
