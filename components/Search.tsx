import { useLazyQuery } from '@apollo/client';
import { Cube, MagnifyingGlass, X } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { setSeriesSearch } from '../store/reducers/seriesReducer';
import { CardWide } from './CardWide';
import { DebounceInput } from 'react-debounce-input';
import { SEARCH_SERIES } from '../graphql/queries';
import { useDispatch, useSelector } from 'react-redux';

const SeriesTest1: any[] = [];

const SeriesTest = [
	{
		backdrop_path: '/6UH52Fmau8RPsMAbQbjwN3wJSCj.jpg',
		name: 'Invincible',
		id: 95557,
		popularity: 1856.148,
		vote_average: 8.9,
	},
	{
		backdrop_path: '/b0WmHGc8LHTdGCVzxRb3IBMur57.jpg',
		name: 'The Falcon and the Winter Soldier',
		id: 88396,
		popularity: 1789.883,
		vote_average: 7.9,
	},
	{
		backdrop_path: '/z59kJfcElR9eHO9rJbWp4qWMuee.jpg',
		name: 'The Flash',
		id: 60735,
		popularity: 1258.983,
		vote_average: 7.7,
	},
	{
		backdrop_path: '/mZjZgY6ObiKtVuKVDrnS9VnuNlE.jpg',
		name: 'The Good Doctor',
		id: 71712,
		popularity: 1200.31,
		vote_average: 8.6,
	},
	{
		backdrop_path: '/edmk8xjGBsYVIf4QtLY9WMaMcXZ.jpg',
		name: "Grey's Anatomy",
		id: 1416,
		popularity: 950.414,
		vote_average: 8.2,
	},
	{
		backdrop_path: '/wkyzeBBKLhSg1Oqhky5yoiFF2hG.jpg',
		name: 'Luis Miguel: The Series',
		id: 79008,
		popularity: 793.676,
		vote_average: 8,
	},
	{
		backdrop_path: '/ta5oblpMlEcIPIS2YGcq9XEkWK2.jpg',
		name: 'Lucifer',
		id: 63174,
		popularity: 733.554,
		vote_average: 8.5,
	},
	{
		backdrop_path: '/qZtAf4Z1lazGQoYVXiHOrvLr5lI.jpg',
		name: 'Riverdale',
		id: 69050,
		popularity: 726.697,
		vote_average: 8.6,
	},
	{
		backdrop_path: '/Wu8kh7oyvaIfkNyMJyJHCamh5L.jpg',
		name: 'Selena: The Series',
		id: 97180,
		popularity: 679.704,
		vote_average: 7.5,
	},
	{
		backdrop_path: '/suopoADq0k8YZr4dQXcU6pToj6s.jpg',
		name: 'Game of Thrones',
		id: 1399,
		popularity: 571.087,
		vote_average: 8.4,
	},
	{
		backdrop_path: '/uro2Khv7JxlzXtLb8tCIbRhkb9E.jpg',
		name: 'The Walking Dead',
		id: 1402,
		popularity: 544.796,
		vote_average: 8.1,
	},
	{
		backdrop_path: '/hNiGqLsiD30C194lci7VYDmciHD.jpg',
		name: "The Handmaid's Tale",
		id: 69478,
		popularity: 544.512,
		vote_average: 8.2,
	},
	{
		backdrop_path: '/5VltHQJXdmbSD6gEJw3R8R1Kbmc.jpg',
		name: 'Van Helsing',
		id: 65820,
		popularity: 519.687,
		vote_average: 6.9,
	},
	{
		backdrop_path: '/1i1N0AVRb54H6ZFPDTwbo9MLxSF.jpg',
		name: 'WandaVision',
		id: 85271,
		popularity: 494.49,
		vote_average: 8.4,
	},
	{
		backdrop_path: '/pPKiIJEEcV0E1hpVcWRXyp73ZpX.jpg',
		name: 'Superman & Lois',
		id: 95057,
		popularity: 485.278,
		vote_average: 8.3,
	},
	{
		backdrop_path: '/58PON1OrnBiX6CqEHgeWKVwrCn6.jpg',
		name: 'Fear the Walking Dead',
		id: 62286,
		popularity: 485.109,
		vote_average: 7.6,
	},
	{
		backdrop_path: '/fRYwdeNjMqC30EhofPx5PlDpdun.jpg',
		name: 'Legacies',
		id: 79460,
		popularity: 454.415,
		vote_average: 8.6,
	},
];

interface InputProps {
	className?: string;
}

const Input = ({ className }: InputProps) => {
	const [focused, setFocused] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const dispatch = useDispatch();

	const [search, result] = useLazyQuery(SEARCH_SERIES, {
		onCompleted: () => {},
		onError: (error) => {},
	});

	const series: any[] = useSelector((state: State) => {
		console.log(state.series.series_search);
		return state.series.series_search;
	});

	useEffect(() => {
		if (result.data) {
			console.log(result.data);
			dispatch(setSeriesSearch(result.data.searchSeries));
		}
	}, [result]);

	const onFocusHandle = (value: boolean) => {
		setFocused(value);
	};

	const onChange = (event: any) => {
		if (event.target.value === '') return dispatch(setSeriesSearch([]));
		setSearchInput(event.target.value);
		search({ variables: { query: event.target.value } });
		console.log(event.target.value);
	};

	return (
		<div
			className={`z-10 py-3 text-indigo-800 bg-white rounded-md ring-violet-300 ${className} ${
				focused || searchInput
					? `px-8 pb-24 absolute top-0 left-0 w-full h-screen focus-within:ring-0 mb-14 overflow-hidden`
					: `px-4 focus-within:ring-4`
			}`}
		>
			<div className={`flex ${focused || searchInput ? `mt-10 ` : ``}`}>
				<div>
					<MagnifyingGlass size={26} weight="bold" className="text-indigo-800" />
				</div>
				<DebounceInput
					minLength={2}
					debounceTimeout={300}
					onChange={onChange}
					onFocus={() => {
						onFocusHandle(true);
					}}
					onBlur={() => {
						onFocusHandle(false);
					}}
					value={searchInput}
					className={`${
						focused
							? 'w-full ml-3 font-regular focus:outline-none'
							: 'w-full ml-3 font-regular focus:outline-none'
					}`}
					placeholder="Search"
					type="text"
				/>
				<button
					onClick={() => {
						setFocused(false);
						setSearchInput('');
					}}
					className="flex items-center focus:outline-none"
				>
					<X size={18} weight="bold" className="text-indigo-800" />
				</button>
			</div>
			{(focused || searchInput) && (
				<div className="flex flex-wrap h-full gap-4 pb-24 mt-10 overflow-y-scroll scrollbar-hide">
					{series && (
						<>
							{series.map((serie) => (
								<CardWide key={serie.id} serie={serie} />
							))}
						</>
					)}
					{!series?.length && (
						<div className="flex items-center justify-center w-full h-full">
							<div className="flex flex-col items-center gap-4 opacity-25">
								<Cube size={120} />
								<span className="text-lg font-bold text-center">Search something</span>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Input;
