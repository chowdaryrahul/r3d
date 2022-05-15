import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries.js';
import React, { useContext } from 'react';
import { AuthContext } from '../firebase/Auth';
import Card from '../components/Card.js';
import Page404 from './Page404.js';
import ReactPaginate from 'react-paginate';
import '../App.css';
import { get } from 'lodash';

const Dashboard = (props) => {
	const dispatch = useDispatch();
	const [itemData, setitemData] = useState([]);
	const [pagenumber, setPageNumber] = useState(0);

	const itemperpage = 20;
	const pagecount = Math.ceil(itemData.length / itemperpage);

	let { loading, error, data } = useQuery(queries.FETCH_ITEMS, {
		fetchPolicy: 'cache-and-network',
	});

	props.client
		.query({
			query: queries.FETCH_ITEMS,
		})
		.then((res) => {
			setitemData(res.data.fetchItems);
		});

	let cardData = null;
	if (itemData.length !== 0) {
		cardData = (
			<Card
				itemsDataInCard={itemData.slice(
					pagenumber * itemperpage,
					pagenumber * itemperpage + itemperpage
				)}
			/>
		);
	} else if ((itemData.length = 0)) {
		<Page404 />;
	}
	return (
		<div className="flex-auto flex-col md:flex-row h-screen w-screen  font-sans overflow-scroll">
			<div className="min-h-full">
				<header className="bg-gradient-to-r from-white-500 to-indigo-200">
					<div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
						<h1 className="mt-1 text-4xl text-black-900 font-bold text-center ">Dashboard</h1>
					</div>
				</header>
				<main>
					<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
						<div className="px-4 py-6 sm:px-0">{cardData}</div>
						<ReactPaginate
							className="pagination justify-content-center"
							previousLabel={'Previous'}
							nextLabel={'Next'}
							pageCount={pagecount}
							onPageChange={({ selected }) => {
								setPageNumber(selected);
							}}
							renderOnZeroPageCount={null}
							containerClassName={'paginationBttns'}
							previousLinkClassName={'previousBttn'}
							nextLinkClassName={'nextBttn'}
							disabledClassName={'paginationDisabled'}
							activeClassName={'paginationActive'}
						/>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
