import React, { useState } from "react";
import { AuthContext } from "../firebase/Auth";
import { useContext } from "react";



export default function Profile() {

   const { user, isValidUser } = useContext(AuthContext);
    console.log(user)
  return (
    <div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name: {user.displayName.split(" ")[0]}
                      </label>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name: {user.displayName.split(" ")[1]}
                      </label>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address: {user.email}
                      </label>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="Phone Number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number: {user.phoneNumber || "NA" }
                      </label>
                    </div>

                  </div>
                  <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Profile Pic:
                      </label>
                  <img src={user.photoURL}></img>
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
