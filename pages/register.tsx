import React, { useEffect, useState } from 'react';
import { UserPlus, LockKey, EnvelopeSimple } from 'phosphor-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../graphql/mutations';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../store/reducers/notificationsReducer';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const Register = () => {
	const user = useSelector((state: State) => state.user);
	const router = useRouter();
	const dispatch = useDispatch();
	const [usernameError, setUsernameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordsError, setPasswordsError] = useState(false);

	const [register, result] = useMutation(REGISTER, {
		onCompleted: () => {
			dispatch(showNotification({ text: 'Registered', type: 'success' }));
			router.replace(`/login`);
		},
		onError: (error) => {
			if (error.graphQLErrors[0].message.includes('username')) {
				setUsernameError(true);
				dispatch(showNotification({ text: 'Username already in use', type: 'error' }));
			}
			if (error.graphQLErrors[0].message.includes('email')) {
				setEmailError(true);
				dispatch(showNotification({ text: 'Email already in use', type: 'error' }));
			}
		},
	});

	useEffect(() => {
		if (user && user.token) router.replace(`/home`);
	}, [result.data, user]);

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const email = event.target.email.value;
		const username = event.target.username.value;
		const password1 = event.target.password1.value;
		const password2 = event.target.password2.value;

		if (!email || email === '') {
			setEmailError(true);
			return dispatch(showNotification({ text: 'Email must be filled', type: 'error' }));
		}
		if (!username || username === '') {
			setUsernameError(true);
			return dispatch(showNotification({ text: 'Username must be filled', type: 'error' }));
		}
		if (!password1 || password1 === '' || !password2 || password2 === '') {
			setPasswordsError(true);
			return dispatch(showNotification({ text: 'Passwords must be filled', type: 'error' }));
		}
		if (password1 !== password2) {
			setPasswordsError(true);
			return dispatch(showNotification({ text: 'Passwords do not match', type: 'error' }));
		}

		register({ variables: { username, email, password: password1 } });
	};

	const hideErrors = () => {
		setEmailError(false);
		setUsernameError(false);
		setPasswordsError(false);
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
				className="grid px-8 m-auto mt-10 mb-10 gap-14 xl:gap-48 grid-rows-layout xl:container xl:grid-cols-2 xl:grid-rows-none xl:mb-24 xl:mt-16"
			>
				<div className="flex flex-col justify-center xl:order-last">
					<img src="register_image.svg" alt="" className="hidden p-6 xl:block" />
					<h1 className="text-4xl font-bold text-center xl:hidden">Join the community</h1>
					<h2 className="mt-3 text-2xl text-center xl:hidden">and share your passion</h2>
				</div>
				<form className="xl:mt-4" onSubmit={handleSubmit} onBlur={hideErrors} onFocus={hideErrors}>
					<h1 className="hidden text-4xl font-bold xl:block">Register</h1>
					<h2 className="hidden mt-4 text-xl xl:block">
						Already have an account?{' '}
						<Link href="/login">
							<a className="font-bold text-indigo-800">Login here</a>
						</Link>
					</h2>
					<label className="hidden mt-4 text-xl font-bold xl:block">Email</label>
					<Input
						name="email"
						icon={
							<EnvelopeSimple
								size={26}
								weight="bold"
								className={`${emailError ? 'text-red-500' : 'text-indigo-800'}`}
							/>
						}
						placeholder={'Email'}
						type="email"
						className="xl:mt-2"
						error={emailError}
					/>
					<label className="hidden mt-4 text-xl font-bold xl:block">Username</label>

					<Input
						name="username"
						icon={
							<UserPlus
								size={26}
								weight="bold"
								className={`${usernameError ? 'text-red-500' : 'text-indigo-800'}`}
							/>
						}
						placeholder={'User'}
						type="text"
						className="mt-3"
						error={usernameError}
					/>
					<label className="hidden mt-4 text-xl font-bold xl:block">Password</label>

					<Input
						name="password1"
						icon={
							<LockKey
								size={26}
								weight="bold"
								className={`${passwordsError ? 'text-red-500' : 'text-indigo-800'}`}
							/>
						}
						placeholder={'Password'}
						type="password"
						className="mt-3"
						error={passwordsError}
					/>
					<label className="hidden mt-4 text-xl font-bold xl:block">Repeat password</label>

					<Input
						name="password2"
						icon={
							<LockKey
								size={26}
								weight="bold"
								className={`${passwordsError ? 'text-red-500' : 'text-indigo-800'}`}
							/>
						}
						placeholder={'Repeat password'}
						type="password"
						className="mt-3"
						error={passwordsError}
					/>
					<Button
						loading={result.loading}
						type="submit"
						onClick={() => {}}
						text="Sign up"
						className="block m-auto mt-8 xl:mr-0"
					/>
					<p className="mt-4 text-center xl:hidden">
						Already have an account?{' '}
						<Link href="/login">
							<span className="font-bold text-indigo-800">Log in</span>
						</Link>
					</p>
				</form>
			</motion.div>
		</>
	);
};

export default Register;
