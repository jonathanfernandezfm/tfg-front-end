import { useLazyQuery } from '@apollo/client';
import { MagnifyingGlass, SmileySad, X } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { CardWide } from './CardWide';
import { DebounceInput } from 'react-debounce-input';
import { SEARCH_SERIES, SEARCH_USERS } from '../graphql/queries';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { clearSeach, setSeriesSearch, setUsersSearch } from '../store/reducers/searchReducer';
import CardUser from './CardUser';

interface InputProps {
	className?: string;
}

const Input = ({ className }: InputProps) => {
	const [focused, setFocused] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const dispatch = useDispatch();

	const [searchSeries] = useLazyQuery(SEARCH_SERIES, {
		fetchPolicy: 'network-only',
		onCompleted: (data) => {
			dispatch(setSeriesSearch(data.searchSeries));
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const [searchUsers] = useLazyQuery(SEARCH_USERS, {
		fetchPolicy: 'network-only',
		onCompleted: (data) => {
			dispatch(setUsersSearch(data.searchUsers));
		},
		onError: (error) => {},
	});

	const series: any[] = useSelector((state: State) => {
		return state.search.series_search;
	});
	const users: any[] = useSelector((state: State) => {
		return state.search.users_search;
	});

	const onFocusHandle = (value: boolean) => {
		setFocused(value);
	};

	const onChange = (event: any) => {
		setSearchInput(event.target.value);
		if (event.target.value[0] === '@') {
			if (event.target.value.length <= 1) {
				dispatch(clearSeach());
				return;
			}
			const search = event.target.value.substring(1);
			dispatch(setSeriesSearch([]));
			searchUsers({ variables: { query: search } });
		} else {
			if (event.target.value.length <= 2) {
				dispatch(clearSeach());
				return;
			}
			dispatch(setUsersSearch([]));
			searchSeries({ variables: { query: event.target.value } });
		}
	};

	useEffect(() => {
		if (focused || searchInput) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [focused, searchInput]);

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
				{focused || searchInput ? (
					<button
						onClick={() => {
							setFocused(false);
							setSearchInput('');
							dispatch(clearSeach());
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
							{!!series.length && <h2 className="text-lg text-black">Series</h2>}
							{series.map((serie) => (
								<CardWide key={serie.id} serie={serie} />
							))}
						</>
					)}
					{users && (
						<>
							{!!users.length && <h2 className="text-lg text-black">Users</h2>}
							{users.map((user) => (
								<CardUser key={user.id} user={user} />
							))}
						</>
					)}
					{!series?.length && searchInput?.length <= 1 && (
						<div className="flex items-center justify-center w-full h-full">
							<div className="flex flex-col items-center gap-4 opacity-25">
								<MagnifyingGlass size={120} />
								<span className="text-lg font-bold text-center">Search something</span>
							</div>
						</div>
					)}
					{!series?.length && !users?.length && searchInput?.length > 1 && (
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
