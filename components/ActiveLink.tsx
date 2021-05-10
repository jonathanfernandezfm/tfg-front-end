import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import React, { ReactElement } from 'react';

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
		<Link href={href}>
			{React.cloneElement(children, {
				className: className || null,
				weight: weight,
			})}
		</Link>
	);
};

export default ActiveLink;
