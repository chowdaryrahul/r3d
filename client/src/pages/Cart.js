import queries from "../queries.js";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../firebase/Auth";
import { useMutation, useQuery } from "@apollo/client";
import CardOrder from "../components/CardOrder";
import Orders from "./Orders.js";
import { Link } from "react-router-dom";
import actions from "../actions.js";
import {
  CreditCardIcon,
  LogoutIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

const Cart = () => {
  const dispatch = useDispatch();
  const { isValidUser, user } = useContext(AuthContext);

  let userUid = "";
  if (isValidUser) {
    userUid = user.uid;
  }

  let {
    loading: loadingFU,
    error: errorFU,
    data: dataFU,
  } = useQuery(queries.FETCH_USER, {
    fetchPolicy: "cache-and-network",
    variables: { _id: userUid },
  });

  let cartItemsOfUSer = [];
  if (dataFU && dataFU.fetchUser) {
    dataFU.fetchUser.cart_items.map((itemsInCart) => {
      cartItemsOfUSer.push(itemsInCart.item_id);
    });
  }
  let {
    loading: loadingMI,
    error: errorMI,
    data: dataMI,
  } = useQuery(queries.FETCH_MULTIPLE_ITEM_BY_ID, {
    fetchPolicy: "cache-and-network",
    variables: { ids: cartItemsOfUSer },
  });

  console.log("data from multiple items: ", dataMI);
  let cartBody = null;
  if (isValidUser) {
    if (dataMI && dataMI.fetchMultipleItemById)
      dispatch(actions.addCartItem(dataMI.fetchMultipleItemById));

    cartBody = dataMI && dataMI.fetchMultipleItemById && (
      <div>
        <CardOrder itemsDataInCard={dataMI.fetchMultipleItemById} />
        {dataMI.fetchMultipleItemById.length > 0 ? (
          <Link to={`/orders`}>
            <button
              type="button"
              className="bg-gray-300  text-black font-bold py-2 px-4 rounded  item-center"
            >
              Proceed to Checkout
              <LogoutIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </Link>
        ) : (
          "Cart Empty"
        )}
      </div>
    );
  } else {
    cartBody = (
      <div className="text-4xl">
        You are not signed in,{" "}
        <Link to={`/signin`} className="text-blue-700 hover:text-blue-600">
          {" "}
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-r from-white-200 to-gray-300 grid place-items-center overflow-scroll">
      <h1 className="text-3xl font-bold text-black-600 text-center">
        Your Cart
      </h1>
      <div className=" font-sans grid place-items-center h-screen ">
        {cartBody}
      </div>
    </div>
  );
};

export default Cart;
