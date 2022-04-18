import React, { useContext, useEffect } from "react";
import { AuthContext } from "../firebase/Auth";
import * as firebaseui from "firebaseui";
import firebaseApp, { firebaseAuth } from "../firebase/Firebase";
import { doSignInWithEmailAndPassword } from "../firebase/FirebaseFunctions";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";

const SignIn = () => {
  // Initialize the FirebaseUI Widget using Firebase.
  //   const firebaseAuth = getAuth(firebaseApp);
  console.log(firebaseApp);
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  // Initialize the FirebaseUI Widget using Firebase.
  //   var ui = new firebaseui.auth.AuthUI(firebaseAuth);
  const ui =
    firebaseui.auth.AuthUI.getInstance() ||
    new firebaseui.auth.AuthUI(firebaseAuth);

  useEffect(() => {
    ui.start("#firebaseui-auth-container", {
      signInSuccessUrl: "/",
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
      ],
      // Other config options...
    });
  }, []);
};
