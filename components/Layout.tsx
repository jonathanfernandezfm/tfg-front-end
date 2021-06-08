import { AnimateSharedLayout } from 'framer-motion';
import React, { ReactNode } from 'react';
import NavBar from './NavBar';
import Notification from './Notification';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	console.log('LAYOUT');
	return (
		<AnimateSharedLayout>
			{children}
			<Notification></Notification>
			<NavBar></NavBar>
		</AnimateSharedLayout>
	);
};

export default Layout;
