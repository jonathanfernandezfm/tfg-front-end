import { useQuery } from '@apollo/client';
import { Disclosure } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ArrowLeft, CaretDown } from 'phosphor-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card';
import HorizontalScroll from '../../components/HorizontalScroll';
import { GET_PERSON, GET_PERSON_SERIES } from '../../graphql/queries';
import { selectPerson, setPersonSeries } from '../../store/reducers/personsReducer';

const Person = () => {
	const router = useRouter();
	const { person } = router.query;
	const dispatch = useDispatch();

	const { loading } = useQuery(GET_PERSON_SERIES, {
		variables: { id: person },
		onCompleted: (data) => {
			dispatch(setPersonSeries(data.getPersonSeries));
		},
		onError: (errors) => {
			console.error('errors', errors);
			router.replace('/lists');
		},
	});

	useQuery(GET_PERSON, {
		variables: { id: person },
		onCompleted: (data) => {
			dispatch(selectPerson(data.getPersonDetails));
		},
		onError: (errors) => {
			console.error('errors', errors);
			router.replace('/lists');
		},
	});

	const personSelected = useSelector((state: State) => state.persons.selected_person);
	const personSeries = useSelector((state: State) => state.persons.selected_person_series);

	const onBack = () => {
		router.back();
	};

	return (
		<>
			<motion.img
				layoutId="background"
				src="/background.svg"
				alt="background"
				className="absolute top-0 items-center object-cover w-full h-1/2 -z-1 opacity-95 xl:hidden"
			/>

			<div className="mt-12 mb-20 rounded-md xl:container xl:m-auto xl:mt-12 xl:mb-20 xl:px-40">
				<div className="flex items-center gap-4 px-8">
					<button
						onClick={onBack}
						className="focus:outline-none text-violet-50 xl:flex xl:gap-2 xl:text-lg xl:text-black"
					>
						<ArrowLeft size={28} />
						<span className="hidden font-bold xl:block">Back</span>
					</button>
				</div>
				<img
					src={`${process.env.IMAGES_URL_ORIGINAL}${personSelected?.profile_path}`}
					className="object-cover m-auto mt-8 shadow-lg rounded-xl w-44 ring-2 ring-indigo-500 xl:w-52"
				/>

				<div className="px-8 xl:text-lg">
					<h2 className="mt-10 text-4xl font-bold text-center xl:text-4xl xl:mt-8">{personSelected?.name}</h2>
					{personSelected?.imdb_id && (
						<div className="flex justify-center mt-4 font-semibold">
							<motion.a
								whileTap={{ scale: 0.95 }}
								whileHover={{ scale: 1.02 }}
								href={`https://www.imdb.com/name/${personSelected?.imdb_id}`}
								target="_blank"
								className="m-auto "
							>
								<img src="/imdb.svg" alt="imdb logo" className="w-16 " />
							</motion.a>
						</div>
					)}
					<div className="mt-2 font-semibold">
						Gender: <span className="font-normal">{personSelected?.gender === 1 ? 'Female' : 'Male'}</span>
					</div>
					<div className="mt-2 font-semibold">
						Department: <span className="font-normal">{personSelected?.known_for_department}</span>
					</div>
					<div className="mt-2 font-semibold">
						Birth: <span className="font-normal">{personSelected?.place_of_birth}</span>
					</div>
					<Disclosure as="div" className="mt-4">
						{({ open }) => (
							<>
								<Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg xl:text-base text-violet-900 bg-violet-200 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
									<span className="text-base font-semibold">Biography</span>

									<CaretDown
										className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-violet-500`}
									/>
								</Disclosure.Button>

								<Disclosure.Panel className="pt-4 pb-2 text-base text-black xl:text-lg">
									{personSelected?.biography}
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>

					<div>
						<h1 className="mt-6 text-xl font-semibold">Series</h1>
						<HorizontalScroll>
							{personSeries && personSeries.map((serie: any) => <Card key={serie.id} serie={serie} />)}
						</HorizontalScroll>
					</div>
				</div>
			</div>
		</>
	);
};

export default Person;
