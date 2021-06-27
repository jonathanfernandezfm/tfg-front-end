import React, { ForwardedRef, useEffect, useRef, useState } from 'react';

interface TitleProps {
	text: string;
	className?: string;
}

export const Title = ({ text, className }: TitleProps) => {
	const [isSticky, setSticky] = useState(false);
	const ref = useRef(null);

	const handleScroll = () => {
		if (ref.current) {
			setSticky(ref.current.getBoundingClientRect().top <= 0);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', () => handleScroll);
		};
	}, []);

	return (
		<h1
			className={`font-bold sticky bg-transparent  ${className} ${
				isSticky
					? 'bg-white py-4 text-black text-3xl z-20 shadow-lg px-8 sticky top-0 transition-all'
					: 'text-white text-4xl px-8 xl:text-black'
			}`}
			ref={ref}
		>
			{text}
		</h1>
	);
};

export default Title;
