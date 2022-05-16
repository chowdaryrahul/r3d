import queries from '../queries.js';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../firebase/Auth';
import { useQuery } from "@apollo/client";
import CardOrder from "../components/CardOrder";
import { Link } from 'react-router-dom';
import actions from '../actions.js';
import { LogoutIcon } from "@heroicons/react/outline";

const Cart = () => {
	const dispatch = useDispatch();
	const { isValidUser, user } = useContext(AuthContext);
	const itemQuantity = useSelector((state) => state.itemQuantity);

	let userUid = '';
	if (isValidUser) {
		userUid = user.uid;
	}

	let {
		loading: loadingFU,
		error: errorFU,
		data: dataFU,
	} = useQuery(queries.FETCH_USER, {
		fetchPolicy: 'cache-and-network',
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
		fetchPolicy: 'cache-and-network',
		variables: { ids: cartItemsOfUSer },
	});

	let cartBody = null;
	if (isValidUser) {
    if (dataMI && dataMI.fetchMultipleItemById)
      dispatch(actions.addCartItem(dataMI.fetchMultipleItemById));

    cartBody = dataMI && dataMI.fetchMultipleItemById && (
      <div>
        <CardOrder itemsDataInCard={dataMI.fetchMultipleItemById} />
        {dataMI.fetchMultipleItemById.length > 0 ? (
          <div className="py-4 grid place-items-center overflow-scroll">
            <Link to={`/orders`}>
              <button
                type="button"
                className="bg-gray-300  text-black font-bold py-2 px-4 rounded  item-center"
              >
                Proceed to Checkout
                <LogoutIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </Link>
          </div>
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
      <header className="bg-white shadow w-full">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl flex flex-inline justify-center font-bold text-gray-900">
            Your Cart
            <span>
              <svg
                class="h-8 w-8 place-items-center text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>
          </h1>
        </div>
      </header>
      <div className="font-sans grid place-items-center h-full py-12">
        {cartBody}
      </div>
    </div>
  );
};

export default Cart;
