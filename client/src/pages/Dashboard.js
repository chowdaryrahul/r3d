import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import queries from "../queries.js";
import { Link } from "react-router-dom";
import Like from "../components/Like.js";
import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";

const Dashboard = () => {
  const dispatch = useDispatch();

  let { loading, error, data } = useQuery(queries.FETCH_ITEMS, {
    fetchPolicy: "cache-and-network",
  });

  let cardData = null;
  let likedIdx = false;
  cardData = data && data.fetchItems && (
    <div>
      <ul className="grid sm:block md:grid md:block grid-cols-4 grid-rows-4 gap-4 items-center">
        {data.fetchItems.map((items) => (
          <div key={items._id}>
            <Link to={`/itemview/${items._id}`}>
              <li className="hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm">
                <h2 className="group-hover:text-white font-semibold text-slate-900 text-center">
                  {items.title}
                </h2>
                <img
                  src={items.multiple_images_of_obj[0]}
                  className="w-30 h-30 bg-slate-100"
                />
              </li>
            </Link>
            {items.likeDetails.map((likes, idx) => {
              if (likes.user_id === "newUserID") {
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
    <div className="flex-auto flex-col md:flex-row h-screen w-screen">
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
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
