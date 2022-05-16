import React, { useContext } from 'react';
import { AuthContext } from '../firebase/Auth';
import { Link } from 'react-router-dom';
import Like from '../components/Like.js';

const Card = (props) => {
	const { isValidUser, user } = useContext(AuthContext);
	let cardsItemsData = props.itemsDataInCard;

	let likedIdx = false;
	return (
    <div className="flex items-stretch ">
      <ul className="grid border-transparent sm:block md:grid md:block grid-cols-4 grid-rows-4 gap-y-2.5 gap-4 items-center  flex items-stretch ">
        {cardsItemsData.map((items) => (
          <div key={items._id} className="rounded-lg bg-white bg-transparent">
            <Link to={`/itemview/${items._id}`}>
              <li className=" h-50 gap-y-2.5">
                <span
                  className="
                  rounded-lg
                  shadow-lg
                  bg-white
                  max-w-sm
                  border-indigo-600
                  border-1
                  "
                >
                  <img
                    src={items.multiple_images_of_obj[0]}
                    className="h-80 rounded drop-shadow-3xl	 shadow-lg hover:shadow-indigo-500/40 bg-slate-100"
                    alt="presentation"
                  />
                </span>
                <br />
              </li>
            </Link>
            <div className="space-x-4  px-2 pb-4 lg:flex lg:space-x-28 ">
              <div>
                {items.likeDetails.map((likes, idx) => {
                  if (isValidUser && likes.user_id === user.uid) {
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
              <div>
                <p className="mt-1 text-m text-black-700 hover:text-blue-400 text-center font-sans">
                  {items.title}
                </p>

                <p className="mt-1 text-sm text-black-700 hover:text-blue-400 text-center h-fit">
                  {items.price}$
                </p>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Card;
