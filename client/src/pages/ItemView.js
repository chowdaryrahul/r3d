import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import queries from "../queries.js";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Comments from "../components/Comments.js";
import Like from "../components/Like.js";
import { AuthContext } from "../firebase/Auth";
import Page404 from "./Page404.js";

const ItemView = (props) => {
  const { isValidUser, user } = useContext(AuthContext);
  let { _id } = useParams();
  let { loading, error, data } = useQuery(queries.FETCH_ITEM, {
    fetchPolicy: "cache-and-network",
    variables: { _id: _id },
  });

  let itemData = null;
  let likedIdx = false;
  itemData = data && data.fetchItem && (
    <div className="">
      <header className="fmt-1 text-4xl text-black-900 text-center">
        {data.fetchItem.title}
      </header>
      <br />
      <Carousel
        showArrows={true}
        showThumbs={false}
        className="grid place-items-center"
      >
        {data.fetchItem.multiple_images_of_obj.map((imgs, idx) => (
          <div key={idx}>
            <img src={imgs} />
          </div>
        ))}
      </Carousel>

      <p className="font-bold text-xl mb-2 text-gray-700 text-base">
        {data.fetchItem.likeDetails.map((likes, idx) => {
          if (isValidUser && likes.user_id === user.uid) {
            likedIdx = true;
          }
        })}
      </p>
      <div>
        {likedIdx === false ? (
          <Like likeFlag="toLike" itemDataToLike={data.fetchItem} />
        ) : (
          <Like likeFlag="toUnlike" itemDataToLike={data.fetchItem} />
        )}
      </div>
      <Comments itemDataForComm={data.fetchItem} />
    </div>
  );

  if (error) {
    return <Page404 />;
  }

  return (
    <div className=" overflow-scroll grid place-items-center">
      <div>{itemData}</div>
    </div>
  );
};

export default ItemView;
