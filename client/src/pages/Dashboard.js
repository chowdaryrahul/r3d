import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries.js';
import React from "react";
import Card from "../components/Card.js";
import Page404 from "./Page404.js";
import ReactPaginate from "react-paginate";
import "../App.css";
import { useSubscription } from "@apollo/client";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const [notify, setNotify] = useState('')
  const {
    data: updateData,
    error: updateError,
    loading: updateLoader,
  } = useSubscription(queries.NOTIFICATION);
  console.log(updateData)
  const [itemData, setitemData] = useState([]);
  const [pagenumber, setPageNumber] = useState(0);

	const itemperpage = 20;
	const pagecount = Math.ceil(itemData.length / itemperpage);

	let { loading, error, data } = useQuery(queries.FETCH_ITEMS, {
		fetchPolicy: 'cache-and-network',
	});

  let cardData = null;

  console.log("data: ", notify);
 
  cardData = data && data.fetchItems && (
    <Card itemsDataInCard={data.fetchItems} />
  );
  React.useEffect(()=>{
    if(updateData){
    console.log(updateData)
    setNotify(updateData.newPostNotify)
    }
    const timeout = setTimeout(() => {
        setNotify('')

    }, 3000);
    return () => clearTimeout(timeout);
  },[updateData])
  props.client
    .query({
      query: queries.FETCH_ITEMS,
    })
    .then((res) => {
      setitemData(res.data.fetchItems);
    });

  if (itemData.length !== 0) {
    cardData = (
      <Card
        itemsDataInCard={itemData.slice(
          pagenumber * itemperpage,
          pagenumber * itemperpage + itemperpage
        )}
      />
    );
  } else if ((itemData.length == 0)) {
    <Page404 />;
  }
  return (
    <div className="flex-auto flex-col md:flex-row h-full w-screen">
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {(updateData && notify) && (
            <div
              className="bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3"
              role="alert"
            >
              <span className="font-bold text-blue-800">
                {notify}
              </span>
               just added a Post
            </div>
          )}
            <h1 className="mt-1 text-4xl text-black-900 font-bold text-center ">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">{cardData}</div>
            <ReactPaginate
              class="pagination justify-content-center"
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pagecount}
              onPageChange={({ selected }) => {
                setPageNumber(selected);
              }}
              renderOnZeroPageCount={null}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
          {/* /End replace */}
      </main>
    </div>
  </div>
);
};

export default Dashboard;
