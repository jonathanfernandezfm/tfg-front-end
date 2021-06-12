import { motion } from 'framer-motion';
import React from 'react';

interface ButtonProps {
	width?: string;
	heigth?: string;
	className?: string;
	text: string;
	loading?: boolean;
	type: 'button' | 'submit' | 'reset' | undefined;
	onClick?: () => void;
}

const Button = ({ loading, className, text, type, onClick }: ButtonProps) => {
	return (
		<motion.button
			whileTap={{ scale: 0.95 }}
			type={type}
			onClick={onClick}
			className={`px-20 py-3 text-center rounded-md bg-gradient-to-r from-violet-400 to-indigo-800 focus:ring-4 ring-violet-300 focus:outline-none ${className}`}
		>
			{loading && (
				<svg
					className="w-6 h-6 text-violet-200 animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="3"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			)}
			{!loading && <span className="font-bold text-white">{text}</span>}
		</motion.button>
	);
};

export default Button;
