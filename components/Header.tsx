import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../store/reducers/authReducer';

export const Header = () => {
	const user = useSelector((state: State) => state.user);
	const router = useRouter();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(removeUser());
		router.replace(`/login`);
	};

	return (
		<>
			<div className="fixed top-0 left-0 z-40 justify-between hidden w-full h-14 bg-blue-gray-800 navbar shadow-upper xl:flex xl:justify-center">
				<div className="container flex items-center justify-between">
					<div className="flex items-center">
						<Link href="/home">
							<a>
								<img src="/icons/icon144_2.png" className="w-8 h-8 ml-10" />
							</a>
						</Link>
						<div className="flex gap-10 ml-16">
							<Link href="/home">
								<a className="text-lg text-white">Home</a>
							</Link>
							<Link href="/discover">
								<a className="text-lg text-white">Discover</a>
							</Link>
							<Link href="/home">
								<a className="text-lg text-white">Lists</a>
							</Link>
						</div>
					</div>

					{!user && (
						<div className="flex items-center gap-2 mr-10">
							<Link href="/login">
								<a className="px-5 py-1.5 font-semibold cursor-pointer rounded-sm text-blue-gray-800 bg-violet-100 focus:ring-2 focus:ring-violet-400 focus:outline-none">
									Login
								</a>
							</Link>
							<Link href="/register">
								<a className="px-8 py-1.5 font-bold text-white bg-gradient-to-r from-violet-400 to-indigo-800 focus:ring-2 ring-violet-300 focus:outline-none rounded-sm">
									Sign up
								</a>
							</Link>
						</div>
					)}
					{user && (
						<div className="flex items-center gap-4">
							<span className="text-lg text-white">@{user.username}</span>
							<div className="relative w-8 h-8 bg-gray-600 rounded-full shadow-md ring-2 ring-violet-500">
								<img src="/avatar1.png" alt="" />
							</div>
							<button
								onClick={handleLogout}
								className="px-8 py-1.5 font-bold text-white bg-gradient-to-r from-violet-400 to-indigo-800 focus:ring-2 ring-violet-300 focus:outline-none rounded-sm"
							>
								Logout
							</button>
						</div>
					)}
				</div>
			</div>
			<div className="hidden w-full h-14 xl:block"></div>
		</>
	);
};
