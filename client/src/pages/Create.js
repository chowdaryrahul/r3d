import React from 'react';

const Create = () => {
	return (
		<div className="flex-auto flex-col md:flex-row h-screen w-screen">
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
							<div className="border-4 border-dashed items-center border-gray-200 rounded-lg h-96 ">
								<p class="text-2xl text-gray-800"> Drop image to upload</p>
								<p class="mb-2 text-gray-800"> Or </p>
								<label class="bg-gray px-4 h-9 inline-flex  items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 ring-offset-2 ring-indigo-500">
									select Image
									<input type="file" name="file" multiple class="sr-only"></input>
								</label>
								<p class="text-xs text-gray-600">Image type : png,Jpeg,ico</p>
							</div>
						</div>

						{/* /End replace */}
					</div>
				</main>
			</div>
		</div>
	);
};

export default Create;
