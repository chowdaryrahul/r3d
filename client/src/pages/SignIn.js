import React, { useContext, useEffect } from "react";
import { AuthContext } from "../firebase/Auth";
import * as firebaseui from "firebaseui";
import { firebaseAuth } from "../firebase/Firebase";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";

const SignIn = () => {
  const { currentUser } = useContext(AuthContext);

  // Initialize the FirebaseUI Widget using Firebase.
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

  return (
    <div className="flex-auto flex-col md:flex-row h-screen w-screen">
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">SignIn</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            {/* <h3>{firebaseAuth.currentUser.displayName}</h3> */}
            <div id="firebaseui-auth-container"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignIn;
