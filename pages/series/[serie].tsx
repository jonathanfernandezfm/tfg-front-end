import { useMutation, useQuery } from '@apollo/client';
import { Dialog, Disclosure } from '@headlessui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, CaretDown, CaretRight, Eye, Heart, Star, TrashSimple } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddComment } from '../../components/AddComment';
import Card from '../../components/Card';
import CardComment from '../../components/CardComment';
import CompanieCardPlatform from '../../components/CompanieCard';
import FloatingButton from '../../components/FloatingButton';
import HorizontalScroll from '../../components/HorizontalScroll';
import Modal from '../../components/Modal';
import PersonCard from '../../components/PersonCard';
import {
	ADD_COMMENT,
	ADD_SERIE_TO_LIST,
	GIVE_RATING,
	REMOVE_RATING,
	REMOVE_SERIE_TO_LIST,
} from '../../graphql/mutations';
import { ALL_LISTS, GET_CAST, GET_COMMENTS, GET_RATING, GET_RECOMENDATIONS, GET_SERIE } from '../../graphql/queries';
import { setLists } from '../../store/reducers/listsReducer';
import { showNotification } from '../../store/reducers/notificationsReducer';
import {
	removeRatingSelected,
	selectSerie,
	setRatingSelected,
	setSerieCast,
	setSerieComments,
	setSerieRecomendations,
} from '../../store/reducers/seriesReducer';

const Serie = () => {
	const router = useRouter();
	const { serie } = router.query;
	const [modalRatingOpen, setModalRatingOpen] = useState(false);
	const [showAddComment, setShowAddComment] = useState(false);

	const dispatch = useDispatch();
	const serieResult = useQuery(GET_SERIE, {
		variables: { id: serie },
	});
	useQuery(GET_RATING, {
		variables: { serie: serie },
		onCompleted: (data) => {
			dispatch(setRatingSelected(data.ratings[0]?.rating));
		},
	});
	const castResult = useQuery(GET_CAST, {
		variables: { id: serie },
	});
	const recomendationsResult = useQuery(GET_RECOMENDATIONS, {
		variables: { id: serie },
	});
	const listsResult = useQuery(ALL_LISTS);

	useQuery(GET_COMMENTS, {
		variables: { serie: serie },
		onCompleted: (data) => {
			dispatch(setSerieComments(data.comments));
		},
	});

	const [addSerie, resultAdd] = useMutation(ADD_SERIE_TO_LIST, {
		refetchQueries: [{ query: GET_SERIE, variables: { id: serie } }],
		onCompleted: () => {
			dispatch(showNotification({ text: 'Added to list', type: 'success' }));
		},
	});

	const [removeSerie, resultRemove] = useMutation(REMOVE_SERIE_TO_LIST, {
		refetchQueries: [{ query: GET_SERIE, variables: { id: serie } }],
		onCompleted: () => {
			dispatch(showNotification({ text: 'Removed from list', type: 'success' }));
		},
	});

	const [giveRating] = useMutation(GIVE_RATING, {
		refetchQueries: [{ query: GET_RATING, variables: { serie: serie } }],
		onCompleted: (data) => {
			dispatch(setRatingSelected(data.addRating.rating));
			dispatch(showNotification({ text: 'Rated', type: 'success' }));
		},
	});

	const [removeRating] = useMutation(REMOVE_RATING, {
		refetchQueries: [{ query: GET_RATING, variables: { serie: serie } }],
		onCompleted: (data) => {
			dispatch(removeRatingSelected());
			dispatch(showNotification({ text: 'Rating deleted', type: 'success' }));
		},
	});

	const user = useSelector((state: State) => state.user);
	const lists: List[] = useSelector((state: State) => state.lists.lists);
	const selectedSerie = useSelector((state: State) => state.series.serie_selected);
	const selectedSerieRating = useSelector((state: State) => state.series.serie_selected_rating);
	const selectedSerieCast = useSelector((state: State) => state.series.serie_selected_cast);
	const selectedSerieRecomendations = useSelector((state: State) => state.series.serie_selected_recomendations);
	const comments = useSelector((state: State) => state.series.serie_selected_comments);

	const isSeen = selectedSerie?.lists?.find((l: any) => l.name === 'Seen');
	const isLiked = selectedSerie?.lists?.find((l: any) => l.name === 'Liked');
	const seenList = lists?.find((l) => l.name === 'Seen');
	const likedList = lists?.find((l) => l.name === 'Liked');

	useEffect(() => {
		if (serieResult.data) {
			dispatch(selectSerie(serieResult.data.getSerie));
		}
		if (castResult.data) {
			dispatch(setSerieCast(castResult.data.getCast));
		}
		if (recomendationsResult.data) {
			dispatch(setSerieRecomendations(recomendationsResult.data.getRecomendations));
		}
		if (listsResult.data) {
			dispatch(setLists(listsResult.data.lists));
		}
	}, [serieResult, castResult, recomendationsResult]);

	const onBack = () => {
		router.back();
	};

	const likeSerie = () => {
		if (likedList == null) return;
		if (!isLiked) addSerie({ variables: { id: likedList.id, series: [selectedSerie.id.toString()] } });
		else removeSerie({ variables: { id: likedList.id, series: [selectedSerie.id.toString()] } });
	};

	const seeSerie = () => {
		if (seenList == null) return;
		if (!isSeen) addSerie({ variables: { id: seenList.id, series: [selectedSerie.id.toString()] } });
		else removeSerie({ variables: { id: seenList.id, series: [selectedSerie.id.toString()] } });
	};

	const giveRatingHandle = (index: number) => {
		giveRating({ variables: { serie, rating: index + 1 } });
	};

	return (
		<div className="mb-28 xl:container xl:m-auto xl:px-40 xl:mb-28">
			<div className="relative w-full bg-center bg-no-repeat bg-cover h-96 bg-gradient-to-b to-gray-700 from-violet-900">
				{selectedSerie?.backdrop_path ? (
					<img
						src={`${process.env.IMAGES_URL_ORIGINAL}${selectedSerie?.backdrop_path}`}
						className="absolute object-cover h-full xl:w-full "
					/>
				) : (
					''
				)}
				<div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent rounded-b-md"></div>
				<div className="relative flex justify-between px-8 pt-12 mb-24">
					<div className="flex items-center gap-4">
						<button
							onClick={onBack}
							className="focus:outline-none text-violet-50 xl:flex xl:gap-2 xl:text-lg mix-blend-hard-light"
						>
							<ArrowLeft size={28} />
							<span className="hidden font-bold xl:block">Back</span>
						</button>
					</div>
					{user && (
						<div className="flex gap-5">
							<button
								onClick={() => {
									seeSerie();
								}}
								className="focus:outline-none xl:bg-violet-100 xl:p-2 xl:rounded-full"
							>
								<Eye
									size={28}
									className={`${
										isSeen ? 'active-seen text-indigo-400' : 'text-white xl:text-blue-gray-800'
									}`}
								/>
							</button>
							<button
								onClick={() => {
									likeSerie();
								}}
								className="focus:outline-none xl:bg-violet-100 xl:p-2 xl:rounded-full"
							>
								<Heart
									size={28}
									className={`${
										isLiked ? 'active-liked text-red-400' : 'text-white xl:text-blue-gray-800'
									}`}
								/>
							</button>
						</div>
					)}
				</div>
				<div className="absolute text-4xl font-black text-white bottom-6 left-8">
					<div className="flex gap-2 mb-2">
						{!serieResult.loading &&
							selectedSerie?.networks?.map((network: any) => (
								<div
									key={network.name}
									className="flex items-center w-12 h-6 p-2 rounded-md xl:w-20 xl:h-10 xl:p-4 bg-indigo-50"
								>
									<img
										src={`${process.env.IMAGES_URL_500}${network.logo_path.split('.')[0] + '.svg'}`}
										alt="network_logo"
									/>
								</div>
							))}

						{serieResult.loading && <div className="w-12 h-3 rounded-md animate-pulse bg-violet-300"></div>}
					</div>
					<div className="flex flex-wrap items-end">
						<span className="mr-2">{selectedSerie?.name}</span>
						<div className="flex items-end">
							<span className="text-xl font-semibold xl:text-2xl ">
								{!serieResult.loading && selectedSerie?.first_air_date
									? `(${new Date(selectedSerie?.first_air_date).getFullYear()})`
									: ''}
								{serieResult.loading && (
									<div className="w-12 h-3 mb-2 rounded-md animate-pulse bg-violet-300"></div>
								)}
							</span>
							<span className="flex items-center gap-1 mb-0.5 ml-2 mr-4 text-white">
								<Star size={16} color="yellow" weight="fill" />
								<span className="text-sm font-normal xl:text-xl">
									{selectedSerie?.vote_average.toFixed(1)}
								</span>
							</span>
						</div>
					</div>
				</div>
			</div>
			{user && <FloatingButton addSerie={addSerie} removeSerie={removeSerie} />}

			{serieResult.loading && (
				<div className="px-8 mt-6">
					<div className="flex flex-wrap gap-2">
						<div className="w-12 h-3 mb-2 rounded-md animate-pulse bg-violet-300"></div>
						<div className="w-12 h-3 mb-2 rounded-md animate-pulse bg-violet-300"></div>
						<div className="w-12 h-3 mb-2 rounded-md animate-pulse bg-violet-300"></div>
					</div>
					<div className="w-12 h-3 mt-4 rounded-md animate-pulse bg-violet-300"></div>
					<div className="w-12 h-3 mt-4 rounded-md animate-pulse bg-violet-300"></div>
					<div className="w-full h-6 mt-4 rounded-md animate-pulse bg-violet-300"></div>
					<div className="w-full h-20 mt-2 rounded-md animate-pulse bg-violet-300"></div>
				</div>
			)}

			{!serieResult.loading && (
				<div className="px-8 xl:px-2">
					<div className="flex flex-wrap gap-2 mt-6 xl:px-0">
						{selectedSerie?.genres?.map((genre: any) => (
							<div key={genre.id} className="px-2 py-1 text-sm font-semibold rounded-sm bg-violet-200">
								{genre.name}
							</div>
						))}
					</div>
					{user && (
						<button
							className="flex gap-1 p-2 mt-4 bg-yellow-100 rounded-sm"
							onClick={() => {
								setModalRatingOpen(true);
							}}
						>
							{selectedSerieRating ? (
								<span className="font-bold text-yellow-900">{selectedSerieRating}</span>
							) : null}

							<Star size={24} className="text-yellow-400 start-rating" weight="bold" />
						</button>
					)}
					<Modal isOpen={modalRatingOpen} setIsOpen={setModalRatingOpen}>
						<Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
							Give rating
						</Dialog.Title>
						<div className="mt-4">
							<div className="flex justify-center gap-2 mt-6">
								{Array(5)
									.fill(0)
									.map((_, index) => (
										<button
											key={index}
											onClick={() => {
												setModalRatingOpen(false);
												giveRatingHandle(index);
											}}
										>
											<Star
												size={32}
												className={`text-yellow-400 ${
													selectedSerieRating > index ? 'start-rating' : ''
												}`}
												weight="bold"
											/>
										</button>
									))}
							</div>
							<div className="flex justify-end gap-2 mt-6 ">
								{selectedSerieRating ? (
									<button
										onClick={() => {
											removeRating({ variables: { serie } });
											setModalRatingOpen(false);
										}}
										className="p-2 font-semibold text-white bg-red-500 rounded-md focus:ring-4 focus:ring-red-300 focus:outline-none"
									>
										<TrashSimple size={24} />
									</button>
								) : null}
								<button
									tabIndex={0}
									type="button"
									onClick={() => {
										setModalRatingOpen(false);
									}}
									className="items-end px-4 py-2 font-semibold text-indigo-900 bg-indigo-100 rounded-md focus:ring-4 focus:ring-violet-500 focus:outline-none"
								>
									Cancel
								</button>
							</div>
						</div>
					</Modal>
					<div className="mt-4 xl:px-0">
						<div className="font-semibold ">
							{selectedSerie?.number_of_seasons} seasons, {selectedSerie?.number_of_episodes} episodes
							{selectedSerie?.seasons?.find((s: any) => s.season_number === 0) ? ', special content' : ''}
						</div>
						<div className="mt-2 font-semibold">
							Episode time:{' '}
							<span className="font-normal">{selectedSerie?.episode_run_time?.join(', ')} min.</span>
						</div>

						<div className="mt-2">{selectedSerie?.overview}</div>
					</div>
					<div className="mt-4 font-semibold xl:px-0">
						Status: <span className="font-normal">{selectedSerie?.status}</span>
					</div>
					<div className="mt-2 font-semibold xl:px-0">
						Last air date: <span className="font-normal">{selectedSerie?.last_air_date}</span>
					</div>
					<div className="mt-2 font-semibold xl:px-0">
						In production:{' '}
						<span className="font-normal">{selectedSerie?.in_production ? 'Yes' : 'No'}</span>
					</div>
					<div className="mt-2 font-semibold">
						Created by:{' '}
						<span className="font-normal">
							{selectedSerie?.created_by?.map((creator: any, index: number) => (
								<Link href="" key={creator.name}>
									<span className="font-bold text-indigo-800">
										{creator.name}
										{`${index === selectedSerie?.created_by?.length - 1 ? '' : ', '}`}
									</span>
								</Link>
							))}
						</span>
					</div>

					<h1 className="mt-6 text-xl font-semibold">Seasons</h1>
					<div className="w-full mx-auto mt-4 bg-white rounded-2xl">
						{selectedSerie?.seasons?.map((season: any, index: any) => (
							<Disclosure as="div" key={season.id} className="mt-2">
								{({ open }) => (
									<>
										<Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg xl:text-base text-violet-900 bg-violet-200 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
											<span className="font-semibold">
												{season.season_number === 0 ? 'Specials' : `Season ${index}`}
											</span>
											{season.overview && (
												<CaretDown
													className={`${
														open ? 'transform rotate-180' : ''
													} w-5 h-5 text-violet-500`}
												/>
											)}
											{!season.overview && <CaretRight className="w-5 h-5 text-violet-500" />}
										</Disclosure.Button>
										{season.overview && (
											<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black xl:text-base">
												{season.overview}
												<div className="mt-1">
													<Link href="">
														<span className="font-bold text-indigo-800">View episodes</span>
													</Link>
												</div>
											</Disclosure.Panel>
										)}
									</>
								)}
							</Disclosure>
						))}
					</div>
					{!!selectedSerieCast && !!selectedSerieCast.length && (
						<div>
							<h1 className="mt-6 text-xl font-semibold">Cast</h1>
							<HorizontalScroll>
								{selectedSerieCast &&
									selectedSerieCast.map((person: any) => (
										<PersonCard key={person.id} person={person} />
									))}
							</HorizontalScroll>
						</div>
					)}
					{!!selectedSerie?.production_companies?.length &&
						!!selectedSerie?.production_companies?.filter((pr: any) => pr.logo_path !== null).length && (
							<div>
								<h1 className="mt-6 text-xl font-semibold">Production</h1>
								<HorizontalScroll>
									{selectedSerie &&
										selectedSerie?.production_companies?.map((companie: any) =>
											companie.logo_path ? (
												<CompanieCardPlatform key={companie.id} companie={companie} />
											) : null
										)}
								</HorizontalScroll>
							</div>
						)}
					<hr className="mt-6"></hr>
					{!!selectedSerieRecomendations && !!selectedSerieRecomendations.length && (
						<>
							<h1 className="mt-6 text-xl font-semibold">Recomendations</h1>
							<HorizontalScroll>
								{selectedSerieRecomendations &&
									selectedSerieRecomendations.map((serie: any) => (
										<Card key={serie.id} serie={serie} />
									))}
							</HorizontalScroll>
						</>
					)}
					{user && (
						<div>
							<div className="flex items-end gap-4 mt-6">
								<h1 className="text-xl font-semibold">Comments</h1>
								<button
									onClick={() => {
										setShowAddComment(!showAddComment);
									}}
									className="px-2 py-1 font-semibold text-white bg-indigo-600 rounded-lg focus:outline-none focus-within:ring-4 ring-violet-300"
								>
									{!showAddComment ? 'Add comment' : 'Close'}
								</button>
							</div>
							{showAddComment && (
								<motion.div className="mt-4">
									<AddComment serie={serie.toString()} setShowAddComment={setShowAddComment} />
								</motion.div>
							)}
							<div className="mt-4">
								{comments && comments.length ? (
									<div className="flex flex-col gap-4">
										{comments.map((comment: any) => (
											<CardComment key={comment.id} comment={comment} />
										))}
									</div>
								) : (
									<h2 className="text-lg font-semibold text-gray-600">No comments</h2>
								)}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Serie;
