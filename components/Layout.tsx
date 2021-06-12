import { AnimateSharedLayout } from 'framer-motion';
import React, { ReactNode } from 'react';
import useDevice from '../hooks/useDevice';
import { Footer } from './Footer';
import { Header } from './Header';
import NavBar from './NavBar';
import Notification from './Notification';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const { isMobile, isAndroid, isDesktop, isIos, isSSR } = useDevice();

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
