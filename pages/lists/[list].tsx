import { useMutation, useQuery } from '@apollo/client';
import { Dialog, Switch } from '@headlessui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, PencilSimple, TrashSimple } from 'phosphor-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { icons } from '.';
import Card from '../../components/Card';
import { ListBox } from '../../components/ListBox';
import Modal from '../../components/Modal';
import { REMOVE_LIST, UPDATE_LIST } from '../../graphql/mutations';
import { ALL_LISTS, GET_LIST } from '../../graphql/queries';
import { removeList, selectList } from '../../store/reducers/listsReducer';
import { showNotification } from '../../store/reducers/notificationsReducer';

const List = () => {
	const [isSticky, setSticky] = useState(false);
	const [modalEditOpen, setModalEditOpen] = useState(false);
	const [modalRemoveOpen, setModalRemoveOpen] = useState(false);
	const [iconSelected, setIconSelected] = useState(undefined);
	const [enabled, setEnabled] = useState(false);
	const ref = useRef(null);
	const router = useRouter();
	const { list } = router.query;
	const dispatch = useDispatch();

	const [updateList, resultUpdated] = useMutation(UPDATE_LIST, {
		onCompleted: (data) => {
			dispatch(selectList(data.updateList));
			dispatch(showNotification({ text: 'Updated', type: 'success' }));
			setModalEditOpen(false);
		},
		onError: (error) => {},
	});

	const [deleteList, resultDeleted] = useMutation(REMOVE_LIST, {
		refetchQueries: [{ query: ALL_LISTS }],
		onCompleted: (data) => {
			dispatch(removeList(list));
			router.replace('/lists');
		},
		onError: (error) => {},
	});

	const { data, loading } = useQuery(GET_LIST, {
		variables: { id: list },
		onCompleted: (data) => {
			dispatch(selectList(data.lists[0]));
			if (!iconSelected) setIconSelected(icons.find((i) => i.id === data.lists[0].icon));
		},
		onError: (errors) => {
			console.error('errors', errors);
			router.replace('/lists');
		},
	});

	const listSelected: List = useSelector((state: State) => state.lists.selected_list);
	const user = useSelector((state: State) => state.user);

	const handleScroll = () => {
		if (ref.current) {
			setSticky(ref.current.getBoundingClientRect().top <= 0);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		if (listSelected) setEnabled(listSelected.public);

		return () => {
			window.removeEventListener('scroll', () => handleScroll);
		};
	}, [listSelected]);

	const onBack = () => {
		router.back();
	};

	const handleEdit = (event: any) => {
		event.preventDefault();
		const name = event.target.name.value;
		if (!name || name === '') return;
		const description = event.target.description.value;
		updateList({ variables: { id: listSelected.id, name, description, icon: iconSelected.id, public: enabled } });
	};

	const handleDelete = (event: any) => {
		deleteList({ variables: { id: listSelected.id } });
	};

	return (
		<>
			<motion.img
				layoutId="background"
				src="/background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full h-3/4 -z-1 opacity-95"
			/>

			<div className="mt-16 mb-24 ">
				<div
					className={`font-bold px-8 sticky top-0 transition-all bg-transparent flex items-center gap-4 ${
						isSticky ? 'bg-white py-4 text-black text-3xl z-20 shadow-lg' : ' text-white text-4xl'
					}`}
					ref={ref}
				>
					<button onClick={onBack} className="focus:outline-none">
						<ArrowLeft size={28} />
					</button>
					{!loading ? (
						<h1 className="font-semibold">{listSelected?.name}</h1>
					) : (
						<div className="w-full h-10 rounded-md animate-pulse bg-violet-300"></div>
					)}
					{!!listSelected && !loading && !listSelected?.locked && listSelected?.user.id === user.id && (
						<>
							<div className="flex gap-2 m-auto mr-0">
								<button
									onClick={() => {
										setModalEditOpen(true);
									}}
									className="focus:outline-none"
								>
									<PencilSimple size={24} />
								</button>
								<button
									onClick={() => {
										setModalRemoveOpen(true);
									}}
									className="focus:outline-none"
								>
									<TrashSimple size={24} className="text-red-500" />
								</button>
							</div>
							<Modal isOpen={modalEditOpen} setIsOpen={setModalEditOpen}>
								<Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
									Edit list
								</Dialog.Title>
								<div className="mt-2">
									<form onSubmit={handleEdit}>
										<div className="pt-3 pb-1">
											<div className="flex gap-2">
												<ListBox
													selected={iconSelected}
													items={icons}
													setIconSelected={setIconSelected}
													className="border-2 border-violet-500"
												/>

												<input
													autoComplete="off"
													name="name"
													placeholder="Name"
													defaultValue={listSelected?.name}
													className="w-full p-2 text-black border-2 rounded-md border-violet-500 focus:outline-none focus-within:ring-4 ring-violet-300"
												/>
											</div>
											<input
												name="description"
												autoComplete="off"
												placeholder="Description (Optional)"
												defaultValue={listSelected?.description}
												className="w-full p-2 mt-2 text-black border-2 rounded-md border-violet-500 focus:outline-none focus-within:ring-4 ring-violet-300"
											/>
											<div className="flex mt-4">
												<div>
													<label className="font-semibold">Public</label>
													<div className="pt-2">
														<Switch
															checked={enabled}
															onChange={setEnabled}
															className={`${enabled ? 'bg-violet-600' : 'bg-violet-400'}
							relative inline-flex flex-shrink-0 h-7 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
														>
															<span className="sr-only">Use setting</span>
															<span
																aria-hidden="true"
																className={`${
																	enabled ? 'translate-x-5' : 'translate-x-0'
																}
							pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
															/>
														</Switch>
													</div>
												</div>
												<div className="flex items-end justify-end w-full gap-2 text-right">
													<button
														type="button"
														onClick={() => {
															setModalEditOpen(false);
														}}
														className="items-end px-4 py-2 font-semibold text-indigo-900 bg-indigo-100 rounded-md focus:ring-4 focus:ring-violet-500 focus:outline-none"
													>
														Cancel
													</button>
													<button
														type="submit"
														className="items-end px-4 py-2 font-semibold text-white rounded-md bg-violet-500 focus:ring-4 focus:ring-violet-500 focus:outline-none"
													>
														Save
													</button>
												</div>
											</div>
										</div>
									</form>
								</div>
							</Modal>
							<Modal isOpen={modalRemoveOpen} setIsOpen={setModalRemoveOpen}>
								<Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
									Remove list
								</Dialog.Title>
								<p className="mt-2">Are you sure you want to delete this list?</p>
								<div className="flex justify-end mt-4">
									<button
										type="button"
										onClick={handleDelete}
										className="items-end px-4 py-2 font-semibold text-white bg-red-500 rounded-md focus:ring-4 focus:ring-red-300 focus:outline-none"
									>
										Remove
									</button>
								</div>
							</Modal>
						</>
					)}
				</div>
				{!loading ? (
					<p className="px-8 mt-2 text-lg font-semibold">{listSelected?.description}</p>
				) : (
					<div className="h-6 mx-8 mt-2 rounded-md animate-pulse bg-violet-300"></div>
				)}
				{!loading ? (
					<>
						{listSelected?.user.id !== user.id ? (
							<p className="px-8 mt-2 text-lg font-semibold">
								Creator: {listSelected?.user.userInfo.username}
							</p>
						) : null}
					</>
				) : (
					<div className="h-6 mx-8 mt-2 rounded-md animate-pulse bg-violet-300"></div>
				)}
				{loading && <div className="mx-8 mt-6 rounded-md h-28 animate-pulse bg-violet-300"></div>}
				{!loading && !!listSelected?.series?.length && (
					<div className="flex flex-wrap gap-4 px-8 mt-6">
						{listSelected.series.map((serie: any) => (
							<Card className="flex-1" key={serie.id} serie={serie} />
						))}
					</div>
				)}
				{!loading && !listSelected?.series?.length && (
					<div className="mt-16">
						<h1 className="text-4xl font-bold text-center">
							There are <br />
							no items here
						</h1>
						<h2 className="flex flex-col mt-3 text-2xl text-center">
							<Link href="/home">
								<span className="font-bold text-indigo-100">check the news</span>
							</Link>{' '}
							or{' '}
							<Link href="/discover">
								<span className="font-bold text-indigo-100">search some</span>
							</Link>
						</h2>
					</div>
				)}
			</div>
		</>
	);
};

export default List;
