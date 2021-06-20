import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearSeach } from '../store/reducers/searchReducer';
import { selectUser } from '../store/reducers/usersReducer';

interface CardUserProps {
	user: any;
	type: 'user' | 'chat';
	href: string;
}

const CardUser = ({ user, type, href }: CardUserProps) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const handleClick = () => {
		router.push(`${href}/${user.id}`);
		dispatch(selectUser(user));
		dispatch(clearSeach());
		document.body.style.overflow = 'unset';
	};

	return (
		<motion.a
			whileTap={{ scale: 0.95 }}
			whileHover={{ scale: 1.02 }}
			onClick={handleClick}
			className={`flex relative items-center gap-6 p-4 px-6 m-2 mt-0 rounded-md shadow-lg cursor-pointer bg-violet-50 ${
				type === 'chat' ? 'py-3 mx-0' : ''
			}`}
		>
			<div
				className={`relative  bg-gray-600 rounded-full shadow-md ring-2 ring-violet-500 ${
					type === 'chat' ? 'w-8 h-8' : 'w-16 h-16'
				}`}
			>
				<img src="/avatar1.png" alt="" />
			</div>
			<div className="">
				<div className={`font-bold ${type === 'chat' ? 'text-lg' : ''}`}>@{user.userInfo.username}</div>
				<div>
					{user.userInfo.name} <span className="text-sm italic">{user.userInfo.surname}</span>
				</div>
				<div>
					{type === 'user' && <span className="font-semibold">Followers: </span>}
					{/* {type === 'chat' && <span className="text-sm font-semibold text-gray-500">Hi how are you? </span>} */}
					{user.followersCount}
				</div>
				{/* {type === 'chat' && (
					<div className="absolute w-2 h-2 bg-indigo-800 rounded-full top-4 right-4 animate-ping"></div>
				)} */}
			</div>
		</motion.a>
	);
};

export default CardUser;
