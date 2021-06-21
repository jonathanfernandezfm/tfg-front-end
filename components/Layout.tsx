import { useSubscription } from '@apollo/client';
import { AnimateSharedLayout } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { NEW_MESSAGE } from '../graphql/subscriptions';
import useDevice from '../hooks/useDevice';
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
	const { isMobile, isAndroid, isDesktop, isIos, isSSR } = useDevice();
	const dispatch = useDispatch();
	const router = useRouter();

	useSubscription(NEW_MESSAGE, {
		onSubscriptionData: (data) => {
			console.log(data.subscriptionData.data.newMessage);
			dispatch(receivedNewMessage(data.subscriptionData.data.newMessage));
			console.log(
				router.asPath.includes(
					'/conversations/' + data.subscriptionData.data.newMessage.from.id,
					data.subscriptionData.data.newMessage.from.id
				)
			);
			if (router.asPath.includes('/conversations/' + data.subscriptionData.data.newMessage.from.id))
				window.scroll({
					top: document.body.scrollHeight,
				});
			else dispatch(showNotification({ text: `New message`, type: 'success' }));
		},
	});

	// if(router.asPath)
	return (
		<AnimateSharedLayout>
			<div>
				<Header />
				{children}
				<Notification />
				<NavBar />
				<Footer />
			</div>
		</AnimateSharedLayout>
	);
};

export default Layout;
