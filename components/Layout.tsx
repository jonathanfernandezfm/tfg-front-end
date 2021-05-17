import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLists } from '../store/reducers/listsReducer';
import NavBar from './NavBar';

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getLists());
	}, [dispatch]);

	return (
		<div className="mb-14">
			{children}
			<NavBar></NavBar>
		</div>
	);
};

export default Layout;
