import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { motion } from 'framer-motion';

interface ActiveLinkProps {
	children: ReactElement;
	href: string;
	secondaryLinks?: [string];
}

const ActiveLink = ({ children, href, secondaryLinks }: ActiveLinkProps) => {
	const { asPath } = useRouter();

	const active = asPath === href || secondaryLinks?.includes(asPath);

	const className = active ? 'active text-indigo-800' : '';
	const weight = active ? 'bold' : 'regular';

	return (
		<div className="relative">
			<Link href={href}>
				{React.cloneElement(children, {
					className: className || null,
					weight: weight,
				})}
			</Link>
			{active ? (
				<motion.img
					layoutId="navbar"
					src="navbar.svg"
					className="absolute w-4"
					alt=""
					style={{ bottom: '-17px', left: 'calc(50% - 8px)' }}
					transition={spring}
				/>
			) : (
				''
			)}
		</div>
	);
};

const spring = {
	type: 'spring',
	stiffness: 500,
	damping: 30,
};

export default ActiveLink;
