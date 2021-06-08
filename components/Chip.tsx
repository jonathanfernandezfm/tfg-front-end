import React from 'react';

interface ChipProps {
	text: string;
}

const Chip = ({ text }: ChipProps) => {
	return <div className="p-1 text-xs font-bold rounded-sm bg-violet-200">{text}</div>;
};

export default Chip;
