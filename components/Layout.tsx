import { AnimateSharedLayout } from 'framer-motion';
import React, { ReactNode } from 'react';
import useDevice from '../hooks/useDevice';
import NavBar from './NavBar';
import Notification from './Notification';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const { isMobile, isAndroid, isDesktop, isIos, isSSR } = useDevice();

	console.log({ isMobile, isAndroid, isDesktop, isIos, isSSR });
	return (
		<AnimateSharedLayout>
			{children}
			<Notification></Notification>
			{isMobile && <NavBar></NavBar>}
		</AnimateSharedLayout>
	);
};

export default Layout;
