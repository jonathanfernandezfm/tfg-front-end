import Link from 'next/link';
import React from 'react';

export const Footer = () => {
	return (
		<footer className="justify-center hidden w-full bg-blue-gray-800 h-80 xl:flex">
			<div className="grid-cols-3 2xl:container xl:grid">
				<div className="flex items-center justify-center">
					<img src="/icons/icon144_2.png" alt="logo" className="w-28 h-28" />
				</div>
				<div className="mx-10 mt-10 ">
					<h1 className="text-4xl font-bold text-white">Seasons list</h1>
					<div className="flex mt-6 gap-14">
						<div className="flex flex-col items-start gap-2">
							<a className="text-lg text-center text-white cursor-pointer hover:font-semibold hover:text-violet-300">
								About us
							</a>
							<a className="text-lg text-center text-white cursor-pointer hover:font-semibold hover:text-violet-300">
								Contact us
							</a>
						</div>
						<div className="flex flex-col items-start gap-2">
							<Link href="/privacy">
								<a className="text-lg text-center text-white cursor-pointer hover:font-semibold hover:text-violet-300">
									Privacy policy
								</a>
							</Link>
							<Link href="/tos">
								<a className="text-lg text-center text-white cursor-pointer hover:font-semibold hover:text-violet-300">
									Terms of use
								</a>
							</Link>
							<Link href="https://www.themoviedb.org/">
								<a className="text-lg text-center text-white cursor-pointer hover:font-semibold hover:text-violet-300">
									TMDB
								</a>
							</Link>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center">
					<Link href="https://www.themoviedb.org/">
						<div className="flex flex-col items-center justify-center gap-8 cursor-pointer">
							<img src="/tmdb.svg" alt="logo" className="w-10 h-10" />
							<div className="text-lg text-white">The movie DB</div>
						</div>
					</Link>
				</div>
			</div>
		</footer>
	);
};
