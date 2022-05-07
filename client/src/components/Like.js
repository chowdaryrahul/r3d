import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import queries from "../queries.js";
import { AuthContext } from "../firebase/Auth";
// import ObjectId from "mongoose";
import mongoose from "mongoose";
import { HeartIcon } from "@heroicons/react/outline";

const Like = (props) => {
  const { isValidUser , user } = useContext(AuthContext);
  let itemToLike = props.itemDataToLike;
  const [likeImage] = useMutation(queries.LIKE_ITEM);
  const [unlikeImage] = useMutation(queries.UNLIKE_ITEM);

  let likeBody = null;
  if(isValidUser) {
  if (props.likeFlag == "toLike") {
    likeBody = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          likeImage({
            variables: {
              _id: itemToLike._id,
              // user_id: mongoose.Types.ObjectId(user.uid),
              user_id: user.uid,
              user_name: itemToLike.user_name,
              totalLikes: itemToLike.totalLikes,
            },
          });
        }}
      >
        <button type="submit">
		<HeartIcon class="fill-red-500 hover:fill-red-300"></HeartIcon>
          Like
		  </button>
      </form>
    );
  } else {
    likeBody = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          unlikeImage({
            variables: {
              _id: itemToLike._id,
              // user_id: mongoose.Types.ObjectId(user.uid),
              user_id: user.uid,
              user_name: itemToLike.user_name,
              totalLikes: itemToLike.totalLikes,
            },
          });
        }}
      >
        <button type="submit">
		<HeartIcon class="fill-red-500 hover:fill-red-300"></HeartIcon>
          Unlike
		  </button>
      </form>
    );
  }
} else {
  // Redirect to sign in page
  console.log("Not logged in");
}

  return <div>{likeBody}</div>;
};

export default Like;
