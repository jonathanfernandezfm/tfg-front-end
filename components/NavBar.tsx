import React, { useEffect, useState } from 'react';
import { House, MagnifyingGlass, ListDashes, User, ChatCircleDots } from 'phosphor-react';
import ActiveLink from './ActiveLink';
import { useSelector } from 'react-redux';

const NavBar = () => {
	const user = useSelector((state: State) => state.user);
	// const [keyboardOppened, setKeyboardOppened] = useState(false);

	// useEffect(() => {
	// 	window.addEventListener('resize', (event) => {
	// 		if (window.innerHeight < 600) setKeyboardOppened(true);
	// 		else if (keyboardOppened) setKeyboardOppened(false);
	// 	});

	// 	return () => {
	// 		window.removeEventListener('resize', (event) => {
	// 			if (window.innerHeight < 600) setKeyboardOppened(true);
	// 			else if (keyboardOppened) setKeyboardOppened(false);
	// 		});
	// 	};
	// }, []);

	// if (keyboardOppened) return null;
	return (
		<div className="fixed bottom-0 left-0 z-40 flex justify-between w-full px-12 py-4 bg-white navbar shadow-upper xl:hidden">
			<ActiveLink href="/home">
				<House size={26}></House>
			</ActiveLink>
			<ActiveLink href="/discover">
				<MagnifyingGlass size={26}></MagnifyingGlass>
			</ActiveLink>
			<ActiveLink href="/lists">
				<ListDashes size={26}></ListDashes>
			</ActiveLink>
			{user ? (
				<ActiveLink href="/conversations" secondaryLinks={['/conversations']}>
					<ChatCircleDots size={26}></ChatCircleDots>
				</ActiveLink>
			) : null}
			{user ? (
				<ActiveLink href="/profile" secondaryLinks={['/register']}>
					<User size={26}></User>
				</ActiveLink>
			) : (
				<ActiveLink href="/login" secondaryLinks={['/register']}>
					<User size={26}></User>
				</ActiveLink>
			)}
		</div>
	);
};

export default NavBar;
