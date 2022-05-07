import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import queries from "../queries.js";
import { Link } from "react-router-dom";
import Like from "../components/Like.js";
import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";

const Dashboard = () => {
  const { isValidUser , user } = useContext(AuthContext);
  const dispatch = useDispatch();

  // let loggedInFlag = false;
  // if(isValidUser) {
  //   console.log("user uid: ",user.uid);
  //   loggedInFlag = true;
  // }
    
  // loggedInFlag===true && 
  let { loading, error, data } = useQuery(queries.FETCH_ITEMS, {
    fetchPolicy: "cache-and-network",
  });

  let cardData = null;
  let likedIdx = false;
  cardData = data && data.fetchItems && (
    <div className="flex items-stretch ">
      <ul className="grid sm:block md:grid md:block grid-cols-4 grid-rows-4 gap-4 items-center  flex items-stretch ">
        {data.fetchItems.map((items) => (
          <div key={items._id}
		  className="rounded-lg shadow-lg bg-white border-indigo-600 border-4 p-2 bg-transparent"
		  >
            <Link to={`/itemview/${items._id}`}>
              <li className=" h-96">
                <p className="font-medium text-3xl text-indigo-500 hover:text-blue-400 text-center font-sans">
                  {items.title}
                </p>
				<br />
                <p
                  className="
                  rounded-lg
                  shadow-lg
                  bg-white
                  max-w-sm
                  border-indigo-600
                  border-1"
                >
                <img
                  src={items.multiple_images_of_obj[0]}
                  className="w-30 h-30 bg-slate-100  h-64"
                />
				</p>
                <br />
                <h3 className="font-medium text-1xl text-indigo-500 hover:text-blue-400 text-center h-fit">
                  {items.description}
                </h3>
              </li>
            </Link>
            {items.likeDetails.map((likes, idx) => {
              if (isValidUser && likes.user_id === user.uid) {
                // PENDING: use session user_id to check condition
                likedIdx = true;
              }
            })}
            {likedIdx === false ? (
              <Like likeFlag="toLike" itemDataToLike={items} />
            ) : (
              <Like likeFlag="toUnlike" itemDataToLike={items} />
            )}
            {likedIdx = false}
          </div>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex-auto flex-col md:flex-row h-screen w-screen  bg-gradient-to-r from-cyan-200 to-indigo-300 font-sans">
      <div className="min-h-full">
        <header className="bg-gradient-to-r from-white-500 to-indigo-200">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-indigo-600 text-center ">Dashboard</h1>
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
