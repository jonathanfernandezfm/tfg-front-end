import React, { useEffect, useState } from 'react';
import { UserPlus, LockKey } from 'phosphor-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/reducers/authReducer';
import { showNotification } from '../store/reducers/notificationsReducer';
import { motion } from 'framer-motion';

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
				id: data.user.id,
				name: data.user.userInfo.name,
				username: data.user.userInfo.username,
				surname: data.user.userInfo.surname,
				email: data.user.userInfo.email,
				birthDate: data.user.userInfo.birthDate,
				gender: data.user.userInfo.gender,
				public: data.user.userInfo.public,
				city: data.user.userInfo.city,
				followsCount: data.user.followsCount,
				followersCount: data.user.followersCount,
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
			<motion.img
				layoutId="background"
				src="/background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full -z-1 opacity-95 xl:hidden"
			/>

			<motion.div
				exit={{ opacity: 0 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="grid px-8 mt-10 mb-24 xl:gap-48 gap-14 xl:m-auto xl:container xl:grid-cols-2 xl:grid-rows-none grid-rows-layout xl:my-16"
			>
				<div className="flex flex-col justify-center xl:justify-center xl:items-center">
					<img src="login_image.svg" alt="" className="hidden p-6 xl:block" />
					<h1 className="text-4xl font-bold text-center xl:hidden">Welcome back</h1>
					<h2 className="mt-3 text-2xl text-center xl:hidden">updates are waiting for you</h2>
				</div>
				<div className="h-full">
					<h1 className="hidden text-4xl font-bold xl:block">Login</h1>
					<h2 className="hidden mt-4 text-xl xl:block">
						Access your account. If you don't have an account{' '}
						<Link href="/register">
							<a className="font-bold text-indigo-800">Register here</a>
						</Link>
					</h2>
					<form
						onSubmit={handleSubmit}
						onBlur={() => {
							setError(false);
						}}
						onFocus={() => {
							setError(false);
						}}
						className="xl:mt-10"
					>
						<label className="hidden text-xl font-bold xl:block">Username / Email</label>
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
							className="xl:mt-2"
							error={error}
						/>
						<label className="hidden mt-8 text-xl font-bold xl:block">Password</label>
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
							className="mt-3 xl:mt-2"
							error={error}
						/>
						<Button
							loading={result.loading}
							type="submit"
							text="Log in"
							className="block m-auto mt-16 xl:mr-0"
						/>
					</form>
					<p className="mt-4 text-center xl:hidden">
						Don't have an account?{' '}
						<Link href="/register">
							<a className="font-bold text-indigo-800">Register</a>
						</Link>
					</p>
				</div>
			</motion.div>
		</>
	);
};

export default Login;
