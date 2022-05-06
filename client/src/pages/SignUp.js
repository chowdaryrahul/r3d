import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import { doCreateUserWithEmailAndPassword } from "../firebase/FirebaseFunctions";

import { LockClosedIcon } from "@heroicons/react/solid";

const SignUp = () => {
  const { isValidUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { email, password, first_name, last_name } = e.target.elements;
    console.log(email.value, password.value, first_name.value, last_name.value);
    try {
      if (
        email.value &&
        password.value &&
        first_name.value &&
        last_name.value
      ) {
        await doCreateUserWithEmailAndPassword(
          email.value,
          password.value,
          `${first_name.value} ${last_name.value}`
        );
        //navigate to explore
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
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
          <div className="max-w-7xl mx-auto flex justify-center py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl flex justify-center font-bold text-gray-900">
              Register
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="w-full bg-grey-lightest">
                <div className="container mx-auto py-8">
                  <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
                    <div className="py-4 px-8 flex justify-center text-black text-xl border-b border-grey-lighter">
                      Create a new account
                    </div>
                    <div className="py-4 px-8">
                      <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
                        <div className="flex mb-4">
                          <div className="w-1/2 mr-1">
                            <label
                              className="block text-grey-darker text-sm font-bold mb-2"
                              htmlFor="first_name"
                            >
                              First Name
                            </label>
                            <input
                              className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                              id="first_name"
                              type="text"
                              placeholder="Your first name"
                              required
                            />
                          </div>
                          <div className="w-1/2 ml-1">
                            <label
                              className="block text-grey-darker text-sm font-bold mb-2"
                              htmlFor="last_name"
                            >
                              Last Name
                            </label>
                            <input
                              className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                              id="last_name"
                              type="text"
                              placeholder="Your last name"
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            htmlFor="email"
                          >
                            Email Address
                          </label>
                          <input
                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            id="email"
                            type="email"
                            placeholder="Your email address"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <input
                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            id="password"
                            type="password"
                            placeholder="Your secure password"
                            required
                          />
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignUp;
