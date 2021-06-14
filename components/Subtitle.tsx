import React from 'react';

interface SubtitleProps {
	text: string;
	className?: string;
}

const Subtitle = ({ text, className }: SubtitleProps) => {
	return <h2 className={`px-8 mt-2 text-2xl font-semibold xl:text-4xl xl:mt-8 xl:px-12 ${className}`}>{text}</h2>;
};

export default Subtitle;
