import { useMutation } from '@apollo/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'phosphor-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { UPDATE_USER } from '../../graphql/mutations';
import { showNotification } from '../../store/reducers/notificationsReducer';
import { updateUser } from '../../store/reducers/userReducer';

const EditProfile = () => {
	const router = useRouter();
	const user = useSelector((state: State) => state.user);
	const dispatch = useDispatch();

	const [updateUserData] = useMutation(UPDATE_USER, {
		onCompleted: (data) => {
			dispatch(updateUser(data.updateUser));
			router.push('/profile');
			dispatch(showNotification({ text: 'User updated', type: 'success' }));
		},
		onError: (error) => {},
	});

	const onBack = () => {
		router.back();
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const name = event.target.name.value;
		const surname = event.target.surname.value;
		const birthDate = event.target.birth.value;
		const gender = event.target.gender.value;
		const location = event.target.location.value;

		if (!name || name === '') return;

		updateUserData({ variables: { name, surname, birthDate, gender, city: location } });
	};

	return (
		<div>
			<motion.img
				layoutId="background"
				src="/background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full h-1/2 -z-1 opacity-95"
			/>

			<motion.div
				exit={{ opacity: 0 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="relative px-8 mt-16 mb-24 "
			>
				<div className="flex items-center gap-4 text-4xl font-bold text-white transition-all bg-transparent">
					<button onClick={onBack} className="focus:outline-none">
						<ArrowLeft size={28} />
					</button>
					<h1 className="font-semibold">Edit profile</h1>
				</div>

				<div className="mt-6">
					<form onSubmit={handleSubmit}>
						<div className="absolute right-0 mx-8 -top-2 focus:outline-none"></div>
						<div className="flex gap-6">
							<div className="flex items-center justify-center mt-4">
								<motion.div
									layoutId="profile-picture"
									className="relative w-20 h-20 bg-gray-600 rounded-full shadow-md ring-4 ring-violet-500"
								>
									<img src="/avatar1.png" alt="" />
								</motion.div>
							</div>
							<div className="">
								<label className="font-semibold">Name</label>
								<input
									name="name"
									defaultValue={user?.name ? user.name : ''}
									placeholder="Name"
									className="w-full p-2 mt-1 mb-1 text-black border-2 rounded-md border-violet-500 focus:outline-none focus-within:ring-4 ring-violet-300"
								/>
								<label className="font-semibold">Surname</label>
								<input
									name="surname"
									defaultValue={user?.surname ? user.surname : ''}
									placeholder="Surname"
									className="w-full p-2 mt-1 text-black border-2 rounded-md border-violet-500 focus:outline-none focus-within:ring-4 ring-violet-300"
								/>
							</div>
						</div>
						<div className="mt-4">
							<label className="font-semibold">Birth date</label>
							<input
								name="birth"
								defaultValue={user?.birthDate ? user.birthDate : ''}
								placeholder="Birth date"
								className="w-full p-2 mt-1 mb-4 text-black border-2 rounded-md border-violet-500 focus:outline-none focus-within:ring-4 ring-violet-300"
							/>
							<label className="font-semibold">Gender</label>
							<input
								name="gender"
								defaultValue={user?.gender ? user.gender : ''}
								placeholder="Gender"
								className="w-full p-2 mt-1 mb-4 text-black border-2 rounded-md border-violet-500 focus:outline-none focus-within:ring-4 ring-violet-300"
							/>
							<label className="font-semibold">Location</label>
							<input
								name="location"
								defaultValue={user?.location ? user.location : ''}
								placeholder="Location"
								className="w-full p-2 mt-1 text-black border-2 rounded-md border-violet-500 focus:outline-none focus-within:ring-4 ring-violet-300"
							/>
						</div>
						<div className="flex justify-end mt-6">
							<Button type="submit" text="Save" className="block " />
						</div>
					</form>
				</div>
				{/* <div className="mt-24">
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
					<div className="mt-6 text-xl font-semibold">Information</div>
					<div className="mt-4">
						<span className="mt-4 font-semibold">
							Email: <span className="font-normal">{user?.email}</span>
						</span>
					</div>
					<div className="mt-4">
						<span className="font-semibold">
							Birth date: <span className="font-normal">{'jonathanfernandezfm@gmail.com'}</span>
						</span>
					</div>
					<div className="mt-4">
						<span className="font-semibold">
							Gender: <span className="font-normal">{'jonathanfernandezfm@gmail.com'}</span>
						</span>
					</div>
				</div>
				<Button onClick={handleLogout} type="button" text="Log out" className="block m-auto mt-12" /> */}
			</motion.div>
		</div>
	);
};

export default EditProfile;
