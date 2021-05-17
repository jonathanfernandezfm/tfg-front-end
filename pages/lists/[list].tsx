import { useRouter } from 'next/router';
import { ArrowLeft } from 'phosphor-react';
import React from 'react';
import { useSelector } from 'react-redux';

const List = () => {
	const router = useRouter();
	const { list } = router.query;

	const listSelected = useSelector((state: State) => state.lists.find((l) => l.id === Number(list)));

	const onBack = () => {
		router.back();
	};

	return (
		<>
			<img
				src="/background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full h-3/4 -z-1 opacity-95"
			/>
			<div className="px-8 mt-16 mb-24 ">
				<div className="flex items-center gap-4">
					<button onClick={onBack} className="focus:outline-none text-violet-50">
						<ArrowLeft size={28} />
					</button>
					<h1 className="text-4xl font-bold text-violet-50">{listSelected?.name}</h1>
				</div>
			</div>
		</>
	);
};

export default List;
