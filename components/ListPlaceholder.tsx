import { Lock } from 'phosphor-react';
import React from 'react';

const ListPlaceholder = () => {
	return (
		<div className="flex items-center justify-center w-full h-12 gap-4 px-6 py-3 rounded-md shadow-md focus:outline-none xl:rounded-sm xl:px-10 xl:py-6 xl:text-xl xl:bg-violet-300 focus-within:ring-4 ring-violet-300 bg-violet-50">
			<Lock size={26} className="text-violet-500" />
		</div>
	);
};

export default ListPlaceholder;
