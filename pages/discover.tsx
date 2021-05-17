import React from 'react';
import Card from '../components/Card';
import HorizontalScroll from '../components/HorizontalScroll';
import Search from '../components/Search';

const SeriesTest = [
	{
		backdrop_path: '/6UH52Fmau8RPsMAbQbjwN3wJSCj.jpg',
		name: 'Invincible',
		id: 95557,
		popularity: 1856.148,
		vote_average: 8.9,
	},
	{
		backdrop_path: '/b0WmHGc8LHTdGCVzxRb3IBMur57.jpg',
		name: 'The Falcon and the Winter Soldier',
		id: 88396,
		popularity: 1789.883,
		vote_average: 7.9,
	},
	{
		backdrop_path: '/z59kJfcElR9eHO9rJbWp4qWMuee.jpg',
		name: 'The Flash',
		id: 60735,
		popularity: 1258.983,
		vote_average: 7.7,
	},
	{
		backdrop_path: '/mZjZgY6ObiKtVuKVDrnS9VnuNlE.jpg',
		name: 'The Good Doctor',
		id: 71712,
		popularity: 1200.31,
		vote_average: 8.6,
	},
	{
		backdrop_path: '/edmk8xjGBsYVIf4QtLY9WMaMcXZ.jpg',
		name: "Grey's Anatomy",
		id: 1416,
		popularity: 950.414,
		vote_average: 8.2,
	},
	{
		backdrop_path: '/wkyzeBBKLhSg1Oqhky5yoiFF2hG.jpg',
		name: 'Luis Miguel: The Series',
		id: 79008,
		popularity: 793.676,
		vote_average: 8,
	},
	{
		backdrop_path: '/ta5oblpMlEcIPIS2YGcq9XEkWK2.jpg',
		name: 'Lucifer',
		id: 63174,
		popularity: 733.554,
		vote_average: 8.5,
	},
	{
		backdrop_path: '/qZtAf4Z1lazGQoYVXiHOrvLr5lI.jpg',
		name: 'Riverdale',
		id: 69050,
		popularity: 726.697,
		vote_average: 8.6,
	},
	{
		backdrop_path: '/Wu8kh7oyvaIfkNyMJyJHCamh5L.jpg',
		name: 'Selena: The Series',
		id: 97180,
		popularity: 679.704,
		vote_average: 7.5,
	},
	{
		backdrop_path: '/suopoADq0k8YZr4dQXcU6pToj6s.jpg',
		name: 'Game of Thrones',
		id: 1399,
		popularity: 571.087,
		vote_average: 8.4,
	},
	{
		backdrop_path: '/uro2Khv7JxlzXtLb8tCIbRhkb9E.jpg',
		name: 'The Walking Dead',
		id: 1402,
		popularity: 544.796,
		vote_average: 8.1,
	},
	{
		backdrop_path: '/hNiGqLsiD30C194lci7VYDmciHD.jpg',
		name: "The Handmaid's Tale",
		id: 69478,
		popularity: 544.512,
		vote_average: 8.2,
	},
	{
		backdrop_path: '/5VltHQJXdmbSD6gEJw3R8R1Kbmc.jpg',
		name: 'Van Helsing',
		id: 65820,
		popularity: 519.687,
		vote_average: 6.9,
	},
	{
		backdrop_path: '/1i1N0AVRb54H6ZFPDTwbo9MLxSF.jpg',
		name: 'WandaVision',
		id: 85271,
		popularity: 494.49,
		vote_average: 8.4,
	},
	{
		backdrop_path: '/pPKiIJEEcV0E1hpVcWRXyp73ZpX.jpg',
		name: 'Superman & Lois',
		id: 95057,
		popularity: 485.278,
		vote_average: 8.3,
	},
	{
		backdrop_path: '/58PON1OrnBiX6CqEHgeWKVwrCn6.jpg',
		name: 'Fear the Walking Dead',
		id: 62286,
		popularity: 485.109,
		vote_average: 7.6,
	},
	{
		backdrop_path: '/fRYwdeNjMqC30EhofPx5PlDpdun.jpg',
		name: 'Legacies',
		id: 79460,
		popularity: 454.415,
		vote_average: 8.6,
	},
];

const Discover = () => {
	return (
		<>
			<img
				src="background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full h-3/4 -z-1 opacity-95"
			/>
			<div className="px-8 mt-16 mb-24 ">
				<Search />
				<h1 className="mt-8 text-4xl font-bold">Discover</h1>
				<HorizontalScroll className="mt-4">
					{SeriesTest.map((serie) => (
						<Card key={serie.id} serie={serie} />
					))}
				</HorizontalScroll>
			</div>
		</>
	);
};

export default Discover;