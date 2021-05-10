import React from 'react';
import { UserPlus, LockKey, EnvelopeSimple } from 'phosphor-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Link from 'next/link';

const Login = () => {
	return (
		<>
			<img src="background.svg" alt="background" className="absolute top-0 w-full -z-1 opacity-95" />
			<div className="grid px-8 mb-10 grid-rows-layout">
				<div className="flex flex-col justify-center">
					<h1 className="text-4xl font-bold text-center">Join the community</h1>
					<h2 className="mt-3 text-2xl text-center">and share your passion</h2>
				</div>
				<div className="">
					<Input
						icon={<EnvelopeSimple size={26} weight="bold" className="text-indigo-800" />}
						placeholder={'User'}
						type="email"
					/>
					<Input
						icon={<UserPlus size={26} weight="bold" className="text-indigo-800" />}
						placeholder={'User'}
						type="text"
						className="mt-3"
					/>

					<Input
						icon={<LockKey size={26} weight="bold" className="text-indigo-800" />}
						placeholder={'Password'}
						type="password"
						className="mt-3"
					/>
					<Input
						icon={<LockKey size={26} weight="bold" className="text-indigo-800" />}
						placeholder={'Password'}
						type="password"
						className="mt-3"
					/>
					<Button onClick={() => {}} text="Sign up" className="block m-auto mt-8" />
					<p className="mt-4 text-center">
						Already have an account?{' '}
						<Link href="/login">
							<span className="font-bold text-indigo-800">Log in</span>
						</Link>
					</p>
				</div>
			</div>
		</>
	);
};

export default Login;
