import { useMutation, useQuery } from '@apollo/client';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, PencilSimple } from 'phosphor-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { icons } from '.';
import Card from '../../components/Card';
import { ListBox } from '../../components/ListBox';
import Modal from '../../components/Modal';
import { UPDATE_LIST } from '../../graphql/mutations';
import { GET_LIST } from '../../graphql/queries';
import { selectList } from '../../store/reducers/listsReducer';
import { showNotification } from '../../store/reducers/notificationsReducer';

const List = () => {
	const [isSticky, setSticky] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [iconSelected, setIconSelected] = useState(undefined);
	const ref = useRef(null);
	const router = useRouter();
	const { list } = router.query;
	const dispatch = useDispatch();

	const [updateList, resultUpdated] = useMutation(UPDATE_LIST, {
		onCompleted: (data) => {
			dispatch(selectList(data.updateList));
			dispatch(showNotification({ text: 'Updated', type: 'success' }));
			setModalOpen(false);
		},
		onError: (error) => {},
	});

	const { data, loading } = useQuery(GET_LIST, {
		variables: { id: list },
		onCompleted: (data) => {
			console.log('completed', data);
			dispatch(selectList(data.lists[0]));
			if (!iconSelected) setIconSelected(icons.find((i) => i.id === data.lists[0].icon));
		},
		onError: (errors) => {
			console.error('errors', errors);
			router.replace('/lists');
		},
	});

	const listSelected: List = useSelector((state: State) => state.lists.selected_list);

	const handleScroll = () => {
		if (ref.current) {
			setSticky(ref.current.getBoundingClientRect().top <= 0);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', () => handleScroll);
		};
	}, []);

	const onBack = () => {
		router.back();
	};

	const handleEdit = (event: any) => {
		event.preventDefault();
		const name = event.target.name.value;
		if (!name || name === '') return;
		const description = event.target.description.value;
		updateList({ variables: { id: listSelected.id, name, description, icon: iconSelected.id } });
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
					{!loading && !listSelected?.locked && (
						<>
							<button
								onClick={() => {
									setModalOpen(true);
								}}
								className="m-auto mr-0 focus:outline-none"
							>
								<PencilSimple size={28} />
							</button>
							<Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
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
													name="name"
													placeholder="Name"
													defaultValue={listSelected?.name}
													className="w-full p-2 text-black border-2 rounded-md border-violet-500 focus:outline-none focus-within:ring-4 ring-violet-300"
												/>
											</div>
											<input
												name="description"
												placeholder="Description (Optional)"
												defaultValue={listSelected?.description}
												className="w-full p-2 mt-2 text-black border-2 rounded-md border-violet-500 focus:outline-none focus-within:ring-4 ring-violet-300"
											/>
											<div className="w-full gap-2 mt-4 text-right">
												<button
													type="button"
													onClick={() => {
														setModalOpen(false);
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
