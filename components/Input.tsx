import React, { ReactNode } from 'react';

interface InputProps {
	icon: ReactNode;
	placeholder: string;
	type: string;
	name?: string;
	className?: string;
	error?: boolean;
}

const Input = ({ icon, placeholder, type, name, className, error }: InputProps) => {
	return (
		<div
			className={`flex px-4 py-3 text-indigo-800 align-middle bg-white border-2 ${
				error ? 'border-red-500' : 'border-indigo-800'
			} rounded-md focus-within:ring-4 ring-violet-300 ${className}`}
		>
			<div>{icon}</div>
			<input
				name={name}
				className="w-full ml-3 font-regular focus:outline-none"
				placeholder={placeholder}
				type={type}
			/>
		</div>
	);
};

export default Input;
