import React from 'react';

export const TrailerViewer = () => {
	return (
		<div className="hidden w-full px-12 xl:flex">
			<video width="1000" controls>
				<source src="https://www.youtube.com/watch?v=oVzVdvGIC7U" type="video/mp4" />
				<source src="https://www.youtube.com/watch?v=oVzVdvGIC7U" type="video/ogg" />
				Your browser does not support HTML video.
			</video>
			<div>
				<div>whatever</div>
				<div>whatever</div>
				<div>whatever</div>
				<div>whatever</div>
			</div>
		</div>
	);
};
