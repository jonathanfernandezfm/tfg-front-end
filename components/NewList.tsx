import React, { ReactElement, useState } from 'react';
import { Alarm, Armchair, Bell, BookBookmark, Bookmarks, CalendarBlank, CircleWavyCheck, Eye } from 'phosphor-react';
import { ListBox } from './ListBox';

interface NewListProps {
	icon: ReactElement;
	name: string;
}

const icons = [
	{ id: 1, value: <Armchair size={26} className="text-violet-500" /> },
	{ id: 2, value: <Eye size={26} className="text-violet-500" /> },
	{ id: 3, value: <Alarm size={26} className="text-violet-500" /> },
	{ id: 4, value: <Bell size={26} className="text-violet-500" /> },
	{ id: 5, value: <BookBookmark size={26} className="text-violet-500" /> },
	{ id: 6, value: <Bookmarks size={26} className="text-violet-500" /> },
	{ id: 7, value: <CalendarBlank size={26} className="text-violet-500" /> },
	{ id: 8, value: <CircleWavyCheck size={26} className="text-violet-500" /> },
];

const NewList = ({ icon, name }: NewListProps) => {
	const [newListForm, setNewListForm] = useState(false);

	return (
		<div>
			{!newListForm && (
				<button
					onClick={() => {
						setNewListForm(true);
					}}
					className="flex items-center w-full gap-4 px-6 py-3 text-white bg-indigo-800 rounded-md shadow-md focus:outline-none focus-within:ring-4 ring-violet-300"
				>
					{icon}
					<span className="font-semibold">{name}</span>
				</button>
			)}
			{newListForm && (
				<div className="items-center w-full gap-4 px-6 py-3 text-white rounded-md shadow-md bg-violet-200">
					<div className="flex gap-2">
						<ListBox items={icons} />

						<input
							placeholder="Name"
							className="w-full p-2 text-black rounded-md focus:outline-none focus-within:ring-4 ring-violet-300"
						/>
					</div>
					<input
						placeholder="Description (Optional)"
						className="w-full p-2 mt-2 text-black rounded-md focus:outline-none focus-within:ring-4 ring-violet-300"
					/>
					<div className="w-full gap-2 mt-2 text-right">
						<button
							onClick={() => {
								setNewListForm(false);
							}}
							className="items-end px-4 py-2 font-semibold text-indigo-900 rounded-md bg-indigo-50 focus:ring-4 focus:ring-violet-500 focus:outline-none"
						>
							Cancel
						</button>
						<button className="items-end px-4 py-2 ml-2 text-white bg-indigo-700 rounded-md focus:ring-4 focus:ring-violet-500 focus:outline-none">
							Save
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default NewList;
