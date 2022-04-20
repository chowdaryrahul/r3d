import React, { useState, useEffect } from "react";
import firebaseApp, { firebaseAuth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  // const firebaseAuth = getAuth(firebaseApp);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log("User is signed in");
        setCurrentUser(user);
        setLoadingUser(false);
      } else {
        // User is signed out
        console.log("User is signed out");
      }
    });
  }, []);

  // if (loadingUser) {
  //   return (
  //     <div>
  //       <h1>Loading....Loading....Loading....Loading....Loading....</h1>
  //     </div>
  //   );
  // }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
