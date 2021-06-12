import { useMutation, useQuery } from '@apollo/client';
import { Disclosure } from '@headlessui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, CaretDown, CaretRight, Eye, Heart, Star } from 'phosphor-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card';
import CompanieCardPlatform from '../../components/CompanieCard';
import FloatingButton from '../../components/FloatingButton';
import HorizontalScroll from '../../components/HorizontalScroll';
import PersonCard from '../../components/PersonCard';
import { ADD_SERIE_TO_LIST, REMOVE_SERIE_TO_LIST } from '../../graphql/mutations';
import { ALL_LISTS, GET_CAST, GET_RECOMENDATIONS, GET_SERIE } from '../../graphql/queries';
import { setLists } from '../../store/reducers/listsReducer';
import { showNotification } from '../../store/reducers/notificationsReducer';
import { selectSerie, setSerieCast, setSerieRecomendations } from '../../store/reducers/seriesReducer';

const Serie = () => {
	const router = useRouter();
	const { serie } = router.query;

	const dispatch = useDispatch();
	const serieResult = useQuery(GET_SERIE, {
		variables: { id: serie },
	});
	const castResult = useQuery(GET_CAST, {
		variables: { id: serie },
	});
	const recomendationsResult = useQuery(GET_RECOMENDATIONS, {
		variables: { id: serie },
	});
	const listsResult = useQuery(ALL_LISTS);

	const [addSerie, resultAdd] = useMutation(ADD_SERIE_TO_LIST, {
		refetchQueries: [{ query: GET_SERIE, variables: { id: serie } }],
		onCompleted: () => {
			dispatch(showNotification({ text: 'Added to list', type: 'success' }));
		},
		onError: (error) => {},
	});

	const [removeSerie, resultRemove] = useMutation(REMOVE_SERIE_TO_LIST, {
		refetchQueries: [{ query: GET_SERIE, variables: { id: serie } }],
		onCompleted: () => {
			dispatch(showNotification({ text: 'Removed from list', type: 'success' }));
		},
		onError: (error) => {},
	});

	const user = useSelector((state: State) => state.user);
	const lists: List[] = useSelector((state: State) => state.lists.lists);
	const selectedSerie = useSelector((state: State) => state.series.serie_selected);
	const selectedSerieCast = useSelector((state: State) => state.series.serie_selected_cast);
	const selectedSerieRecomendations = useSelector((state: State) => state.series.serie_selected_recomendations);

	const isSeen = selectedSerie?.lists?.find((l: any) => l.name === 'Seen');
	const isLiked = selectedSerie?.lists?.find((l: any) => l.name === 'Liked');
	const seenList = lists?.find((l) => l.name === 'Seen');
	const likedList = lists?.find((l) => l.name === 'Liked');

	useEffect(() => {
		if (serieResult.data) {
			dispatch(selectSerie(serieResult.data.getSerie));
			console.log(serieResult.data.getSerie);
		}
		if (castResult.data) {
			dispatch(setSerieCast(castResult.data.getCast));
			console.log(castResult.data.getCast);
		}
		if (recomendationsResult.data) {
			dispatch(setSerieRecomendations(recomendationsResult.data.getRecomendations));
			console.log(recomendationsResult.data.getRecomendations);
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

	return (
		<div className="mb-20">
			<div className="relative w-full bg-center bg-no-repeat bg-cover h-96">
				<img
					src={`${process.env.IMAGES_URL_ORIGINAL}${selectedSerie?.backdrop_path}`}
					className="absolute object-cover h-full"
				/>
				<div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent rounded-b-md"></div>
				<div className="relative flex justify-between px-8 pt-12 mb-24">
					<div className="flex items-center gap-4">
						<button onClick={onBack} className="focus:outline-none text-violet-50">
							<ArrowLeft size={28} />
						</button>
					</div>
					{user && (
						<div className="flex gap-5">
							<button
								onClick={() => {
									seeSerie();
								}}
								className="focus:outline-none"
							>
								<Eye size={28} className={`${isSeen ? 'active-seen text-indigo-400' : 'text-white'}`} />
							</button>
							<button
								onClick={() => {
									likeSerie();
								}}
								className="focus:outline-none"
							>
								<Heart
									size={28}
									className={`${isLiked ? 'active-liked text-red-400' : 'text-white'}`}
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
									className="flex items-center w-12 h-6 p-2 rounded-md bg-indigo-50"
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
							<span className="text-xl font-semibold ">
								{!serieResult.loading
									? `(${new Date(selectedSerie?.first_air_date).getFullYear()})`
									: ''}
								{serieResult.loading && (
									<div className="w-12 h-3 mb-2 rounded-md animate-pulse bg-violet-300"></div>
								)}
							</span>
							<span className="flex items-center gap-1 mb-0.5 ml-2 mr-4 text-white">
								<Star size={16} color="yellow" weight="fill" />
								<span className="text-sm font-normal">{selectedSerie?.vote_average.toFixed(1)}</span>
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
					<div className="w-full h-6 mt-4 rounded-md animate-pulse bg-violet-300"></div>
					<div className="w-full h-20 mt-2 rounded-md animate-pulse bg-violet-300"></div>
				</div>
			)}

			{!serieResult.loading && (
				<div>
					<div className="flex flex-wrap gap-2 px-8 mt-6">
						{selectedSerie?.genres?.map((genre: any) => (
							<div key={genre.id} className="px-2 py-1 text-sm font-semibold rounded-sm bg-violet-200">
								{genre.name}
							</div>
						))}
					</div>
					<div className="px-8 mt-6">
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
					<div className="px-8 mt-4 font-semibold">
						Status: <span className="font-normal">{selectedSerie?.status}</span>
					</div>
					<div className="px-8 mt-2 font-semibold">
						Last air date: <span className="font-normal">{selectedSerie?.last_air_date}</span>
					</div>
					<div className="px-8 mt-2 font-semibold">
						In production:{' '}
						<span className="font-normal">{selectedSerie?.in_production ? 'Yes' : 'No'}</span>
					</div>
					<div className="px-8 mt-2 font-semibold">
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

					<h1 className="px-8 mt-6 text-xl font-semibold">Seasons</h1>
					<div className="w-full px-8 mx-auto mt-4 bg-white rounded-2xl">
						{selectedSerie?.seasons?.map((season: any, index: any) => (
							<Disclosure as="div" key={season.id} className="mt-2">
								{({ open }) => (
									<>
										<Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg text-violet-900 bg-violet-200 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
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
											<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
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
							<h1 className="px-8 mt-6 text-xl font-semibold">Cast</h1>
							<HorizontalScroll className="px-8 mt-4 ">
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
								<h1 className="px-8 mt-6 text-xl font-semibold">Production</h1>
								<HorizontalScroll className="px-8 mt-4 ">
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
						<div>
							<h1 className="px-8 mt-6 text-xl font-semibold">Recomendations</h1>
							<HorizontalScroll className="px-8 mt-4">
								{selectedSerieRecomendations &&
									selectedSerieRecomendations.map((serie: any) => (
										<Card key={serie.id} serie={serie} />
									))}
							</HorizontalScroll>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Serie;
