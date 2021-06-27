import Link from 'next/link';
import React from 'react';

export const Footer = () => {
	return (
		<footer className="justify-center hidden w-full bg-blue-gray-800 h-80 xl:flex">
			<div className="grid-cols-3 2xl:container xl:grid">
				<div className="flex items-center justify-center">
					<img src="/icons/icon144_2.png" alt="logo" className="w-28 h-28" />
				</div>
				<div className="mt-10 ml-10 ">
					<h1 className="text-4xl font-bold text-white">Seasons list</h1>
					<div className="flex mt-6 gap-14">
						<div className="flex flex-col gap-2">
							<a className="text-lg text-center text-white">About {'{page}'}</a>
							<a className="text-lg text-center text-white">Season list</a>
							<a className="text-lg text-center text-white">Season list</a>
							<a className="text-lg text-center text-white">Season list</a>
						</div>
						<div className="flex flex-col gap-2">
							<a className="text-lg text-center text-white">Season list</a>
							<a className="text-lg text-center text-white">Season list</a>
							<a className="text-lg text-center text-white">Season list</a>
							<a className="text-lg text-center text-white">Season list</a>
						</div>
						<div className="flex flex-col gap-2">
							<Link href="/privacy">
								<a className="text-lg text-center text-white">Privacy policy</a>
							</Link>
							<Link href="/tos">
								<a className="text-lg text-center text-white">Terms of use</a>
							</Link>
							<a className="text-lg text-center text-white">TMDB</a>
							<a className="text-lg text-center text-white">Season list</a>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center">
					<div className="flex flex-col items-center justify-center gap-8">
						<img src="/icons/icon144_2.png" alt="logo" className="w-10 h-10" />
						<div className="text-lg text-white">Seasons list</div>
					</div>
				</div>
			</div>
		</footer>
	);
};
