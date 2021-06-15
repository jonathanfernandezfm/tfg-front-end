import { useMutation } from '@apollo/client';
import { Switch } from '@headlessui/react';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { UPDATE_USER } from '../../graphql/mutations';
import { showNotification } from '../../store/reducers/notificationsReducer';
import { updateUser } from '../../store/reducers/authReducer';

const EditProfile = () => {
	const router = useRouter();
	const user = useSelector((state: State) => state.user);
	const [enabled, setEnabled] = useState(false);
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

	useEffect(() => {
		if (user) setEnabled(user.public);
	}, [user]);

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const name = event.target.name.value;
		const surname = event.target.surname.value;
		const birthDate = event.target.birth.value;
		const gender = event.target.gender.value;
		const location = event.target.location.value;

		if (!name || name === '') return;

		updateUserData({ variables: { name, surname, birthDate, gender, city: location, public: enabled } });
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
								type="date"
								name="birth"
								defaultValue={
									user?.birthDate ? moment(Number(user.birthDate)).format('YYYY-MM-DD') : ''
								}
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
								className="w-full p-2 mt-1 mb-4 text-black border-2 rounded-md border-violet-500 focus:outline-none focus-within:ring-4 ring-violet-300"
							/>
							<div className="flex justify-between">
								<div>
									<label className="font-semibold">Public</label>
									<div className="py-2">
										<Switch
											checked={enabled}
											onChange={setEnabled}
											className={`${enabled ? 'bg-violet-600' : 'bg-violet-400'}
					relative inline-flex flex-shrink-0 h-7 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
										>
											<span className="sr-only">Use setting</span>
											<span
												aria-hidden="true"
												className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
					pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
											/>
										</Switch>
									</div>
								</div>
								<div className="mt-4">
									<Button type="submit" text="Save" className="block " />
								</div>
							</div>
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
