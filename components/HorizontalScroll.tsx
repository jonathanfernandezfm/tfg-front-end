import { CaretLeft, CaretRight } from 'phosphor-react';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

interface HorizontalScrollProps {
	children?: ReactElement | ReactElement[];
	className?: string;
}

const HorizontalScroll = ({ children, className }: HorizontalScrollProps) => {
	const myRef = useRef(null);
	const [scrolled, setScrolled] = useState(0);

	const executeScrollRight = () => {
		if (!myRef.current) return;
		myRef.current.scroll({
			left: myRef.current.scrollLeft + 1000,
			behavior: 'smooth',
		});
	};
	const executeScrollLeft = () => {
		if (!myRef.current) return;
		myRef.current.scroll({
			left: myRef.current.scrollLeft - 1000,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		myRef.current.addEventListener('scroll', () => setScrolled(myRef.current.scrollLeft));

		return () => {
			if (!myRef.current) return;
			myRef.current.removeEventListener('scroll', () => () => setScrolled(myRef.current.scrollLeft));
		};
	}, []);

	return (
		<div className="relative ">
			<div className={`flex gap-4 py-4 overflow-x-scroll scrollbar-hide ${className}`} ref={myRef}>
				{children}

				{scrolled > 0 && (
					<button
						onClick={executeScrollLeft}
						className="absolute top-0 left-0 items-center justify-center hidden w-16 h-full cursor-pointer xl:flex focus:outline-none hover:bg-blue-gray-900 bg-opacity-10 hover:bg-opacity-70"
					>
						<div className="absolute z-0 w-full h-full opacity-20 bg-gradient-to-r from-blue-gray-800 to-transparent"></div>
						<CaretLeft size={38} className="text-white" weight="bold" />
					</button>
				)}
				<button
					onClick={executeScrollRight}
					className="absolute top-0 right-0 items-center justify-center hidden w-16 h-full cursor-pointer xl:flex focus:outline-none hover:bg-blue-gray-900 bg-opacity-10 hover:bg-opacity-70"
				>
					<div className="absolute z-0 w-full h-full opacity-20 bg-gradient-to-l from-blue-gray-800 to-transparent"></div>
					<CaretRight size={38} className="z-10 text-white" weight="bold" />
				</button>
			</div>
		</div>
	);
};

export default HorizontalScroll;
