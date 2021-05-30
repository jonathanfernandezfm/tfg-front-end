import { motion } from 'framer-motion';
import { CheckCircle, Info, XCircle } from 'phosphor-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../store/reducers/notificationsReducer';

const icons = {
	success: <CheckCircle className="text-green-700" size={24} />,
	info: <Info className="text-blue-500" size={24} />,
	error: <XCircle className="text-red-500" size={24} />,
};

const Notification = () => {
	const notification = useSelector((state: State) => state.notification);
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(hideNotification());
	};

	const borderColor = () => {
		if (notification.type)
			switch (notification.type) {
				case 'success':
					return 'border-green-700';
				case 'error':
					return 'border-red-500';
				case 'info':
					return 'border-blue-500';
				default:
					return 'border-indigo-500';
			}

		return 'border-indigo-500';
	};

	if (!notification) return null;
	return (
		<div className="absolute z-50 flex justify-center w-full bottom-10">
			<motion.div
				onClick={handleClick}
				className={`flex opacity-0  items-center gap-2 px-5 py-2 font-semibold text-center border-2  rounded-md shadow-md ${borderColor()}`}
				animate={{ y: -50, opacity: 1 }}
				transition={{
					type: 'spring',
					damping: 12,
					mass: 0.75,
					stiffness: 200,
				}}
			>
				{icons[notification.type]}
				{notification.text}
			</motion.div>
		</div>
	);
};

export default Notification;
