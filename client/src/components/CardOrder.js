import React, { useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { QuantityPicker } from "react-qty-picker";
import { useMutation, useQuery } from "@apollo/client";
import queries from "../queries.js";
import actions from "../actions.js";

const Card = (props) => {
  const dispatch = useDispatch();
  const { isValidUser, user } = useContext(AuthContext);
  const [addItemToCart] = useMutation(queries.ADD_TO_CART);
  const [removeItemFromCart] = useMutation(queries.REMOVE_FROM_CART);
  let cardsItemsData = props.itemsDataInCard;
  

  let userUid = "";
  let userName = "";
  if (isValidUser) {
    userUid = user.uid;
    userName = user.displayName;
  }

  let {
    loading: loadingFU,
    error: errorFU,
    data: dataFU,
  } = useQuery(queries.FETCH_USER, {
    fetchPolicy: "cache-and-network",
    variables: { _id: userUid },
  });


  let cartItmIdQtyMap = [];
  let cartItmQty = [];
  if (dataFU && dataFU.fetchUser) {
    dataFU.fetchUser.cart_items.map((itemsInCart) => {
      let mapItmQty = {};
      mapItmQty["idItem"] = itemsInCart.item_id;
      mapItmQty["quantity"] = itemsInCart.quantity;
      cartItmIdQtyMap.push(mapItmQty);
      cartItmQty.push(itemsInCart.quantity);
    });
  }

  const [qty, setQty] = useState(cartItmQty);
  const [itmQty, setItmQty] = useState(cartItmIdQtyMap);
  if(cartItmIdQtyMap.length !== 0){
    dispatch(actions.mapItemQty(itmQty));
  }
  

  return (
    <div className="flex items-stretch ">
      <ul className="grid sm:block md:grid grid-cols-1 grid-rows-1 gap-1 items-center">
        {cardsItemsData.map((items, idx) => (
          <div
            key={items._id}
            className="rounded-lg shadow-lg bg-white border-indigo-600 border-1 p-2 bg-transparent"
          >
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
                <Link to={`/itemview/${items._id}`}>
                  <img
                    src={items.multiple_images_of_obj[0]}
                    alt="3d representation"
                    className="w-30 h-64 bg-slate-100"
                  />
                </Link>
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
              <div className="font-medium text-1xl text-black-500 text-center h-fit">
                <span>
                  <button
                    className="hover:text-blue-400"
                    onClick={(e) => {
                      e.preventDefault();
                      let newqtyArr = [...qty];
                      qty[idx] - 1 <= 0
                        ? (newqtyArr[idx] = 0)
                        : (newqtyArr[idx] = qty[idx] - 1);
                      setQty(newqtyArr);

                      itmQty[idx].idItem = items._id;
                      itmQty[idx].quantity = 1;
                      setItmQty(itmQty);

                      dispatch(actions.mapItemQty(itmQty));

                      removeItemFromCart({
                        variables: {
                          _id: userUid,
                          user_name: userName,
                          item_id: items._id,
                          quantity: newqtyArr[idx],
                        },
                      });
                    }}
                  >
                    -
                  </button>
                  &nbsp;
                </span>
                <span>{qty[idx]}</span>&nbsp;
                <span>
                  <button
                    className="hover:text-blue-400"
                    onClick={(e) => {
                      e.preventDefault();
                      let newqtyArr = [...qty];
                      newqtyArr[idx] = qty[idx] + 1;
                      setQty(newqtyArr);

                      itmQty[idx].idItem = items._id;
                      itmQty[idx].quantity = newqtyArr[idx];
                      setItmQty(itmQty);

                      dispatch(actions.mapItemQty(itmQty));

                      addItemToCart({
                        variables: {
                          _id: userUid,
                          user_name: userName,
                          item_id: items._id,
                          quantity: newqtyArr[idx],
                        },
                      });
                    }}
                  >
                    +
                  </button>
                </span>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Card;
