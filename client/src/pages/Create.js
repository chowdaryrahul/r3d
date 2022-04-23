import React from 'react';

const Create = () => {
	return (
		<div className="flex-auto flex-col md:flex-row h-full w-screen">
			<div className="min-h-full">
				<header className="bg-white shadow">
					<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold text-gray-900">Create</h1>
					</div>
				</header>
				<main>
					<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
						{/* Replace with your content */}

						<div className="px-4 py-6 sm:px-0">
							<div className="flex flex-col px-6 py-12 items-center border-4 border-dashed border-gray-200 rounded-lg h-96 ">
								<svg
									className="h-8 w-8 text-gray-500"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									{' '}
									<path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="13" r="3" />{' '}
									<path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h2m9 7v7a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />{' '}
									<line x1="15" y1="6" x2="21" y2="6" /> <line x1="18" y1="3" x2="18" y2="9" />
								</svg>
								<p className="text-2xl text-gray-800 "> Drop image to upload</p>
								<p className="mb-2 text-gray-800"> Or </p>
								<label className="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 ring-offset-2 ring-indigo-500">
									select Image
									<input type="file" name="file" multiple className="sr-only"></input>
								</label>
								<p className=" mb-4  px-4 py-6 text-xs text-gray-600">Image type : png,Jpeg,ico</p>
							</div>
							<form>
								<label className="mb-2 py-4 text-gray-600 flex flex-col text-3xl font-bold font-mono ">
									Basic Information
								</label>
								<label className=" mb-2 py-2 px-4 text-gray-600 text-xl font-medium font-mono ">
									Name of creator (Required):
								</label>
								<input
									className="mb-4 border-solid border-gray-300 border py-2 px-2 w-half  rounded text-gray-700"
									type="text"
									placeholder="name of the creator/customer"
									name="Name of creator"
								></input>
								<div>
									<div className="relative">
										<div className="absolute flex items-center ml-2 h-full">
											<svg
												className="h-5 w-6  text-gray-500"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
												/>
											</svg>
										</div>
										<input
											type="text"
											placeholder="Search by Home, Decor, Toys..."
											className="mb-4 px-12 py-3 w-half rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
										></input>
									</div>

									<div className="flex flex-cols">
										<p className="mb-4 py-4 px-4 text-gray-600 text-xl font-medium font-mono">
											Categories
										</p>

										{/* <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"> */}
										<div className="grid grid-cols-4 gap-4">
											<select className=" px-4 py-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
												<option value="">All Type</option>
												<option value="for-home">Home</option>
												<option value="for-gadgets">Gadgets</option>
												<option value="for-education">Education</option>
												<option value="for-fashion">fashion</option>
												<option value="for-toys/games">Toys/Games</option>
											</select>
											<select className="px-4 py-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
												<option value="">Fashion</option>
												<option value="for-Earings">Earings</option>
												<option value="for-cosmetic">Cosmetic Box</option>
												<option value="for-jwellery">Jwellery</option>
												<option value="for-accessories">Accesories</option>
												<option value="for-rings">Rings</option>
											</select>
											<select className="px-4 py-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
												<option value="">Home/Decor</option>
												<option value="for-Bathrrom">Bathrrom</option>
												<option value="for-knD"> Kitchen and Dinning </option>
												<option value="for-Organization">Organization</option>
												<option value="for-garden">garden</option>
												<option value="for-decor">Decor</option>
											</select>
											<select className=" px-4 py-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
												<option value="">Gadgets</option>
												<option value="for-camera">Camera</option>
												<option value="for-computer"> Computer parts </option>
												<option value="for-gamming">gaming</option>
												<option value="for-3dparts">3d printer parts</option>
												<option value="for-2dprints">2d prints</option>
											</select>
											<select className=" px-4 py-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
												<option value="">Toys/Games</option>
												<option value="for-fidgetspinner">Fidgte spinners</option>
												<option value="for-fidgetcube"> Fidget cube </option>
												<option value="for-Dice">Dice</option>
												<option value="for-puzzles">Puzzles</option>
												<option value="for-legoblocks"> Lego</option>
											</select>
											<select className=" px-4 py-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
												<option value="">Education</option>
												<option value="for-annimals">Animals</option>
												<option value="for-Science"> Science</option>
												<option value="for-organs">Organs</option>
												<option value="for-maths">Maths</option>
												<option value="for-engineering"> Engineering</option>
												<option value="for-arts">Arts</option>
											</select>
										</div>
									</div>
								</div>
							</form>
						</div>

						{/* /End replace */}
					</div>
				</main>
			</div>
		</div>
	);
};

export default Create;
