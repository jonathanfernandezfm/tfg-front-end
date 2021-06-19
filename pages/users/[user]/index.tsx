import { useLazyQuery, useMutation } from '@apollo/client';
import { motion } from 'framer-motion';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChatCircleDots, PencilSimple, UserCircleMinus, UserCirclePlus } from 'phosphor-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '../../../components/List';
import { FOLLOW, UNFOLLOW } from '../../../graphql/mutations';
import { GET_FOLLOWERS, GET_USER } from '../../../graphql/queries';
import { follow, selectUser, unfollow } from '../../../store/reducers/usersReducer';
import { icons } from '../../lists';

const User = () => {
	const router = useRouter();
	const { user } = router.query;
	const dispatch = useDispatch();
	const me = useSelector((state: State) => state.user);

	const [getUser] = useLazyQuery(GET_USER, {
		variables: { id: user },
		onCompleted: (data) => {
			if (!data.getUser) router.replace('/home');
			dispatch(selectUser(data.getUser));
		},
		onError: (errors) => {
			console.error('errors', errors);
			router.replace('/home');
		},
	});

	const [followUser] = useMutation(FOLLOW, {
		refetchQueries: [{ query: GET_FOLLOWERS, variables: { id: user } }],
		variables: { id: user },
		onCompleted: (data) => {
			dispatch(follow(data.follow));
		},
		onError: (errors) => {
			console.error('errors', errors);
		},
	});

	const [unfollowUser] = useMutation(UNFOLLOW, {
		refetchQueries: [{ query: GET_FOLLOWERS, variables: { id: user } }],
		variables: { id: user },
		onCompleted: (data) => {
			dispatch(unfollow(data.unfollow));
		},
		onError: (errors) => {
			console.error('errors', errors);
		},
	});

	const userSelected = useSelector((state: State) => state.users.selected_user);

	useEffect(() => {
		if (!userSelected && user) getUser();
		if (userSelected && me && userSelected.id === me.id) router.replace('/profile');
	}, [userSelected]);

	const handleFollow = () => {
		followUser();
	};
	const handleUnfollow = () => {
		unfollowUser();
	};

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
					<div className="absolute right-0">
						<Link href={`/conversations/${userSelected?.id}`}>
							<ChatCircleDots size={28} className="text-white" />
						</Link>
					</div>
				</div>
				<div className="flex flex-col">
					<div className="flex justify-center mt-4 ">
						<div className="relative w-32 h-32 bg-gray-600 rounded-full shadow-md ring-8 ring-indigo-500">
							<img src="/avatar1.png" alt="" />
						</div>
					</div>
					<span className="mt-6 text-2xl font-bold text-center">
						{userSelected?.userInfo?.name ? userSelected.userInfo.name : 'Name'}
					</span>
					<span className="mt-1 text-lg italic text-center">
						{userSelected?.userInfo?.surname ? userSelected.userInfo.surname : 'Surname'}
					</span>
					{userSelected?.isFollowed ? (
						<motion.button
							whileTap={{ scale: 0.95 }}
							whileHover={{ scale: 1.02 }}
							onClick={handleUnfollow}
							className="flex items-center justify-center gap-2 px-4 py-2 m-auto mt-4 font-bold text-white bg-red-600 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-red-400"
						>
							<UserCircleMinus size={22} />
							Unfollow
						</motion.button>
					) : (
						<motion.button
							whileTap={{ scale: 0.95 }}
							whileHover={{ scale: 1.02 }}
							onClick={handleFollow}
							className="flex items-center justify-center gap-2 px-4 py-2 m-auto mt-4 font-bold text-white bg-indigo-600 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-400"
						>
							<UserCirclePlus size={22} />
							Follow
						</motion.button>
					)}
				</div>
				<div className="mt-16">
					<div className="flex justify-evenly">
						<Link href={`${user}/followers`}>
							<motion.a
								whileTap={{ scale: 0.95 }}
								whileHover={{ scale: 1.02 }}
								className="p-2 text-center bg-indigo-100 rounded-sm shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-400"
							>
								<div className="text-lg font-bold">Followers</div>
								<div>{userSelected?.followersCount}</div>
							</motion.a>
						</Link>
						<Link href={`${user}/follows`}>
							<motion.a
								whileTap={{ scale: 0.95 }}
								whileHover={{ scale: 1.02 }}
								className="p-2 text-center bg-indigo-100 rounded-sm shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-400"
							>
								<div className="text-lg font-bold">Following</div>
								<div>{userSelected?.followsCount}</div>
							</motion.a>
						</Link>
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
				{!!userSelected?.platforms?.length && (
					<>
						<h2 className="mt-6 text-xl font-semibold">Platforms</h2>
					</>
				)}
				{userSelected?.lists?.length && (
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
