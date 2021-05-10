import React, { ReactElement } from 'react';

interface ListProps {
	icon: ReactElement;
	name: string;
	onClick: () => void;
}

const List = ({ icon, name, onClick }: ListProps) => {
	return (
		<button
			onClick={onClick}
			className="flex items-center w-full gap-4 px-6 py-3 rounded-md shadow-md focus:outline-none focus-within:ring-4 ring-violet-300 bg-violet-50"
		>
			{icon}
			<span className="font-semibold">{name}</span>
		</button>
	);
};

export default List;
