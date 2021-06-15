import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Star } from 'phosphor-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearSeach, setSeriesSearch, setUsersSearch } from '../store/reducers/searchReducer';
import { selectSerie } from '../store/reducers/seriesReducer';

interface CardProps {
	serie: any;
}

export const CardWide = ({ serie }: CardProps) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const handleClick = () => {
		router.push(`/series/${serie.id}`);
		dispatch(selectSerie(serie));
		dispatch(clearSeach());
		document.body.style.overflow = 'unset';
	};

	return (
		<motion.a whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} onClick={handleClick}>
			<div
				className="relative flex-shrink-0 w-full h-32 bg-gray-300 bg-center bg-no-repeat bg-cover rounded-md min-w-max"
				style={{
					backgroundImage: `${
						serie.backdrop_path
							? `url(${process.env.IMAGES_URL_500}${serie.backdrop_path})`
							: 'linear-gradient(#333b4a, #4d3d65)'
					}`,
				}}
			>
				<div className="absolute flex items-center justify-start gap-1 text-white left-1">
					<Star size={16} color="yellow" weight="fill" />
					<span>{serie.vote_average}</span>
				</div>
				<div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent rounded-b-md"></div>
				<span className="absolute bottom-0 m-2 text-left text-white">{serie.name}</span>
			</div>
		</motion.a>
	);
};
