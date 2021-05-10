import React, { ReactNode } from 'react';
import NavBar from './NavBar';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="mb-14">
			{children}
			<NavBar></NavBar>
		</div>
	);
};

export default Layout;
