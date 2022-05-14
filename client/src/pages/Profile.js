import React, { useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import { useContext } from 'react';

export default function Profile() {
	const { user, isValidUser } = useContext(AuthContext);
	console.log(user);
	return (
		<div className="fixed flex items-center justify-center">
			<div className="flex items-center hidden sm:block " aria-hidden="true">
				<div className="py-5 flex inline-block  justify-center">
					<div className="border-t  border-gray-200" />
				</div>
			</div>

			<div className="min-h-full  mx-auto py-12 px-12  sm:px-6 lg:px-8">
				<div className="max-w-md   w-full space-y-8">
					<div>
						<div className="shadow overflow-hidden  sm:rounded-md">
							<div className="px-12 py-5 bg-white mx-auto content-center ">
								<div className="grid grid-cols-6  gap-6">
									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="first-name"
											className="block text-sm font-bold font-medium text-gray-700"
										>
											First name: {user.displayName.split(' ')[0]}
										</label>
									</div>

									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="last-name"
											className="block text-sm font-bold font-medium text-gray-700"
										>
											Last name: {user.displayName.split(' ')[1]}
										</label>
									</div>
									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="email-address"
											className="block text-sm pb-4 font-bold font-medium text-gray-700"
										>
											Email address: {user.email}
										</label>
									</div>

									<div className="col-span-6 sm:col-span-3">
										<label
											htmlFor="Phone Number"
											className="block text-sm font-bold font-medium text-gray-700"
										>
											Phone Number: {user.phoneNumber || 'NA'}
										</label>
									</div>
								</div>
								<label
									htmlFor="email-address"
									className="block text-sm flex justify-center py-8 font-bold font-medium text-gray-700"
								>
									Profile Pic:
								</label>
								<img className="flex justify-center mx-auto h-50 w-60" src={user.photoURL}></img>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
