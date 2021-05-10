import React from 'react';

const imageUrl = 'https://image.tmdb.org/t/p/w500/';

interface CardPlatformProps {
	platform: any;
}

const CardPlatform = ({ platform }: CardPlatformProps) => {
	return (
		<div
			className="relative flex-shrink-0 p-4 bg-center bg-no-repeat bg-contain rounded-md bg-violet-200 h-28 w-28 min-w-max"
			style={{ backgroundImage: `url(${imageUrl}${platform.logo_path})`, backgroundOrigin: 'content-box' }}
		></div>
	);
};

export default CardPlatform;
