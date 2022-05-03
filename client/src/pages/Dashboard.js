import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import queries from "../queries.js";

const Dashboard = () => {
  const dispatch = useDispatch();

  let { loading, error, data } = useQuery(queries.FETCH_ITEMS, {
    fetchPolicy: "cache-and-network",
  });

  let cardData = null;
  if (data && data.fetchItems) {
    cardData = data.fetchItems.map((items) => (
      <div key={items._id}>
        <h4>{items._id}</h4>
        <h5>{items.title}</h5>
      </div>
    ));
  }
  // console.log(data);
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
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                {cardData}
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
