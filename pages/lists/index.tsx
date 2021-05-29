import { useQuery } from '@apollo/client';
import { AnimateSharedLayout } from 'framer-motion';
import {
	Alarm,
	Armchair,
	Bell,
	BookBookmark,
	Bookmarks,
	CalendarBlank,
	CircleWavyCheck,
	Eye,
	Plus,
} from 'phosphor-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '../../components/List';
import ListPlaceholder from '../../components/ListPlaceholder';
import NewList from '../../components/NewList';
import { ALL_LISTS } from '../../graphql/queries';
import { setLists } from '../../store/reducers/listsReducer';

export const icons = [
	{ id: '1', value: <Armchair size={26} className="text-violet-500" /> },
	{ id: '2', value: <Eye size={26} className="text-violet-500" /> },
	{ id: '3', value: <Alarm size={26} className="text-violet-500" /> },
	{ id: '4', value: <Bell size={26} className="text-violet-500" /> },
	{ id: '5', value: <BookBookmark size={26} className="text-violet-500" /> },
	{ id: '6', value: <Bookmarks size={26} className="text-violet-500" /> },
	{ id: '7', value: <CalendarBlank size={26} className="text-violet-500" /> },
	{ id: '8', value: <CircleWavyCheck size={26} className="text-violet-500" /> },
];

const Lists = () => {
	const user = useSelector((state: State) => state.user);
	const dispatch = useDispatch();
	const result = useQuery(ALL_LISTS);

	const lists: List[] = useSelector((state: State) => {
		return state.lists;
	});

	useEffect(() => {
		if (result.data) {
			console.log(result.data);
			dispatch(setLists(result.data.lists));
		}
	}, [result]);

	console.log('LISTS -> ', user);
	return (
		<>
			<img
				src="/background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full h-3/4 -z-1 opacity-95"
			/>
			<div className="px-8 mt-16 mb-24 ">
				<h1 className="text-4xl font-bold ">Lists</h1>
				{user ? (
					<>
						<div className="flex flex-col gap-4 mt-8">
							{lists.map((list) => {
								const icon = icons.find((i) => i.id === list.icon);
								return (
									<List id={list.id} icon={icon ? icon.value : null} name={list.name} key={list.id} />
								);
							})}
						</div>
						<div className="mt-4">
							<AnimateSharedLayout>
								<NewList icon={<Plus size={26} className="text-white" />} name="Add new list" />
							</AnimateSharedLayout>
						</div>
					</>
				) : (
					<>
						<div className="flex flex-col gap-4 mt-8">
							<ListPlaceholder />
							<ListPlaceholder />
							<ListPlaceholder />
						</div>
						<div className="mt-10">
							<h1 className="text-4xl font-bold text-center">This is just for members</h1>
							<h2 className="mt-3 text-2xl text-center">join us</h2>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Lists;
