import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import queries from "../queries.js";
import React, { useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import Card from "../components/Card.js";
import Page404 from "./Page404.js";
import { useSubscription } from "@apollo/client";


const Dashboard = () => {
  const { isValidUser, user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [notify, setNotify] = useState('')
  const {
    data: updateData,
    error: updateError,
    loading: updateLoader,
  } = useSubscription(queries.NOTIFICATION);
  console.log(updateData)
  let { loading, error, data } = useQuery(queries.FETCH_ITEMS, {
    fetchPolicy: "cache-and-network",
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

  if (error) {
    return <Page404 />;
  }

  return (
    <div className="flex-auto flex-col md:flex-row h-screen w-screen  font-sans overflow-scroll">
    <div className="min-h-full">
      <header className="bg-gradient-to-r from-white-500 to-indigo-200">
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
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"> */}
            {cardData}
            {/* </div> */}
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  </div>
);
};

export default Dashboard;
