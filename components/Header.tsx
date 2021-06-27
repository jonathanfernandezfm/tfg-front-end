import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChatCircleDots } from 'phosphor-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../store/reducers/authReducer';
import Search from './Search';

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
								<a
									className={`text-lg text-white ${
										router.asPath.includes('/home')
											? 'text-violet-400 font-bold'
											: 'hover:font-semibold hover:text-violet-300'
									}`}
								>
									Home
								</a>
							</Link>
							<Link href="/discover">
								<a
									className={`text-lg text-white ${
										router.asPath.includes('/discover')
											? 'text-violet-400 font-bold'
											: 'hover:font-semibold hover:text-violet-300'
									}`}
								>
									Discover
								</a>
							</Link>
							<Link href="/lists">
								<a
									className={`text-lg text-white ${
										router.asPath.includes('/lists')
											? 'text-violet-400 font-bold'
											: 'hover:font-semibold hover:text-violet-300'
									}`}
								>
									Lists
								</a>
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
							<Link href="/conversations">
								<ChatCircleDots
									size={26}
									className={`text-white cursor-pointer ${
										router.asPath.includes('/conversations')
											? 'text-violet-400 font-bold'
											: 'hover:font-semibold hover:text-violet-300'
									}`}
								/>
							</Link>
							<Link href="/profile">
								<div className="flex items-center gap-4 cursor-pointer">
									<div className="relative w-8 h-8 bg-gray-600 rounded-full shadow-md ring-2 ring-violet-500">
										<img
											src={`${
												user?.img
													? `/profile-img/avatar_m_${user?.img}.png`
													: '/profile-img/avatar_m_1.png'
											}`}
											alt=""
										/>
									</div>
									<span className="text-lg text-white hover:font-semibold hover:text-violet-300">
										@{user.username}
									</span>
								</div>
							</Link>
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
