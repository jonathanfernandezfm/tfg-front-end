import React from 'react';

const imageUrl = 'https://image.tmdb.org/t/p/w200/';

interface CompanieCardProps {
	companie: any;
}

const CompanieCard = ({ companie }: CompanieCardProps) => {
	return (
		<div
			className="relative flex-shrink-0 p-4 bg-center bg-no-repeat bg-contain rounded-md bg-violet-200 h-28 w-28 min-w-max"
			style={{ backgroundImage: `url(${imageUrl}${companie.logo_path})`, backgroundOrigin: 'content-box' }}
		></div>
	);
};

export default CompanieCard;
