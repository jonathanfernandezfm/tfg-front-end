import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

export const Header = () => {
	const user = useSelector((state: State) => state.user);

	return (
		<>
			<div className="fixed top-0 left-0 z-40 justify-between hidden w-full h-14 bg-blue-gray-800 navbar shadow-upper xl:flex xl:justify-center">
				<div className="container flex items-center justify-between">
					<Link href="/home">
						<a>
							<img src="/icons/icon144_2.png" className="w-8 h-8 ml-10" />
						</a>
					</Link>
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
				</div>
			</div>
			<div className="hidden w-full h-14 xl:block"></div>
		</>
	);
};
