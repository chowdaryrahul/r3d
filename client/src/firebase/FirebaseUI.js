import { useContext, useEffect } from "react";
import { AuthContext } from "./Auth";
import * as firebaseui from "firebaseui";
import firebaseApp, { firebaseAuth } from "./Firebase";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";

const SignIn = () => {
  // Initialize the FirebaseUI Widget using Firebase.
  const { user } = useContext(AuthContext);
  console.log(user);

  const { displayName, email } = user || "";

  // Initialize the FirebaseUI Widget using Firebase.
  const ui =
    firebaseui.auth.AuthUI.getInstance() ||
    new firebaseui.auth.AuthUI(firebaseAuth);

  useEffect(() => {
    if (displayName || email) {
      console.log("user present");
    }
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          console.log("UI Visible");
        },
      },
      signInSuccessUrl: "/",
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
      ],
      // Other config options...
    });
  }, []);
};
