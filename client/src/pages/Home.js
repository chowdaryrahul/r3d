import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import WebGL from "../utils/WebGL";

const Home = () => {
  // get projects from server
  if (WebGL.isWebGLAvailable()) {
    console.log("WebGL compatibility check -- Available");
  } else {
    console.log("WebGL compatibility check -- Un available");
  }

  
  return (
    <div className="mx-auto bg-white shadow-md overflow-hidden ">
      <NavBar />
      <div>
        <Outlet>{/** Content outlet */}</Outlet>
      </div>
    </div>
  );
};

export default Home;
