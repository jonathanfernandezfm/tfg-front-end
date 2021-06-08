import { useLazyQuery } from '@apollo/client';
import { Cube, MagnifyingGlass, X } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { setSeriesSearch } from '../store/reducers/seriesReducer';
import { CardWide } from './CardWide';
import { DebounceInput } from 'react-debounce-input';
import { SEARCH_SERIES } from '../graphql/queries';
import { useDispatch, useSelector } from 'react-redux';
import Chip from './Chip';
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
		console.log(event.target.value);
		setSearchInput(event.target.value);
		if (event.target.value.length <= 2) return dispatch(setSeriesSearch([]));
		search({ variables: { query: event.target.value } });
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
				<div className="flex flex-col h-full gap-4 pb-24 mt-10 overflow-y-scroll scrollbar-hide">
					{series && (
						<>
							{series.map((serie) => (
								<CardWide key={serie.id} serie={serie} />
							))}
						</>
					)}
					{!series?.length && searchInput === '' && (
						<div className="flex items-center justify-center w-full h-full">
							<div className="flex flex-col items-center gap-4 opacity-25">
								<Cube size={120} />
								<span className="text-lg font-bold text-center">Search something</span>
							</div>
						</div>
					)}
					{!series?.length && searchInput !== '' && (
						<div className="flex items-center justify-center w-full h-full">
							<div className="flex flex-col items-center gap-4 opacity-25">
								<Cube size={120} />
								<span className="text-lg font-bold text-center">No results</span>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Input;
