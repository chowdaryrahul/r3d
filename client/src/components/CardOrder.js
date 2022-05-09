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
      <ul className="grid sm:block md:grid md:block grid-cols-1 grid-rows-1 gap-1 items-center  flex items-stretch ">
        {cardsItemsData.map((items) => (
          <div
            key={items._id}
            className="rounded-lg shadow-lg bg-white border-indigo-600 border-1 p-2 bg-transparent"
          >
            <Link to={`/itemview/${items._id}`}>
              <li className=" h-96">
                <p
                  className="
                  rounded-lg
                  shadow-lg
                  bg-white
                  max-w-sm
                  border-indigo-600
                  border-1 "
                >
                  <img
                    src={items.multiple_images_of_obj[0]}
                    className="w-30 h-64 bg-slate-100  h-64"
                  />
                </p>
                <br />
                <p className="font-medium text-1xl text-black-500 hover:text-blue-400 text-center font-sans">
                  {items.title}
                </p>
                <div>
                  <p className="font-medium text-1xl text-black-500 hover:text-blue-400 text-center h-fit">
                    Description:{items.description}
                  </p>
                </div>
                <p className="font-medium text-1xl text-black-500 hover:text-blue-400 text-center h-fit">
                  Price: {items.price}
                </p>
              </li>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Card;
