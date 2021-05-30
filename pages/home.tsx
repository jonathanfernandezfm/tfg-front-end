import { useLazyQuery, useQuery } from '@apollo/client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import CardPlatform from '../components/CardPlatform';
import HorizontalScroll from '../components/HorizontalScroll';
import { SERIES } from '../graphql/queries';
import { setSeries } from '../store/reducers/seriesReducer';

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
	const result = useQuery(SERIES);

	const user = useSelector((state: State) => state.user);
	const series: any[] = useSelector((state: State) => {
		return state.series.series_discover;
	});

	useEffect(() => {
		if (result.data) {
			dispatch(setSeries(result.data.discover));
		}
	}, [result]);

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
			<div className="px-8 mt-16 mb-24 ">
				<h1
					className={`text-4xl font-bold sticky top-0 transition-all bg-transparent ${
						isSticky ? 'bg-white py-4 text-black z-20' : 'text-white'
					}`}
					ref={ref}
				>
					Home
				</h1>
				<div className="flex items-end">
					<h2 className="mt-8 text-2xl font-semibold">Popular</h2>
					{/* <span className="px-2 ml-2 text-white rounded-lg bg-violet-800">more</span> */}
				</div>
				<HorizontalScroll className="mt-4">
					{series && series.map((serie) => <Card key={serie.id} serie={serie} />)}
				</HorizontalScroll>
				<h2 className="mt-6 text-2xl font-semibold">Recent updates</h2>
				<HorizontalScroll className="mt-4">
					{series && series.map((serie) => <Card key={serie.id} serie={serie} />)}
				</HorizontalScroll>
				<h2 className="mt-6 text-2xl font-semibold">Platforms</h2>
				<HorizontalScroll className="mt-4">
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
			</div>
		</>
	);
};

export default Home;
