import React from 'react';
import { House, MagnifyingGlass, ListDashes, User } from 'phosphor-react';
import ActiveLink from './ActiveLink';

const NavBar = () => {
	return (
		<div className="fixed bottom-0 left-0 z-40 flex justify-between w-full px-12 py-4 bg-white navbar shadow-upper">
			<ActiveLink href="/home">
				<House size={26}></House>
			</ActiveLink>
			<ActiveLink href="/discover">
				<MagnifyingGlass size={26}></MagnifyingGlass>
			</ActiveLink>
			<ActiveLink href="/lists">
				<ListDashes size={26}></ListDashes>
			</ActiveLink>
			<ActiveLink href="/profile" secondaryLinks={['/register']}>
				<User size={26}></User>
			</ActiveLink>
		</div>
	);
};

export default NavBar;
