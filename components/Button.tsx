import React from 'react';

interface ButtonProps {
	width?: string;
	heigth?: string;
	className?: string;
	text: string;
	type: 'button' | 'submit' | 'reset' | undefined;
	onClick?: () => void;
}

const Button = ({ width, heigth, className, text, type, onClick }: ButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`px-20 py-3 rounded-md bg-gradient-to-r from-violet-400 to-indigo-800 focus:ring-4 ring-violet-300 focus:outline-none ${className}`}
		>
			<span className="font-bold text-white">{text}</span>
		</button>
	);
};

export default Button;
