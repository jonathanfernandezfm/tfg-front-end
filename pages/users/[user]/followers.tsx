import { useLazyQuery, useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'phosphor-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardUser from '../../../components/CardUser';
import { GET_FOLLOWERS } from '../../../graphql/queries';
import { setFollowers } from '../../../store/reducers/usersReducer';

const Followers = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { user } = router.query;

	const [getFollowers, { loading: loading }] = useLazyQuery(GET_FOLLOWERS, {
		variables: { id: user },
		onCompleted: (data) => {
			dispatch(setFollowers(data.getFollowers));
		},
	});

	const followers: any[] = useSelector((state: State) => {
		return state.users.followers;
	});

	const userSelected = useSelector((state: State) => state.users.selected_user);

	useEffect(() => {
		if (user) getFollowers();
	}, [user]);

	const onBack = () => {
		router.back();
	};

	return (
		<>
			<motion.img
				layoutId="background"
				src="/background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full h-1/2 -z-1 opacity-95"
			/>

			<div className="mt-16 mb-24 ">
				<div
					className={`font-bold px-8 sticky top-0 transition-all bg-transparent flex justify-start items-center gap-4 
						text-white text-4xl
					`}
				>
					<button onClick={onBack} className="focus:outline-none">
						<ArrowLeft size={28} />
					</button>
					{!loading ? (
						<>
							<h1 className="text-3xl font-semibold">
								Followers{' '}
								{/* <span className="text-xl text-violet-200">@{userSelected?.userInfo?.username}</span> */}
							</h1>
						</>
					) : (
						<div className="w-full h-10 rounded-md animate-pulse bg-violet-300"></div>
					)}
				</div>
				<div className="px-8 mt-8">
					{followers?.map((f) => (
						<CardUser key={f.id} user={f} type="user" href="/users" />
					))}
				</div>
			</div>
		</>
	);
};

export default Followers;
