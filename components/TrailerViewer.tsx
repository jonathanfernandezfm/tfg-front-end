import React from 'react';

export const TrailerViewer = () => {
	return (
		<div className="hidden w-full px-12 xl:flex">
			<iframe
				width="1000"
				height="550"
				src="https://www.youtube.com/embed/oVzVdvGIC7U"
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			></iframe>
			<div className="flex-1 ml-8">
				<h1 className="text-4xl font-bold">Peaky blinders</h1>
				<div className="px-8 xl:px-2">
					<div className="flex flex-wrap gap-2 mt-6 xl:px-0">
						{/* {selectedSerie?.genres?.map((genre: any) => (
							<div key={genre.id} className="px-2 py-1 text-sm font-semibold rounded-sm bg-violet-200">
								{genre.name}
							</div>
						))} */}
					</div>
					<div className="mt-6 xl:px-0">
						<div className="text-lg font-semibold">
							5 seasons, 30 episodes, special content
							{/* {selectedSerie?.number_of_seasons} seasons, {selectedSerie?.number_of_episodes} episodes
							{selectedSerie?.seasons?.find((s: any) => s.season_number === 0) ? ', special content' : ''} */}
						</div>
						<div className="mt-2 text-lg font-semibold">
							Episode time: 60, 58 min.
							{/* <span className="font-normal">{selectedSerie?.episode_run_time?.join(', ')} min.</span> */}
						</div>

						<div className="mt-2 text-lg">
							A gangster family epic set in 1919 Birmingham, England and centered on a gang who sew razor
							blades in the peaks of their caps, and their fierce boss Tommy Shelby, who means to move up
							in the world.
						</div>
						{/* <div className="mt-2">{selectedSerie?.overview}</div> */}
					</div>
					<div className="mt-4 text-lg font-semibold xl:px-0">
						Status: <span className="font-normal">Returning Series</span>
						{/* Status: <span className="font-normal">{selectedSerie?.status}</span> */}
					</div>
					<div className="mt-2 text-lg font-semibold xl:px-0">
						Last air date: <span className="font-normal">2019-09-22</span>
						{/* Last air date: <span className="font-normal">{selectedSerie?.last_air_date}</span> */}
					</div>
					<div className="mt-2 text-lg font-semibold xl:px-0">
						In production: Yes
						{/* <span className="font-normal">{selectedSerie?.in_production ? 'Yes' : 'No'}</span> */}
					</div>
					<div className="mt-2 text-lg font-semibold">
						Created by: Steven Knight
						<span className="font-normal">
							{/* {selectedSerie?.created_by?.map((creator: any, index: number) => (
								<Link href="" key={creator.name}>
									<span className="font-bold text-indigo-800">
										{creator.name}
										{`${index === selectedSerie?.created_by?.length - 1 ? '' : ', '}`}
									</span>
								</Link>
							))} */}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
