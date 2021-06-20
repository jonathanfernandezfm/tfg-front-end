import { useMutation } from '@apollo/client';
import { Switch } from '@headlessui/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_COMMENT } from '../graphql/mutations';
import { GET_COMMENTS } from '../graphql/queries';
import { addNewComment } from '../store/reducers/seriesReducer';

interface AddCommentProps {
	serie: String;
	setShowAddComment: (value: any) => void;
}

export const AddComment = ({ serie, setShowAddComment }: AddCommentProps) => {
	const [enabled, setEnabled] = useState(false);
	const dispatch = useDispatch();

	const [addComment] = useMutation(ADD_COMMENT, {
		refetchQueries: [{ query: GET_COMMENTS, variables: { serie: serie } }],
		onCompleted: (data) => {
			dispatch(addNewComment(data.addComment));
		},
		onError: (error) => {},
	});

	const handleCreate = (event: any) => {
		event.preventDefault();
		const message = event.target.message.value;
		if (!message || message === '') return;
		addComment({ variables: { serie, message, spoiler: enabled } });
		setShowAddComment(false);
	};
	return (
		<>
			<div
				className={`p-4 gap-4 bg-violet-50 bg-center items-center rounded-md shadow-md xl:shadow-lg overflow-hidden xl:w-80 xl:h-48`}
			>
				<form onSubmit={handleCreate}>
					<motion.div layout="position" className="">
						<textarea
							maxLength={140}
							name="message"
							placeholder="Message"
							className="w-full h-20 p-2 text-black rounded-md focus:outline-none focus-within:ring-4 ring-violet-300"
						/>
						<div className="flex mt-2">
							<div className="flex items-center gap-2">
								<label className="mt-1 font-semibold">Spoiler</label>
								<Switch
									checked={enabled}
									onChange={setEnabled}
									className={`${enabled ? 'bg-violet-600' : 'bg-violet-400'}
							relative inline-flex flex-shrink-0 h-7 mt-2 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
								>
									<span className="sr-only">Use setting</span>
									<span
										aria-hidden="true"
										className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
							pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
									/>
								</Switch>
							</div>
							<div className="flex items-end justify-end w-full gap-2 text-right">
								<button
									type="submit"
									className="items-end px-4 py-2 font-semibold text-white rounded-md bg-violet-500 focus:ring-4 focus:ring-violet-500 focus:outline-none"
								>
									Send
								</button>
							</div>
						</div>
					</motion.div>
				</form>
			</div>
		</>
	);
};
