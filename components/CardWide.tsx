import Link from 'next/link';
import { Star } from 'phosphor-react';
import React from 'react';

const imageUrl = 'https://image.tmdb.org/t/p/w500';

interface CardProps {
	serie: any;
}

export const CardWide = ({ serie }: CardProps) => {
	return (
		<Link href={`/series/${serie.id}`}>
			<div
				className="relative flex-shrink-0 w-full h-24 bg-gray-300 bg-center bg-no-repeat bg-cover rounded-md min-w-max"
				style={{
					backgroundImage: `${
						serie.backdrop_path
							? `url(${imageUrl}${serie.backdrop_path})`
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
		</Link>
	);
};
