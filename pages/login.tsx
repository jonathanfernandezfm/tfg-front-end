import React, { useEffect, useState } from 'react';
import { UserPlus, LockKey } from 'phosphor-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/reducers/userReducer';
import { showNotification } from '../store/reducers/notificationsReducer';

const Login = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector((state: State) => state.user);
	const [error, setError] = useState(false);

	const [login, result] = useMutation(LOGIN, {
		onCompleted: () => {
			setError(false);
		},
		onError: (error) => {
			setError(true);
			dispatch(showNotification({ text: 'Invalid credentials', type: 'error' }));
		},
	});

	useEffect(() => {
		console.log(user);
		if (user && user.token) router.replace(`/home`);
		else if (result.data) {
			const data = result.data.login;
			const userObject = {
				token: data.value,
				name: data.user.userInfo.name,
				username: data.user.userInfo.username,
				surname: data.user.userInfo.surname,
				email: data.user.userInfo.email,
				birthDate: data.user.userInfo.birthDate,
				gender: data.user.userInfo.gender,
				city: data.user.userInfo.city,
			};

			console.log(userObject);
			dispatch(setUser(userObject));
		}
	}, [result.data, user]);

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const username = event.target.user.value;
		const password = event.target.password.value;
		if (!username || username === '') return;
		login({ variables: { username, password } });
	};

	return (
		<>
			<img src="background.svg" alt="background" className="absolute top-0 w-full -z-1 opacity-95" />
			<div className="grid px-8 mt-10 mb-24 gap-14 grid-rows-layout">
				<div className="flex flex-col justify-center">
					<h1 className="text-4xl font-bold text-center">Welcome back</h1>
					<h2 className="mt-3 text-2xl text-center">updates are waiting for you</h2>
				</div>
				<div className="">
					<form
						onSubmit={handleSubmit}
						onBlur={() => {
							setError(false);
						}}
						onFocus={() => {
							setError(false);
						}}
					>
						<Input
							name="user"
							icon={
								<UserPlus
									size={26}
									weight="bold"
									className={`${error ? 'text-red-500' : 'text-indigo-800'}`}
								/>
							}
							placeholder={'User or email'}
							type="text"
							error={error}
						/>
						<Input
							name="password"
							icon={
								<LockKey
									size={26}
									weight="bold"
									className={`${error ? 'text-red-500' : 'text-indigo-800'}`}
								/>
							}
							placeholder={'Password'}
							type="password"
							className="mt-3"
							error={error}
						/>
						<Button type="submit" text="Log in" className="block m-auto mt-16" />
					</form>
					<p className="mt-4 text-center">
						Don't have an account?{' '}
						<Link href="/register">
							<span className="font-bold text-indigo-800">Register</span>
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default Login;
