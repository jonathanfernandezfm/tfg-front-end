import { useLazyQuery, useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import CardPlatform from '../components/CardPlatform';
import HorizontalScroll from '../components/HorizontalScroll';
import Subtitle from '../components/Subtitle';
import Title from '../components/Title';
import { TrailerViewer } from '../components/TrailerViewer';
import {
	AIRING_TODAY_SERIES,
	DISCOVER_GENRE,
	DISCOVER_SERIES,
	POPULAR_SERIES,
	TOP_RATED_SERIES,
} from '../graphql/queries';
import {
	setAiringTodaySeries,
	setDiscoverByGenre,
	setDiscoverSeries,
	setPopularSeries,
	setTopRatedSeries,
} from '../store/reducers/seriesReducer';

const Home = () => {
	const dispatch = useDispatch();
	const { loading: loadingDiscover } = useQuery(DISCOVER_SERIES, {
		onCompleted: (data) => {
			dispatch(setDiscoverSeries(data.discover));
		},
	});

	const { loading: loadingPopular } = useQuery(POPULAR_SERIES, {
		onCompleted: (data) => {
			dispatch(setPopularSeries(data.popular));
		},
	});

	const { loading: loadingTopRated } = useQuery(TOP_RATED_SERIES, {
		onCompleted: (data) => {
			dispatch(setTopRatedSeries(data.topRated));
		},
	});

	const { loading: loadingAired } = useQuery(AIRING_TODAY_SERIES, {
		onCompleted: (data) => {
			dispatch(setAiringTodaySeries(data.airingToday));
		},
	});

	const { loading: loadingGenreAction } = useQuery(DISCOVER_GENRE, {
		variables: { genres: ['10759'] },
		onCompleted: (data) => {
			dispatch(setDiscoverByGenre(data.discover, 'action'));
		},
	});

	const { loading: loadingGenreDrama } = useQuery(DISCOVER_GENRE, {
		variables: { genres: ['18'] },
		onCompleted: (data) => {
			dispatch(setDiscoverByGenre(data.discover, 'drama'));
		},
	});

	const user = useSelector((state: State) => state.user);
	const discoverSeries: any[] = useSelector((state: State) => {
		return state.series.series_discover;
	});
	const popularSeries: any[] = useSelector((state: State) => {
		return state.series.series_popular;
	});
	const topRatedSeries: any[] = useSelector((state: State) => {
		return state.series.series_top_rated;
	});
	const airingSeries: any[] = useSelector((state: State) => {
		return state.series.series_airing;
	});
	const actionSeries: any[] = useSelector((state: State) => {
		return state.series.series_genre_action;
	});
	const dramaSeries: any[] = useSelector((state: State) => {
		return state.series.series_genre_drama;
	});

	return (
		<>
			<img
				src="background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full h-3/4 -z-1 opacity-95 xl:hidden"
			/>
			<motion.div
				exit={{ opacity: 0 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="mb-20 mt-14 xl:mt-24"
			>
				<Title text={'Home'} className="xl:hidden" />
				<Subtitle text={'Airing today'} className="mt-6" />
				<HorizontalScroll className="px-8 xl:px-12 xl:py-4">
					{!loadingAired && airingSeries ? (
						airingSeries.map((serie) => <Card key={serie.id} serie={serie} />)
					) : (
						<>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
						</>
					)}
				</HorizontalScroll>
				<Subtitle text={'Popular'} />
				<HorizontalScroll className="px-8 xl:px-12 xl:py-4">
					{!loadingPopular && popularSeries ? (
						popularSeries.map((serie) => <Card key={serie.id} serie={serie} />)
					) : (
						<>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
						</>
					)}
				</HorizontalScroll>
				<Subtitle text={'Recent updates'} />
				<HorizontalScroll className="px-8 xl:px-12 xl:py-4">
					{!loadingDiscover && discoverSeries ? (
						discoverSeries.map((serie) => <Card key={serie.id} serie={serie} />)
					) : (
						<>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
						</>
					)}
				</HorizontalScroll>
				<Subtitle text={'Action & Adventure'} />
				<HorizontalScroll className="px-8 xl:px-12 xl:py-4">
					{!loadingGenreAction && actionSeries ? (
						actionSeries.map((serie) => <Card key={serie.id} serie={serie} />)
					) : (
						<>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
						</>
					)}
				</HorizontalScroll>
				<Subtitle text={'Drama'} />
				<HorizontalScroll className="px-8 xl:px-12 xl:py-4">
					{!loadingGenreDrama && dramaSeries ? (
						dramaSeries.map((serie) => <Card key={serie.id} serie={serie} />)
					) : (
						<>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
						</>
					)}
				</HorizontalScroll>

				<Subtitle text={'Top rated'} />
				<HorizontalScroll className="px-8 xl:px-12 xl:py-4">
					{!loadingTopRated && topRatedSeries ? (
						topRatedSeries.map((serie) => <Card key={serie.id} serie={serie} />)
					) : (
						<>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse xl:w-80 xl:h-48"></div>
						</>
					)}
				</HorizontalScroll>
				{!user && (
					<Link href="/register">
						<a
							className={`block m-auto mt-12 w-max px-20 py-3 rounded-md bg-gradient-to-r from-violet-400 to-indigo-800 focus:ring-4 ring-violet-300 focus:outline-none`}
						>
							<span className="font-bold text-white">{'Sign up'}</span>
						</a>
					</Link>
				)}
			</motion.div>
		</>
	);
};

export default Home;
