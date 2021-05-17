import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

interface ListProps {
	icon: ReactElement | null;
	name: string;
	id: number;
}

const List = ({ icon, name, id }: ListProps) => {
	const router = useRouter();

	const onClick = () => {
		if (id) router.push(`lists/${id}`);
	};

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
