import React from 'react';

const Profile = () => {
	return (
		<>
			<img
				src="background.svg"
				alt="background"
				className="absolute top-0 object-cover w-full h-1/2 -z-1 opacity-95"
			/>
			<div className="px-8 mt-16 mb-24 ">
				<div className="flex flex-col">
					<div className="flex justify-center mt-4 ">
						<div className="w-32 h-32 bg-gray-600 rounded-full"></div>
					</div>
					<span className="mt-6 text-2xl font-bold text-center">Name</span>
					<span className="mt-1 text-xl italic text-center">Surname</span>
				</div>
				<div className="mt-20">
					<div className="text-xl font-semibold">Information</div>
					<div className="px-6 py-5 mt-2 rounded-md shadow-md bg-violet-50">
						<div className="flex items-center gap-2">
							<span className="font-semibold">Email: </span>
							<div className="flex items-center w-full gap-4 ">jonathanfernandezfm@gmail.com</div>
						</div>
						<div className="flex items-center gap-2 mt-3">
							<span className="font-semibold">Birth date: </span>
							<div className="flex items-center w-full gap-4 ">jonathanfernandezfm@gmail.com</div>
						</div>
						<div className="flex items-center gap-2 mt-3">
							<span className="font-semibold">Gender: </span>
							<div className="flex items-center w-full gap-4 ">jonathanfernandezfm@gmail.com</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
