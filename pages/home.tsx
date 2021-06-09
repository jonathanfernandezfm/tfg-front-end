import { useLazyQuery, useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import CardPlatform from '../components/CardPlatform';
import HorizontalScroll from '../components/HorizontalScroll';
import { AIRING_TODAY_SERIES, DISCOVER_SERIES, POPULAR_SERIES, TOP_RATED_SERIES } from '../graphql/queries';
import {
	setAiringTodaySeries,
	setDiscoverSeries,
	setPopularSeries,
	setTopRatedSeries,
} from '../store/reducers/seriesReducer';

const Platforms = [
	{
		id: '1',
		name: 'Amazon',
		logo_path: '/ifhbNuuVnlwYy5oXA5VIb2YR8AZ.png',
	},
	{
		id: '2',
		name: 'Disney+',
		logo_path: '/gJ8VX6JSu3ciXHuC2dDGAo2lvwM.png',
	},
	{
		id: '3',
		name: 'ABC',
		logo_path: '/ndAvF4JLsliGreX87jAc9GdjmJY.png',
	},
	{
		id: '4',
		name: 'Amazon',
		logo_path: '/ifhbNuuVnlwYy5oXA5VIb2YR8AZ.png',
	},
	{
		id: '5',
		name: 'Disney+',
		logo_path: '/gJ8VX6JSu3ciXHuC2dDGAo2lvwM.png',
	},
	{
		id: '6',
		name: 'ABC',
		logo_path: '/ndAvF4JLsliGreX87jAc9GdjmJY.png',
	},
];

const Home = () => {
	const [isSticky, setSticky] = useState(false);
	const ref = useRef(null);

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

	console.log('HOME -> ', user);

	return (
		<>
			<img
				src="background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full h-3/4 -z-1 opacity-95"
			/>
			<motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-20 mt-14">
				<h1
					className={`font-bold sticky top-0 transition-all bg-transparent ${
						isSticky ? 'bg-white py-4 text-black text-3xl z-20 shadow-lg px-8' : 'text-white text-4xl px-8'
					}`}
					ref={ref}
				>
					Home
				</h1>
				<h2 className="px-8 mt-8 text-2xl font-semibold">Popular</h2>
				<HorizontalScroll className="px-8 mt-4">
					{!loadingPopular && popularSeries ? (
						popularSeries.map((serie) => <Card key={serie.id} serie={serie} />)
					) : (
						<>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse"></div>
						</>
					)}
				</HorizontalScroll>
				<h2 className="px-8 mt-6 text-2xl font-semibold">Airing today</h2>
				<HorizontalScroll className="px-8 mt-4">
					{!loadingAired && airingSeries ? (
						airingSeries.map((serie) => <Card key={serie.id} serie={serie} />)
					) : (
						<>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse"></div>
						</>
					)}
				</HorizontalScroll>
				<h2 className="px-8 mt-6 text-2xl font-semibold">Recent updates</h2>
				<HorizontalScroll className="px-8 mt-4">
					{!loadingDiscover && discoverSeries ? (
						discoverSeries.map((serie) => <Card key={serie.id} serie={serie} />)
					) : (
						<>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse"></div>
						</>
					)}
				</HorizontalScroll>
				<h2 className="px-8 mt-6 text-2xl font-semibold">Top rated</h2>
				<HorizontalScroll className="px-8 mt-4">
					{!loadingTopRated && topRatedSeries ? (
						topRatedSeries.map((serie) => <Card key={serie.id} serie={serie} />)
					) : (
						<>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse"></div>
							<div className="relative flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 w-28 animate-pulse"></div>
						</>
					)}
				</HorizontalScroll>
				<h2 className="px-8 mt-6 text-2xl font-semibold">Platforms</h2>
				<HorizontalScroll className="px-8 mt-4">
					{Platforms.map((platform) => (
						<CardPlatform key={platform.id} platform={platform} />
					))}
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
