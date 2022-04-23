import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Home = () => {
  // get projects from server

  return (
    <div className="mx-auto bg-white shadow-md overflow-hidden ">
      <NavBar />
      <div className="md:flex">
        <Outlet>{/** Content outlet */}</Outlet>
      </div>
    </div>
  );
};

export default Home;
