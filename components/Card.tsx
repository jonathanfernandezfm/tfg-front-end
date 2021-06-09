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
			onClick={handleClick}
			className={`relative flex-shrink-0 h-40 bg-violet-300 bg-center bg-no-repeat bg-cover rounded-md shadow-md w-28 overflow-hidden min-w-max ${className}`}
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
			<div className="absolute flex items-center justify-start gap-1 text-white left-1">
				<Star size={16} color="yellow" weight="fill" />
				<span>{serie.vote_average.toFixed(1)}</span>
			</div>
			<div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent rounded-b-md"></div>
			<span className="absolute bottom-0 m-2 text-left text-white">{serie.name}</span>
		</motion.div>
	);
};

export default Card;
