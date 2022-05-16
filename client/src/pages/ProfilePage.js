import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import { useMutation, useQuery } from "@apollo/client";
import queries from "../queries.js";
import { Link } from "react-router-dom";
import Page404 from "./Page404.js";

export default function ProfilePage() {
  const { isValidUser, user } = useContext(AuthContext);
  const { displayName, email } = user || "";

  let userUid = "";
  if (isValidUser) {
    userUid = user.uid;
  }

  let {
    loading: loadingFU,
    error: errorFU,
    data: dataFU,
  } = useQuery(queries.FETCH_USER, {
    fetchPolicy: "cache-and-network",
    variables: { _id: userUid },
  });

  let {
    loading: loadingPosts,
    error: errorPosts,
    data: dataPosts,
  } = useQuery(queries.FETCH_ITEMS_BY_USERID, {
    fetchPolicy: "cache-and-network",
    variables: { user_id: userUid },
  });

  let {
    loading: loadingLikes,
    error: errorLikes,
    data: dataLikes,
  } = useQuery(queries.FETCH_LIKES_BY_USERID, {
    fetchPolicy: "cache-and-network",
    variables: { user_id: userUid },
  });

  let {
    loading: loadingCmt,
    error: errorCmt,
    data: dataCmt,
  } = useQuery(queries.FETCH_CMT_BY_USERID, {
    fetchPolicy: "cache-and-network",
    variables: { user_id: userUid },
  });

  let aboutMe = "";
  if (isValidUser) {
    if (dataFU && dataFU.fetchUser) {
      aboutMe = dataFU.fetchUser.about_me;
    }
  }

  if (errorCmt || errorLikes || errorPosts || errorFU) {
    <Page404 />;
  } else {
    return (
      <div className="relative">
        <main className="relative profile-page">
          <section className="relative py-16 bg-blueGray-200">
            <div className=" container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
                <div className="px-6">
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                      {displayName}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      {email}
                    </div>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <Link
                        to={`/settings`}
                        className="text-blue-700 hover:text-blue-600"
                      >
                        Update Profile
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {dataLikes && dataLikes.fetchLikesByUserId
                              ? dataLikes.fetchLikesByUserId.length
                              : 0}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Likes
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {dataPosts && dataPosts.fetchItemByUserId
                              ? dataPosts.fetchItemByUserId.length
                              : 0}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Projects
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {dataCmt && dataCmt.fetchCmtByUserId
                              ? dataCmt.fetchCmtByUserId.length
                              : 0}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Comments
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          {aboutMe}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
