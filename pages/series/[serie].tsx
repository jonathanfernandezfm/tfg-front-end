import { useQuery } from '@apollo/client';
import { Disclosure } from '@headlessui/react';
import { generateKeyPair } from 'crypto';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, CaretDown, CaretRight, Heart, Star } from 'phosphor-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card';
import CompanieCardPlatform from '../../components/CompanieCard';
import HorizontalScroll from '../../components/HorizontalScroll';
import PersonCard from '../../components/PersonCard';
import { GET_CAST, GET_RECOMENDATIONS, GET_SERIE } from '../../graphql/queries';
import { selectSerie, setSerieCast, setSerieRecomendations } from '../../store/reducers/seriesReducer';

const imageUrl = 'https://image.tmdb.org/t/p/w500';

const Serie = () => {
	const router = useRouter();
	const { serie } = router.query;

	const dispatch = useDispatch();
	const serieResult = useQuery(GET_SERIE, {
		variables: { id: serie },
	});
	const castResult = useQuery(GET_CAST, {
		variables: { id: serie },
	});
	const recomendationsResult = useQuery(GET_RECOMENDATIONS, {
		variables: { id: serie },
	});

	const selectedSerie = useSelector((state: State) => state.series.serie_selected);
	const selectedSerieCast = useSelector((state: State) => state.series.serie_selected_cast);
	const selectedSerieRecomendations = useSelector((state: State) => state.series.serie_selected_recomendations);

	useEffect(() => {
		if (serieResult.data) {
			dispatch(selectSerie(serieResult.data.getSerie));
			console.log(serieResult.data.getSerie);
		}

		if (castResult.data) {
			dispatch(setSerieCast(castResult.data.getCast));
			console.log(castResult.data.getCast);
		}

		if (recomendationsResult.data) {
			dispatch(setSerieRecomendations(recomendationsResult.data.getRecomendations));
			console.log(recomendationsResult.data.getRecomendations);
		}
	}, [serieResult, castResult, recomendationsResult]);

	const onBack = () => {
		router.back();
	};

	if (!selectedSerie) return null;

	return (
		<div className="mb-20">
			<div
				className="relative w-full bg-center bg-no-repeat bg-cover h-96"
				style={{ backgroundImage: `url(${imageUrl}${selectedSerie.backdrop_path})` }}
			>
				<div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black to-transparent rounded-b-md"></div>
				<div className="flex justify-between px-8 pt-16 mb-24">
					<div className="flex items-center gap-4">
						<button onClick={onBack} className="focus:outline-none text-violet-50">
							<ArrowLeft size={28} />
						</button>
					</div>
					<div>
						<button onClick={onBack} className="focus:outline-none text-violet-50">
							<Heart size={28} />
						</button>
					</div>
				</div>
				<div className="absolute text-4xl font-black text-white bottom-6 left-8">
					<div className="flex gap-2 mb-2">
						{selectedSerie.networks.map((network: any) => (
							<div key={network.name} className="flex items-center w-12 h-6 p-2 rounded-md bg-indigo-50">
								<img src={`${imageUrl}${network.logo_path}`} alt="network_logo" />
							</div>
						))}
					</div>
					<div className="flex items-end">
						<span>{selectedSerie.name}</span>
						<span className="ml-2 text-xl font-semibold">
							({new Date(selectedSerie.first_air_date).getFullYear()})
						</span>
						<span className="flex items-center gap-1 mb-1 ml-2 text-white">
							<Star size={16} color="yellow" weight="fill" />
							<span className="text-sm font-normal">{selectedSerie.vote_average}</span>
						</span>
					</div>
				</div>
			</div>
			<div className="flex gap-2 px-8 mt-6">
				{selectedSerie.genres.map((genre: any) => (
					<div key={genre.id} className="px-2 py-1 text-sm font-semibold rounded-sm bg-violet-200">
						{genre.name}
					</div>
				))}
			</div>
			<div className="px-8 mt-6">
				<div className="font-semibold ">
					{selectedSerie.number_of_seasons} seasons, {selectedSerie.number_of_episodes} episodes,
					{selectedSerie.seasons.find((s: any) => s.season_number === 0) ? ' special content' : ''}
				</div>
				<div className="mt-2 font-semibold">
					Episode time: <span className="font-normal">{selectedSerie.episode_run_time.join(', ')} min.</span>
				</div>
				<div className="mt-2">{selectedSerie.overview}</div>
			</div>
			<div className="px-8 mt-4 font-semibold">
				Status: <span className="font-normal">{selectedSerie.status}</span>
			</div>
			<div className="px-8 mt-2 font-semibold">
				Last air date: <span className="font-normal">{selectedSerie.last_air_date}</span>
			</div>
			<div className="px-8 mt-2 font-semibold">
				In production: <span className="font-normal">{selectedSerie.in_production ? 'Yes' : 'No'}</span>
			</div>
			<div className="px-8 mt-2 font-semibold">
				Created by:{' '}
				<span className="font-normal">
					{selectedSerie.created_by.map((creator: any) => (
						<Link href="" key={creator.name}>
							<span className="font-bold text-indigo-800">{creator.name}</span>
						</Link>
					))}
				</span>
			</div>

			<h1 className="px-8 mt-6 text-xl font-semibold">Seasons</h1>
			<div className="w-full px-8 mx-auto mt-4 bg-white rounded-2xl">
				{selectedSerie.seasons.map((season: any, index: any) => (
					<Disclosure as="div" key={season.id} className="mt-2">
						{({ open }) => (
							<>
								<Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg text-violet-900 bg-violet-200 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
									<span className="font-semibold">
										{season.season_number === 0 ? 'Specials' : `Season ${index}`}
									</span>
									{season.overview && (
										<CaretDown
											className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-violet-500`}
										/>
									)}
									{!season.overview && <CaretRight className="w-5 h-5 text-violet-500" />}
								</Disclosure.Button>
								{season.overview && (
									<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-black">
										{season.overview}
										<div className="mt-1">
											<Link href="">
												<span className="font-bold text-indigo-800">View episodes</span>
											</Link>
										</div>
									</Disclosure.Panel>
								)}
							</>
						)}
					</Disclosure>
				))}
			</div>
			{!!selectedSerieCast && !!selectedSerieCast.length && (
				<div>
					<h1 className="px-8 mt-6 text-xl font-semibold">Cast</h1>
					<HorizontalScroll className="px-8 mt-4 ">
						{selectedSerieCast &&
							selectedSerieCast.map((person: any) => <PersonCard key={person.id} person={person} />)}
					</HorizontalScroll>
				</div>
			)}
			{!!selectedSerie.production_companies.length && (
				<div>
					<h1 className="px-8 mt-6 text-xl font-semibold">Production</h1>
					<HorizontalScroll className="px-8 mt-4 ">
						{selectedSerie &&
							selectedSerie.production_companies?.map((companie: any) =>
								companie.logo_path ? (
									<CompanieCardPlatform key={companie.id} companie={companie} />
								) : null
							)}
					</HorizontalScroll>
				</div>
			)}
			<hr className="mt-6"></hr>
			{!!selectedSerieRecomendations && !!selectedSerieRecomendations.length && (
				<div>
					<h1 className="px-8 mt-6 text-xl font-semibold">Recomendations</h1>
					<HorizontalScroll className="px-8 mt-4">
						{selectedSerieRecomendations &&
							selectedSerieRecomendations.map((serie: any) => <Card key={serie.id} serie={serie} />)}
					</HorizontalScroll>
				</div>
			)}
		</div>
	);
};

export default Serie;
