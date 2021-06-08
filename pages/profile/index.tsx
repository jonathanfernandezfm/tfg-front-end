import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ImageSquare, PencilSimple } from 'phosphor-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { removeUser } from '../../store/reducers/userReducer';

const Profile = () => {
	const user = useSelector((state: State) => state.user);
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		// if (!user) router.replace(`/login`);
	}, [user]);

	const handleLogout = () => {
		dispatch(removeUser());
		router.replace(`/login`);
	};

	return (
		<>
			<motion.img
				layoutId="background"
				src="background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full h-1/2 -z-1 opacity-95"
			/>

			<motion.div
				exit={{ opacity: 0 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="relative px-8 mt-16 mb-24 "
			>
				<div className="relative flex items-center justify-center gap-4 text-2xl font-bold text-center text-white transition-all bg-transparent">
					<h1 className="font-semibold">@{user?.username ? user.username : 'Username'}</h1>
					<div className="absolute right-0">
						<Link href="/profile/edit">
							<PencilSimple size={28} className="text-white" />
						</Link>
					</div>
				</div>
				<div className="flex flex-col">
					<div className="flex justify-center mt-4 ">
						<motion.div
							layoutId="profile-picture"
							className="relative w-32 h-32 bg-gray-600 rounded-full shadow-md ring-8 ring-violet-500"
						>
							<img src="avatar1.png" alt="" />
							<button className="absolute right-0 p-2 bg-white rounded-full shadow-md focus:ring-2 hover:bg-violet-100 ring-violet-600 focus:outline-none bottom-1">
								<ImageSquare size={16} />
							</button>
						</motion.div>
					</div>
					<span className="mt-6 text-2xl font-bold text-center">{user?.name ? user.name : 'Name'}</span>
					<span className="mt-1 text-lg italic text-center">{user?.surname ? user.surname : 'Surname'}</span>
				</div>
				<div className="mt-20">
					<div className="flex justify-evenly">
						<div className="p-2 text-center rounded-sm shadow-md bg-violet-100">
							<div className="text-lg font-bold">Followers</div>
							<div>{2}</div>
						</div>
						<div className="p-2 text-center rounded-sm shadow-md bg-violet-100">
							<div className="text-lg font-bold">Following</div>
							<div>{2}</div>
						</div>
					</div>
					<h2 className="mt-6 text-xl font-semibold">Information</h2>
					<div className="mt-4">
						<span className="mt-4 font-semibold">
							Email: <span className="font-normal">{user?.email ? user.email : 'Email'}</span>
						</span>
					</div>
					<div className="mt-4">
						{user?.birthDate ? (
							<span className="font-semibold">
								Birth date: <span className="font-normal">{user.birthDate}</span>
							</span>
						) : (
							<span className="font-semibold">
								Birth date:{' '}
								<Link href="/profile/edit">
									<span className="font-bold text-indigo-800">Add birth date</span>
								</Link>
							</span>
						)}
					</div>
					<div className="mt-4">
						{user?.gender ? (
							<span className="font-semibold">
								Gender: <span className="font-normal">{user.gender}</span>
							</span>
						) : (
							<span className="font-semibold">
								Gender:{' '}
								<Link href="/profile/edit">
									<span className="font-bold text-indigo-800">Add gender</span>
								</Link>
							</span>
						)}
					</div>
					<div className="mt-4">
						{user?.city ? (
							<span className="font-semibold">
								Location: <span className="font-normal">{user.city}</span>
							</span>
						) : (
							<span className="font-semibold">
								Location:{' '}
								<Link href="/profile/edit">
									<span className="font-bold text-indigo-800">Add location</span>
								</Link>
							</span>
						)}
					</div>
				</div>
				<h2 className="mt-6 text-xl font-semibold">Platforms</h2>

				<Button onClick={handleLogout} type="button" text="Log out" className="block m-auto mt-12" />
			</motion.div>
		</>
	);
};

export default Profile;
