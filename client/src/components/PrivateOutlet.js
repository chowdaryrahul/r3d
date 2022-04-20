import { Navigate, Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import { firebaseAuth } from "../firebase/Firebase";

const PrivateOutlet = () => {
  const { currentUser } = useContext(AuthContext);
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  // return currentUser ? <Outlet /> : <Navigate to="/signin" />;
  return firebaseAuth.currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateOutlet;
