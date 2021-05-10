import React from 'react';

interface ButtonProps {
	className?: string;
	text: string;
}

const LinkButton = ({ className, text }: ButtonProps) => {
	return (
		<a
			className={`w-max px-20 py-3 rounded-md bg-gradient-to-r from-violet-400 to-indigo-800 focus:ring-4 ring-violet-300 focus:outline-none ${className}`}
		>
			<span className="font-bold text-white">{text}</span>
		</a>
	);
};

export default LinkButton;
