import { useSubscription } from '@apollo/client';
import { AnimateSharedLayout } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { NEW_MESSAGE } from '../graphql/subscriptions';
import { receivedNewMessage } from '../store/reducers/messagesReducer';
import { showNotification } from '../store/reducers/notificationsReducer';
import { Footer } from './Footer';
import { Header } from './Header';
import NavBar from './NavBar';
import Notification from './Notification';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const dispatch = useDispatch();
	const router = useRouter();

	useSubscription(NEW_MESSAGE, {
		onSubscriptionData: (data) => {
			dispatch(receivedNewMessage(data.subscriptionData.data.newMessage));
			if (router.asPath.includes('/conversations/' + data.subscriptionData.data.newMessage.from.id))
				window.scroll({
					top: document.body.scrollHeight,
				});
			else dispatch(showNotification({ text: `New message`, type: 'success' }));
		},
	});

	return (
		<AnimateSharedLayout>
			<div className="xl:min-h-screen xl:flex-col xl:flex">
				<Header />
				<div className="xl:flex-1">{children}</div>
				<Notification />
				<NavBar />
				<Footer />
			</div>
		</AnimateSharedLayout>
	);
};

export default Layout;
