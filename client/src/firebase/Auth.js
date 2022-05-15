import React, { useState, useEffect } from "react";
import firebaseApp, { firebaseAuth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import queries from "../queries.js";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const [fetchUser, { error, data }] = useLazyQuery(queries.FETCH_USER, {
    fetchPolicy: "cache-and-network",
  });

  const [createUser, { loading }] = useMutation(queries.CREATE_USER);

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

        fetchUser({ variables: { _id: uid } });
      } else {
        console.log("User is signed out");
        setIsValid(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!error && data && data.fetchUser === null) {
      createUser({
        variables: {
          _id: currentUser.uid,
          userName: currentUser.displayName,
          email: currentUser.email,
        },
      });
    }
  }, [data]);

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
};;;
