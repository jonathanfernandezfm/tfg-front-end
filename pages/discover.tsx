import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import HorizontalScroll from '../components/HorizontalScroll';
import Search from '../components/Search';
import Title from '../components/Title';
import { DISCOVER_SERIES } from '../graphql/queries';
import { setDiscoverSeries } from '../store/reducers/seriesReducer';

const Discover = () => {
	const dispatch = useDispatch();
	const { loading: loadingSeries } = useQuery(DISCOVER_SERIES, {
		onCompleted: (data) => {
			dispatch(setDiscoverSeries(data.discover));
		},
	});

	const series: any[] = useSelector((state: State) => {
		return state.series.series_discover;
	});

	return (
		<>
			<img
				src="background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full h-3/4 -z-1 opacity-95"
			/>
			<motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-20 mt-14">
				<Search />
				<Title text={'Discover'} className="mt-8" />
				<div className="flex flex-wrap gap-4 px-8 mt-4">
					{loadingSeries && series ? (
						series.map((serie) => <Card className="flex-1" key={serie.id} serie={serie} />)
					) : (
						<>
							{/* <div className="relative flex-1 flex-shrink-0 h-40 rounded-md shadow-md w-28 min-w-max bg-violet-300 animate-pulse"></div>
							<div className="relative flex-1 flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 min-w-max w-28 animate-pulse"></div>
							<div className="relative flex-1 flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 min-w-max w-28 animate-pulse"></div>
							<div className="relative flex-1 flex-shrink-0 h-40 rounded-md shadow-md w-28 min-w-max bg-violet-300 animate-pulse"></div>
							<div className="relative flex-1 flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 min-w-max w-28 animate-pulse"></div>
							<div className="relative flex-1 flex-shrink-0 h-40 rounded-md shadow-md bg-violet-300 min-w-max w-28 animate-pulse"></div> */}
							<div className="relative flex-1 flex-shrink-0 h-40 overflow-hidden bg-center bg-no-repeat bg-cover rounded-md shadow-md cursor-pointer bg-violet-300 xl:shadow-lg w-28 min-w-max xl:w-80 xl:h-48">
								<div className="w-full h-full bg-transparent"></div>
							</div>
							<div className="relative flex-1 flex-shrink-0 h-40 overflow-hidden bg-center bg-no-repeat bg-cover rounded-md shadow-md cursor-pointer bg-violet-300 xl:shadow-lg w-28 min-w-max xl:w-80 xl:h-48"></div>
							<div className="relative flex-1 flex-shrink-0 h-40 overflow-hidden bg-center bg-no-repeat bg-cover rounded-md shadow-md cursor-pointer bg-violet-300 xl:shadow-lg w-28 min-w-max xl:w-80 xl:h-48"></div>
							<div className="relative flex-1 flex-shrink-0 h-40 overflow-hidden bg-center bg-no-repeat bg-cover rounded-md shadow-md cursor-pointer bg-violet-300 xl:shadow-lg w-28 min-w-max xl:w-80 xl:h-48"></div>
							<div className="relative flex-1 flex-shrink-0 h-40 overflow-hidden bg-center bg-no-repeat bg-cover rounded-md shadow-md cursor-pointer bg-violet-300 xl:shadow-lg w-28 min-w-max xl:w-80 xl:h-48"></div>
							<div className="relative flex-1 flex-shrink-0 h-40 overflow-hidden bg-center bg-no-repeat bg-cover rounded-md shadow-md cursor-pointer bg-violet-300 xl:shadow-lg w-28 min-w-max xl:w-80 xl:h-48"></div>
							<div className="relative flex-1 flex-shrink-0 h-40 overflow-hidden bg-center bg-no-repeat bg-cover rounded-md shadow-md cursor-pointer bg-violet-300 xl:shadow-lg w-28 min-w-max xl:w-80 xl:h-48"></div>
							<div className="relative flex-1 flex-shrink-0 h-40 overflow-hidden bg-center bg-no-repeat bg-cover rounded-md shadow-md cursor-pointer bg-violet-300 xl:shadow-lg w-28 min-w-max xl:w-80 xl:h-48"></div>
						</>
					)}
				</div>
			</motion.div>
		</>
	);
};

export default Discover;
