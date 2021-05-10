import React from 'react';
import { UserPlus, LockKey } from 'phosphor-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Link from 'next/link';

const Login = () => {
	return (
		<>
			<img src="background.svg" alt="background" className="absolute top-0 w-full -z-1 opacity-95" />
			<div className="grid px-8 mt-10 mb-24 gap-14 grid-rows-layout">
				<div className="flex flex-col justify-center">
					<h1 className="text-4xl font-bold text-center">Welcome back</h1>
					<h2 className="mt-3 text-2xl text-center">updates are waiting for you</h2>
				</div>
				<div className="">
					<Input
						icon={<UserPlus size={26} weight="bold" className="text-indigo-800" />}
						placeholder={'User or email'}
						type="text"
					/>
					<Input
						icon={<LockKey size={26} weight="bold" className="text-indigo-800" />}
						placeholder={'Password'}
						type="password"
						className="mt-3"
					/>
					<Button onClick={() => {}} text="Log in" className="block m-auto mt-16" />
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
