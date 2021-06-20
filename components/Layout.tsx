import { useSubscription } from '@apollo/client';
import { AnimateSharedLayout } from 'framer-motion';
import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { NEW_MESSAGE } from '../graphql/subscriptions';
import useDevice from '../hooks/useDevice';
import { receivedNewMessage } from '../store/reducers/messagesReducer';
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

	useSubscription(NEW_MESSAGE, {
		onSubscriptionData: (data) => {
			console.log(data.subscriptionData.data.newMessage);
			dispatch(receivedNewMessage(data.subscriptionData.data.newMessage));
			window.scroll({
				top: document.body.scrollHeight,
			});
		},
	});

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
