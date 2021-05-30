import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import HorizontalScroll from '../components/HorizontalScroll';
import Search from '../components/Search';
import { SERIES } from '../graphql/queries';
import { setSeries } from '../store/reducers/seriesReducer';

const Discover = () => {
	const dispatch = useDispatch();
	const result = useQuery(SERIES);

	const series: any[] = useSelector((state: State) => {
		return state.series.series_discover;
	});

	useEffect(() => {
		if (result.data) {
			dispatch(setSeries(result.data.discover));
		}
	}, [result]);

	return (
		<>
			<img
				src="background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full h-3/4 -z-1 opacity-95"
			/>
			<div className="px-8 mt-16 mb-24 ">
				<Search />
				<h1 className="mt-8 text-4xl font-bold">Discover</h1>
				<HorizontalScroll className="mt-4">
					{series && series.map((serie) => <Card key={serie.id} serie={serie} />)}
				</HorizontalScroll>
			</div>
		</>
	);
};

export default Discover;
