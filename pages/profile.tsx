import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { removeUser } from '../store/reducers/userReducer';

const Profile = () => {
	const user = useSelector((state: State) => state.user);
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		console.log(user);
		if (!user) router.replace(`/login`);
	}, [user]);

	const handleLogout = () => {
		dispatch(removeUser());
	};

	return (
		<>
			<img
				src="background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full h-1/2 -z-1 opacity-95"
			/>
			<div className="px-8 mt-16 mb-24 ">
				<div className="flex flex-col">
					<div className="flex justify-center mt-4 ">
						<div className="w-32 h-32 bg-gray-600 rounded-full"></div>
					</div>
					<span className="mt-6 text-2xl font-bold text-center">Name</span>
					<span className="mt-1 text-xl italic text-center">Surname</span>
				</div>
				<div className="mt-20">
					<div className="text-xl font-semibold">Information</div>
					<div className="mt-4">
						<span className="mt-4 font-semibold">Email: </span>
						<div className="px-6 py-4 mt-1 rounded-md shadow-md bg-violet-50">
							<div className="flex items-center gap-2">
								<div className="flex items-center w-full gap-4 ">{user?.email}</div>
							</div>
						</div>
					</div>
					<div className="mt-4">
						<span className="font-semibold">Birth date: </span>
						<div className="px-6 py-4 mt-1 rounded-md shadow-md bg-violet-50">
							<div className="flex items-center gap-2 ">
								<div className="flex items-center w-full gap-4 ">jonathanfernandezfm@gmail.com</div>
							</div>
						</div>
					</div>
					<div className="mt-4">
						<span className="font-semibold">Gender: </span>
						<div className="px-6 py-4 mt-1 rounded-md shadow-md bg-violet-50">
							<div className="flex items-center gap-2 ">
								<div className="flex items-center w-full gap-4 ">jonathanfernandezfm@gmail.com</div>
							</div>
						</div>
					</div>
				</div>
				<Button onClick={handleLogout} type="button" text="Log out" className="block m-auto mt-12" />
			</div>
		</>
	);
};

export default Profile;
