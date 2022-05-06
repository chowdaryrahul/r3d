import React, { useContext, useEffect } from "react";
import { AuthContext } from "../firebase/Auth";
import * as firebaseui from "firebaseui";
import { firebaseAuth } from "../firebase/Firebase";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/solid";

const SignIn = () => {
  const { isValidUser } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleSignUpRedirect = (e) => {
    navigate("/signup");
  };

  useEffect(() => {
    //@TODO create a logged in component
    if (isValidUser) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex-auto flex-col md:flex-row w-screen">
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

            <button
              onClick={handleSignUpRedirect}
              className="group relative mx-auto w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign up
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignIn;
