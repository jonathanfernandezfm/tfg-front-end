import { useLazyQuery } from '@apollo/client';
import { Cube, MagnifyingGlass, SmileySad, X } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { setSeriesSearch } from '../store/reducers/seriesReducer';
import { CardWide } from './CardWide';
import { DebounceInput } from 'react-debounce-input';
import { SEARCH_SERIES } from '../graphql/queries';
import { useDispatch, useSelector } from 'react-redux';
import Chip from './Chip';
import { motion } from 'framer-motion';
interface InputProps {
	className?: string;
}

const visibility = {
	visible: { opacity: 1 },
	hidden: { opacity: 0 },
};

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
		setSearchInput(event.target.value);
		if (event.target.value.length <= 2) return dispatch(setSeriesSearch([]));
		search({ variables: { query: event.target.value } });
	};

	return (
		<motion.div
			transition={{ ease: 'easeOut', duration: 0.3 }}
			layout
			className={`z-10  py-3 text-indigo-800 bg-white  ${className} ${
				focused || searchInput
					? `px-8 pb-24 absolute top-0 left-0 rounded-none w-full h-screen mb-14 overflow-hidden`
					: `px-4 mx-8 rounded-md`
			}`}
		>
			<motion.div
				layout="position"
				transition={{ ease: 'easeOut', duration: 0.3 }}
				className={`flex ${focused || searchInput ? `mt-10 ` : ``}`}
			>
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
				{searchInput ? (
					<button
						onClick={() => {
							setFocused(false);
							setSearchInput('');
							dispatch(setSeriesSearch([]));
						}}
						className="flex items-center focus:outline-none"
					>
						<X size={18} weight="bold" className="text-indigo-800" />
					</button>
				) : null}
			</motion.div>
			{(focused || searchInput) && (
				<motion.div
					layout="position"
					className="flex flex-col h-full gap-4 pb-24 mt-10 overflow-y-scroll scrollbar-hide"
				>
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
								<MagnifyingGlass size={120} />
								<span className="text-lg font-bold text-center">Search something</span>
							</div>
						</div>
					)}
					{!series?.length && searchInput !== '' && (
						<div className="flex items-center justify-center w-full h-full">
							<div className="flex flex-col items-center gap-4 opacity-25">
								<SmileySad size={120} />
								<span className="text-lg font-bold text-center">No results</span>
							</div>
						</div>
					)}
				</motion.div>
			)}
		</motion.div>
	);
};

export default Input;
