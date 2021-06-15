import { motion } from 'framer-motion';
import moment from 'moment';
import { useRouter } from 'next/router';
import { LockSimple } from 'phosphor-react';
import React from 'react';
import { useSelector } from 'react-redux';
import List from '../../components/List';
import { icons } from '../lists';

const User = () => {
	const router = useRouter();
	const { user } = router.query;

	const userSelected = useSelector((state: State) => state.users.selected_user);

	return (
		<>
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
				<div className="relative flex items-center justify-center gap-4 text-2xl font-bold text-center text-white transition-all bg-transparent">
					<h1 className="flex items-center gap-2 font-semibold">
						@{userSelected?.userInfo?.username ? userSelected.userInfo.username : 'Username'}
					</h1>
				</div>
				<div className="flex flex-col">
					<div className="flex justify-center mt-4 ">
						<div className="relative w-32 h-32 bg-gray-600 rounded-full shadow-md ring-8 ring-violet-500">
							<img src="/avatar1.png" alt="" />
						</div>
					</div>
					<span className="mt-6 text-2xl font-bold text-center">
						{userSelected?.userInfo?.name ? userSelected.userInfo.name : 'Name'}
					</span>
					<span className="mt-1 text-lg italic text-center">
						{userSelected?.userInfo?.surname ? userSelected.userInfo.surname : 'Surname'}
					</span>
				</div>
				<div className="mt-20">
					<div className="flex justify-evenly">
						<div className="p-2 text-center rounded-sm shadow-md bg-violet-100">
							<div className="text-lg font-bold">Followers</div>
							<div>{userSelected?.followersCount}</div>
						</div>
						<div className="p-2 text-center rounded-sm shadow-md bg-violet-100">
							<div className="text-lg font-bold">Following</div>
							<div>{userSelected?.followsCount}</div>
						</div>
					</div>
					<h2 className="mt-6 text-xl font-semibold">Information</h2>
					<div className="mt-4">
						{userSelected?.userInfo?.birthDate ? (
							<span className="font-semibold">
								Birth date:{' '}
								<span className="font-normal">
									{moment(Number(userSelected.userInfo.birthDate)).format('DD/MM/YYYY')}
								</span>
							</span>
						) : null}
					</div>
					<div className="mt-4">
						{userSelected?.userInfo?.gender ? (
							<span className="font-semibold">
								Gender: <span className="font-normal">{userSelected.userInfo.gender}</span>
							</span>
						) : null}
					</div>
					<div className="mt-4">
						{userSelected?.userInfo?.city ? (
							<span className="font-semibold">
								Location: <span className="font-normal">{userSelected.userInfo.city}</span>
							</span>
						) : null}
					</div>
				</div>
				{userSelected?.platforms && (
					<>
						<h2 className="mt-6 text-xl font-semibold">Platforms</h2>
					</>
				)}
				{userSelected?.lists && (
					<>
						<h2 className="mt-6 text-xl font-semibold">Lists</h2>
						<div className="mt-4">
							{userSelected?.lists.map((list: any) => {
								const icon = icons.find((i) => i.id === list.icon);
								return (
									<List id={list.id} icon={icon ? icon.value : null} name={list.name} key={list.id} />
								);
							})}
						</div>
					</>
				)}
			</motion.div>
		</>
	);
};

export default User;
