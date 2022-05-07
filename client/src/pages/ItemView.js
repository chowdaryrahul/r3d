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

const ItemView = (props) => {
  const { isValidUser , user } = useContext(AuthContext);
  let { _id } = useParams();
  let { loading, error, data } = useQuery(queries.FETCH_ITEM, {
    fetchPolicy: "cache-and-network",
    variables: { _id: _id },
  });

  let itemData = null;
  let likedIdx = false;
  itemData = data && data.fetchItem && (
    <div  className="overflow-hidden">
		<div class="font-bold text-m mb-2 text-gray-700 text-base text-center">
        <p class="font-bold text-3xl mb-2 text-indigo-700 text-base text-center">
		{data.fetchItem.title}
		</p>
      <Carousel showArrows={true} showThumbs={false}>
        {data.fetchItem.multiple_images_of_obj.map((imgs, idx) => (
          <div key={idx}>
            <img src={imgs} />
          </div>
        ))}
      </Carousel>
		<p class="font-bold text-xl mb-2 text-gray-700 text-base">
      {data.fetchItem.likeDetails.map((likes, idx) => {
        if (isValidUser && likes.user_id === user.uid) {
          // PENDING: use session user_id to check condition
          likedIdx = true;
        }
      })}
      </p>
      {likedIdx === false ? (
        <Like likeFlag="toLike" itemDataToLike={data.fetchItem} />
      ) : (
        <Like likeFlag="toUnlike" itemDataToLike={data.fetchItem} />
      )}
      <br />
      <Comments itemDataForComm={data.fetchItem} />
		</div>	
    </div>
  );

  return <div className="flex-auto  overflow-scroll bg-gradient-to-r from-cyan-200 to-indigo-300 font-sans grid place-items-center h-screen">
      <div class="max-w-sm rounded shadow-lg">{itemData}</div>
    </div>;
};

export default ItemView;
