import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import { Link } from "react-router-dom";
import Like from "../components/Like.js";

const Card = (props) => {
  const { isValidUser, user } = useContext(AuthContext);
  let cardsItemsData = props.itemsDataInCard;

  let likedIdx = false;
  return (
    <div className="flex items-stretch ">
      <ul className="grid sm:block md:grid md:block grid-cols-4 grid-rows-4 gap-4 items-center  flex items-stretch ">
        {cardsItemsData.map((items) => (
          <div
            key={items._id}
            className="rounded-lg shadow-lg bg-white border-indigo-600 border-4 p-2 bg-transparent"
          >
            <Link to={`/itemview/${items._id}`}>
              <li className=" h-96">
                <p className="font-medium text-3xl text-indigo-500 hover:text-blue-400 text-center font-sans">
                  {items.title}
                </p>
                <br />
                <p
                  className="
                  rounded-lg
                  shadow-lg
                  bg-white
                  max-w-sm
                  border-indigo-600
                  border-1"
                >
                  <img
                    src={items.multiple_images_of_obj[0]}
                    className="w-30 h-30 bg-slate-100  h-64"
                  />
                </p>
                <br />
                <h3 className="font-medium text-1xl text-indigo-500 hover:text-blue-400 text-center h-fit">
                  {items.description}
                </h3>
              </li>
            </Link>
            {items.likeDetails.map((likes, idx) => {
              if (isValidUser && likes.user_id === user.uid) {
                // PENDING: use session user_id to check condition
                likedIdx = true;
              }
            })}
            {likedIdx === false ? (
              <Like likeFlag="toLike" itemDataToLike={items} />
            ) : (
              <Like likeFlag="toUnlike" itemDataToLike={items} />
            )}
            {(likedIdx = false)}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Card;
