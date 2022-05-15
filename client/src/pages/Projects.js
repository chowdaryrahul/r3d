import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import queries from "../queries.js";
import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import Card from "../components/Card.js";
import Page404 from "./Page404.js";


const Projects = () => {
  const { isValidUser, user } = useContext(AuthContext);
  const dispatch = useDispatch();

  let userUid = "";
  if (isValidUser) {
    userUid = user.uid;
  }

  let { loading, error, data:dataItems } = useQuery(queries.FETCH_MULTIPLE_ITEM_BY_USERID, {
    fetchPolicy: "cache-and-network",
    variables: {userId: userUid}
  });
  console.log(dataItems)
  let cardData = null;

  cardData = dataItems && dataItems.fetchMultipleItemByUserId && (
    <Card itemsDataInCard={dataItems.fetchMultipleItemByUserId} />
  );

  if (error) {
    return <Page404 />;
  }



  return (
    <div className="flex-auto flex-col md:flex-row h-screen w-screen">
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              {cardData}
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;