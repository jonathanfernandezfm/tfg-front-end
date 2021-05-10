import React, { ReactElement } from 'react';

interface HorizontalScrollProps {
	children?: ReactElement | ReactElement[];
	className?: string;
}

const HorizontalScroll = ({ children, className }: HorizontalScrollProps) => {
	return <div className={`flex gap-4 overflow-x-scroll scrollbar-hide ${className}`}>{children}</div>;
};

export default HorizontalScroll;
