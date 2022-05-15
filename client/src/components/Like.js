import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import queries from "../queries.js";
import { AuthContext } from "../firebase/Auth";
import { HeartIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const Like = (props) => {
  const { isValidUser, user } = useContext(AuthContext);
  let itemToLike = props.itemDataToLike;
  const [likeImage] = useMutation(queries.LIKE_ITEM);
  const [unlikeImage] = useMutation(queries.UNLIKE_ITEM);

  let likeBody = null;
  if (isValidUser) {
    if (props.likeFlag == "toLike") {
      likeBody = (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            likeImage({
              variables: {
                _id: itemToLike._id,
                user_id: user.uid,
                user_name: user.displayName,
                totalLikes: itemToLike.totalLikes,
              },
            });
          }}
        >
          <button type="submit">
            <HeartIcon className="strokeWidth={2} h-8 hover:fill-red-300"></HeartIcon>
            {itemToLike.totalLikes}
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
                user_id: user.uid,
                user_name: user.displayName,
                totalLikes: itemToLike.totalLikes,
              },
            });
          }}
        >
          <button type="submit">
            <HeartIcon className="strokeWidth={2} border-none h-8 fill-red-500 hover:fill-red-300"></HeartIcon>
            {itemToLike.totalLikes}
          </button>
        </form>
      );
    }
  } else {
    likeBody = (
      <div>
        <Link to={`/signin`}>
          <button type="submit">
            <HeartIcon className="strokeWidth={2} h-7 hover:fill-red-300"></HeartIcon>
            {itemToLike.totalLikes}
          </button>
        </Link>
      </div>
    );
  }

  return <div>{likeBody}</div>;
};

export default Like;
