import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import HorizontalScroll from '../components/HorizontalScroll';
import Search from '../components/Search';
import { DISCOVER_SERIES } from '../graphql/queries';
import { setDiscoverSeries } from '../store/reducers/seriesReducer';

const Discover = () => {
	const dispatch = useDispatch();
	const result = useQuery(DISCOVER_SERIES);

	const series: any[] = useSelector((state: State) => {
		return state.series.series_discover;
	});

	useEffect(() => {
		if (result.data) {
			dispatch(setDiscoverSeries(result.data.discover));
		}
	}, [result]);

	return (
		<>
			<img
				src="background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full h-3/4 -z-1 opacity-95"
			/>
			<motion.div
				exit={{ opacity: 0 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="px-8 mt-16 mb-24 "
			>
				<Search />
				<h1 className="mt-8 text-4xl font-bold">Discover</h1>
				<HorizontalScroll className="mt-4">
					{series && series.map((serie) => <Card key={serie.id} serie={serie} />)}
				</HorizontalScroll>
			</motion.div>
		</>
	);
};

export default Discover;
