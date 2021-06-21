import { motion } from 'framer-motion';
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
						className="absolute top-0 items-center justify-center hidden w-16 h-full cursor-pointer left-4 xl:flex focus:outline-none"
					>
						<motion.div
							whileTap={{ scale: 0.95 }}
							whileHover={{ scale: 1.02 }}
							className="p-2 bg-indigo-700 rounded-full shadow-lg"
						>
							<CaretLeft size={38} className="text-white" weight="bold" />
						</motion.div>
					</button>
				)}
				<button
					onClick={executeScrollRight}
					className="absolute top-0 items-center justify-center hidden w-16 h-full cursor-pointer right-4 xl:flex focus:outline-none"
				>
					<motion.div
						whileTap={{ scale: 0.95 }}
						whileHover={{ scale: 1.02 }}
						className="p-2 bg-indigo-700 rounded-full shadow-lg"
					>
						<CaretRight size={38} className="z-10 text-white" weight="bold" />
					</motion.div>
				</button>
			</div>
		</div>
	);
};

export default HorizontalScroll;
