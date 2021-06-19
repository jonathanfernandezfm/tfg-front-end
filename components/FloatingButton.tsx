import React from 'react';
import {
	Alarm,
	Armchair,
	Bell,
	BookBookmark,
	Bookmarks,
	CalendarBlank,
	CheckCircle,
	CircleWavyCheck,
	Eye,
	Heart,
	Plus,
} from 'phosphor-react';

import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { __TypeKind } from 'graphql';

const icons = [
	{ id: '1', value: <Armchair size={22} className="text-violet-500" /> },
	{ id: '2', value: <Eye size={22} className="text-violet-500" /> },
	{ id: '3', value: <Heart size={22} className="text-violet-500" /> },
	{ id: '4', value: <Alarm size={22} className="text-violet-500" /> },
	{ id: '5', value: <Bell size={22} className="text-violet-500" /> },
	{ id: '6', value: <BookBookmark size={22} className="text-violet-500" /> },
	{ id: '7', value: <Bookmarks size={22} className="text-violet-500" /> },
	{ id: '8', value: <CalendarBlank size={22} className="text-violet-500" /> },
	{ id: '9', value: <CircleWavyCheck size={22} className="text-violet-500" /> },
];

interface FloatingButtonProps {
	addSerie: any;
	removeSerie: any;
}

const FloatingButton = ({ addSerie, removeSerie }: FloatingButtonProps) => {
	const lists = useSelector((state: State) => state.lists.lists);
	const selectedSerie = useSelector((state: State) => state.series.serie_selected);

	const addRemoveSerie = (list: List) => {
		if (!lists || !selectedSerie) return;
		if (selectedSerie.lists.map((sl: any) => sl.name).includes(list.name))
			removeSerie({ variables: { id: list.id, series: [selectedSerie.id.toString()] } });
		else addSerie({ variables: { id: list.id, series: [selectedSerie.id.toString()] } });
	};

	if (!lists?.filter((l: List) => l.name !== 'Seen' && l.name !== 'Liked').length) return null;

	return (
		<div className="fixed z-50 w-56 text-right bottom-40 right-8">
			<Menu as="div" className="relative text-left">
				<Menu.Button className="fixed p-3 text-white rounded-full focus:outline-none right-6 bottom-20 bg-violet-400 focus:ring-4 ">
					<Plus size={26} weight="bold" className="text-white" />
				</Menu.Button>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items
						className="absolute z-50 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
						style={{
							marginTop: `-${
								lists?.filter((l: List) => l.name !== 'Seen' && l.name !== 'Liked').length * 46 - 15
							}px`,
						}}
					>
						<ul className="flex flex-col items-start justify-end divide-y divide-gray-100">
							{lists?.map((l: List) =>
								l.name !== 'Seen' && l.name !== 'Liked' ? (
									<li key={l.id} className="w-full">
										<div className="p-1">
											<Menu.Item>
												{({ active }) => (
													<button
														onClick={() => {
															addRemoveSerie(l);
														}}
														className={`${
															active ? 'bg-violet-500 text-white' : 'text-gray-900'
														} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
													>
														<div className="w-5 h-5 mr-2">
															{icons.find((i) => i.id === l.icon).value}
														</div>
														{l.name}
														<div className="m-auto mr-0 ">
															{selectedSerie.lists
																.map((sl: any) => sl.name)
																.includes(l.name) ? (
																<CheckCircle size={22} className="text-violet-500" />
															) : null}
														</div>
													</button>
												)}
											</Menu.Item>
										</div>
									</li>
								) : null
							)}
						</ul>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
};

export default FloatingButton;
