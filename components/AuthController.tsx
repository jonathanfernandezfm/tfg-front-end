import { useLazyQuery } from '@apollo/client';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ME } from '../graphql/queries';
import { setUser } from '../store/reducers/userReducer';
import LoadingSpinner from './LoadingSpinner';

interface AuthControllerProps {
	children: ReactNode;
}

const AuthController = ({ children }: AuthControllerProps) => {
	const dispatch = useDispatch();
	const [me, { loading, data }] = useLazyQuery(ME);
	const user = useSelector((state: State) => state.user);

	useEffect(() => {
		const token = localStorage.getItem('user-token');

		if (data) {
			const dataUser = data.me;
			const userObject = {
				token: token,
				name: dataUser.userInfo.name,
				username: dataUser.userInfo.username,
				surname: dataUser.userInfo.surname,
				email: dataUser.userInfo.email,
				birthDate: dataUser.userInfo.birthDate,
				gender: dataUser.userInfo.gender,
				city: dataUser.userInfo.city,
			};

			console.log(userObject);
			dispatch(setUser(userObject));
		}

		if (!data && !user && token) {
			console.log('EXECUTING ME TO REFETCH USER');
			me();
		}
	}, [data]);

	if (loading && !user)
		return (
			<div className="flex items-center justify-center h-screen">
				<LoadingSpinner />
			</div>
		);

	return <div>{children}</div>;
};

export default AuthController;