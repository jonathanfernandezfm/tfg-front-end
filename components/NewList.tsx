import React, { ReactElement, useState } from 'react';
import { ListBox } from './ListBox';
import { icons } from '../pages/lists';
import { useDispatch } from 'react-redux';
import { create } from '../store/reducers/listsReducer';

interface NewListProps {
	icon: ReactElement;
	name: string;
}

const NewList = ({ icon, name }: NewListProps) => {
	const [newListForm, setNewListForm] = useState(false);
	const [iconSelected, setIconSelected] = useState(icons[0]);
	const dispatch = useDispatch();

	const handleCreate = (event: any) => {
		event.preventDefault();
		const name = event.target.name.value;
		if (!name || name === '') return;
		const description = event.target.description.value;
		dispatch(create({ icon: iconSelected.id, name: name, description: description }));
		setNewListForm(false);
	};

	return (
		<div
			className={`overflow-visible w-full px-6 py-3 text-white bg-indigo-800 rounded-md shadow-md focus:outline-none focus-within:ring-4 ring-violet-300 ${
				newListForm ? 'ring-4' : ''
			}`}
		>
			<button
				onClick={() => {
					setNewListForm(!newListForm);
				}}
				className="flex items-center w-full gap-4 focus:outline-none"
			>
				{icon}
				<span className="font-semibold">{name}</span>
			</button>
			{newListForm && (
				<form onSubmit={handleCreate}>
					<div className="pt-3 pb-1">
						<div className="flex gap-2">
							<ListBox selected={iconSelected} items={icons} setIconSelected={setIconSelected} />

							<input
								name="name"
								placeholder="Name"
								className="w-full p-2 text-black rounded-md focus:outline-none focus-within:ring-4 ring-violet-300"
							/>
						</div>
						<input
							name="description"
							placeholder="Description (Optional)"
							className="w-full p-2 mt-2 text-black rounded-md focus:outline-none focus-within:ring-4 ring-violet-300"
						/>
						<div className="w-full gap-2 mt-2 text-right">
							<button
								type="button"
								onClick={() => {
									setNewListForm(false);
								}}
								className="items-end px-4 py-2 font-semibold text-indigo-900 rounded-md bg-indigo-50 focus:ring-4 focus:ring-violet-500 focus:outline-none"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="items-end px-4 py-2 ml-2 font-semibold text-black rounded-md bg-violet-400 focus:ring-4 focus:ring-violet-500 focus:outline-none"
							>
								Save
							</button>
						</div>
					</div>
				</form>
			)}
		</div>
	);
};

export default NewList;
