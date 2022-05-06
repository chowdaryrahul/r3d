import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import queries from "../queries.js";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Comments from "../components/Comments.js";
import Like from "../components/Like.js";

const ItemView = (props) => {
  let { _id } = useParams();
  let { loading, error, data } = useQuery(queries.FETCH_ITEM, {
    fetchPolicy: "cache-and-network",
    variables: { _id: _id },
  });

  let itemData = null;
  let likedIdx = false;
  itemData = data && data.fetchItem && (
    <div>
      <h2>{data.fetchItem.title}</h2>
      <Carousel showArrows={true} showThumbs={false}>
        {data.fetchItem.multiple_images_of_obj.map((imgs, idx) => (
          <div key={idx}>
            <img src={imgs} className="w-30 h-30 bg-slate-100" />
          </div>
        ))}
      </Carousel>
      {data.fetchItem.likeDetails.map((likes, idx) => {
        if (likes.user_id === "userid") {
          // PENDING: use session user_id to check condition
          likedIdx = true;
        }
      })}
      {likedIdx === false ? (
        <Like likeFlag="toLike" itemDataToLike={data.fetchItem} />
      ) : (
        <Like likeFlag="toUnlike" itemDataToLike={data.fetchItem} />
      )}
      <br />
      <Comments itemDataForComm={data.fetchItem} />
    </div>
  );

  return <div>{itemData}</div>;
};

export default ItemView;
