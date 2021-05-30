import React, { ReactNode } from 'react';
import NavBar from './NavBar';
import Notification from './Notification';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	console.log('LAYOUT');
	return (
		<div>
			{children}
			<Notification></Notification>
			<NavBar></NavBar>
		</div>
	);
};

export default Layout;
