import moment from 'moment';
import React, { useState } from 'react';

interface CardCommentProps {
	comment: any;
}

const CardComment = ({ comment }: CardCommentProps) => {
	const [showSpoiler, setShowSpoiler] = useState(false);
	if (!comment) return null;

	return (
		<div
			className={`flex p-4 gap-4 bg-violet-200 bg-center items-center rounded-md shadow-md xl:shadow-lg overflow-hidden xl:w-80 xl:h-48`}
		>
			<div className="w-16 h-16 bg-gray-600 rounded-full shadow-md ring-2 ring-violet-500">
				<img src="/avatar1.png" alt="" />
			</div>
			<div className="flex-1">
				<div className="flex items-end gap-2">
					<div className="font-bold">@{comment.user.userInfo.username}</div>
					<div className="text-sm text-gray-600">
						{moment(Number(comment.date)).format('DD/MM/YYYY hh:mm')}
					</div>
				</div>
				<div
					onClick={() => {
						setShowSpoiler(true);
					}}
					className={`mt-2 overflow-auto leading-6 break-words overflow-ellipsis ${
						comment.spoiler && !showSpoiler ? 'text-transparent blurry-text pointer' : ''
					}`}
				>
					{comment.message}
				</div>
			</div>
		</div>
	);
};

export default CardComment;
