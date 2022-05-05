// client/src/components/UploadFile.jsx

import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import '../styles/CreatePage.css';

const GET_PHOTOS_QUERY = gql`
	query GetDetails {
		url
		name
		description
		category
	}
`;

const SINGLE_UPLOAD_MUTATION = gql`
	mutation SingleUpload($file: Upload!, $details: Details) {
		detailsUpload(file: $file, details: $details) {
			name
			description
		}
	}
`;

function UploadFile() {
	const [file, setFile] = useState(null);
	const [details, setDetails] = useState({
		name: '',
		description: '',
		category: '',
	});
	const [msg, setMsg] = useState('');
	const [uploadRequest, { loading, error }] = useMutation(SINGLE_UPLOAD_MUTATION);
	console.log(file);
	const uploadFile = async () => {
		setMsg('');
		if (!file) return;
		try {
			const res = await uploadRequest({
				variables: { file, details },
				refetchQueries: [{ query: GET_PHOTOS_QUERY }],
			});
			if (res.data) {
				setMsg('File upload!');
				setFile(null);
				setDetails({ name: '', description: '', category: '' });
				setTimeout(() => setMsg(''), 3000);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="flex flex-col px-4 py-4 items-center border-4 border-dashed border-gray-200 rounded-lg h-full ">
			<div className="px-2 py-2 sm:px-0">
				<div className="upload-form">
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
					<h3 style={{ color: 'green', textAlignLast: 'center', marginTop: '1em' }}>{msg}</h3>
					<p style={{ color: 'red', textAlignLast: 'center', marginTop: '1em' }}>
						{error?.message}
					</p>
					<input
						className=" border-solid border-gray-300 border py-2 px-2 w-half  rounded text-gray-700"
						type="text"
						value={details.name}
						placeholder="name"
						onChange={(e) => setDetails({ ...details, name: e.target.value })}
					/>
					<br />
					<input
						className=" border-solid border-gray-300 border py-2 px-2 w-half  rounded text-gray-700"
						type="text"
						placeholder="description"
						value={details.description}
						onChange={(e) => setDetails({ ...details, description: e.target.value })}
					/>
					<br />
					<select
						name="categories"
						value={details.category}
						onChange={(e) => setDetails({ ...details, category: e.target.value })}
					>
						<option value="">Select Categories</option>
						<option value="house">House</option>
						<option value="groceries">Groceries</option>
						<option value="schools">Schools</option>
					</select>
					<br />{' '}
					<input
						className="App-input"
						type="file"
						accept="image/png, image/gif, image/jpeg"
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<br />
					<button onClick={uploadFile}>Upload</button>
					<p>{loading && 'Uploading...'}</p>
				</div>
			</div>
		</div>
	);
}

export default UploadFile;
