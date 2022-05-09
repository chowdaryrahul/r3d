import React, { useState, useEffect } from "react";
import firebaseApp, { firebaseAuth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const updateCurrentUser = (user) => {
    console.log(`User state updated in child- State ${user}`);
    setCurrentUser(user);
    setIsValid(false);
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user);
        const uid = user.uid;
        console.log("User is signed in");
        setCurrentUser(user);
        setIsValid(true);
      } else {
        // User is signed out
        console.log("User is signed out");
        setIsValid(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        userUpdate: updateCurrentUser,
        isValidUser: isValid,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
