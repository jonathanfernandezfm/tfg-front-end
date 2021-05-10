import { Armchair, Plus } from 'phosphor-react';
import React from 'react';
import List from '../components/List';
import NewList from '../components/NewList';

const ListsPlaceholder = [
	{
		icon: <Armchair size={26} className="text-violet-500" />,
		name: 'List 1',
		id: 95557,
	},
	{
		icon: <Armchair size={26} className="text-violet-500" />,
		name: 'List 1',
		id: 95557,
	},
	{
		icon: <Armchair size={26} className="text-violet-500" />,
		name: 'List 1',
		id: 95557,
	},
	{
		icon: <Armchair size={26} className="text-violet-500" />,
		name: 'List 1',
		id: 95557,
	},
];

const Lists = () => {
	return (
		<>
			<img
				src="background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full h-3/4 -z-1 opacity-95"
			/>
			<div className="px-8 mt-16 mb-24 ">
				<h1 className="text-4xl font-bold">Lists</h1>
				<div className="flex flex-col gap-4 mt-8">
					{ListsPlaceholder.map((list) => (
						<List onClick={() => {}} icon={list.icon} name={list.name} key={list.name} />
					))}
				</div>
				<div className="mt-4">
					<NewList icon={<Plus size={26} className="text-white" />} name="Add new list" />
				</div>
			</div>
		</>
	);
};

export default Lists;
