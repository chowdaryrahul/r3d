import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import queries from "../queries.js";
import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import Card from "../components/Card.js";
import Page404 from "./Page404.js";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const Projects = (props) => {
  const { isValidUser, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [itemData, setitemData] = useState([]);
  const [pagenumber, setPageNumber] = useState(0);

  const itemperpage = 20;
  const pagecount = Math.ceil(itemData.length / itemperpage);

  let userUid = "";
  if (isValidUser) {
    userUid = user.uid;
    console.log("user id: ", userUid);
  }

  let { loading, error, data } = useQuery(queries.FETCH_ITEMS_BY_USERID, {
    fetchPolicy: "cache-and-network",
    variables: { user_id: userUid },
  });

  console.log("props is: ", props);
  props.client
    .query({
      query: queries.FETCH_ITEMS_BY_USERID,
      variables: { user_id: userUid },
    })
    .then((res) => {
      setitemData(res.data.fetchItemByUserId);
    });

  let cardData = null;
  if (itemData.length !== 0) {
    cardData = data && data.fetchItemByUserId && (
      <Card
        itemsDataInCard={itemData.slice(
          pagenumber * itemperpage,
          pagenumber * itemperpage + itemperpage
        )}
      />
    );
  }

  if (error) {
    return <Page404 />;
  }

  return (
    <div className="flex-auto flex-col md:flex-row h-screen w-screen overflow-scroll">
      <div className="h-96">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl flex flex-inline justify-center font-bold text-gray-900">
              Projects
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
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
            {/* /End replace */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
