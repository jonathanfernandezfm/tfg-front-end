import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearSeach } from '../store/reducers/searchReducer';
import { selectUser } from '../store/reducers/usersReducer';

interface CardUserProps {
	user: any;
}

const CardUser = ({ user }: CardUserProps) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const handleClick = () => {
		router.push(`/users/${user.id}`);
		dispatch(selectUser(user));
		dispatch(clearSeach());
		document.body.style.overflow = 'unset';
	};

	return (
		<motion.a
			whileTap={{ scale: 0.95 }}
			whileHover={{ scale: 1.02 }}
			onClick={handleClick}
			className="flex items-center gap-6 p-4 px-6 m-2 mt-0 rounded-md shadow-lg cursor-pointer bg-violet-50 "
		>
			<div className="relative w-16 h-16 bg-gray-600 rounded-full shadow-md ring-2 ring-violet-500">
				<img src="/avatar1.png" alt="" />
			</div>
			<div className="">
				<div className="font-bold">@{user.userInfo.username}</div>
				<div>
					{user.userInfo.name} <span className="text-sm italic">{user.userInfo.surname}</span>
				</div>
				<div>
					<span className="font-semibold">Followers: </span>
					{user.followersCount}
				</div>
			</div>
		</motion.a>
	);
};

export default CardUser;
