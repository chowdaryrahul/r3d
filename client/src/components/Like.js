import { useMutation } from "@apollo/client";
import React from "react";
import queries from "../queries.js";

const Like = (props) => {
  let itemToLike = props.itemDataToLike;
  const [likeImage] = useMutation(queries.LIKE_ITEM);
  const [unlikeImage] = useMutation(queries.UNLIKE_ITEM);

  let likeBody = null;
  if (props.likeFlag == "toLike") {
    likeBody = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          likeImage({
            variables: {
              _id: itemToLike._id,
              user_id: itemToLike.user_id,
              user_name: itemToLike.user_name,
              totalLikes: itemToLike.totalLikes,
            },
          });
        }}
      >
        <button type="submit">Like</button>
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
              user_id: itemToLike.user_id,
              user_name: itemToLike.user_name,
              totalLikes: itemToLike.totalLikes,
            },
          });
        }}
      >
        <button type="submit">Unlike</button>
      </form>
    );
  }

  return <div>{likeBody}</div>;
};

export default Like;
