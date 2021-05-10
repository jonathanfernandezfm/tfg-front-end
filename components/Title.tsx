import React from 'react';

interface TitleProps {
	text: string;
}

export const Title = ({ text }: TitleProps) => {
	return <h1>{text}</h1>;
};

export default Title;
