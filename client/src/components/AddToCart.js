import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import { useMutation, useQuery } from "@apollo/client";
import queries from "../queries.js";
import { Link } from "react-router-dom";

const AddToCart = (props) => {
  const { isValidUser, user } = useContext(AuthContext);
  const [addItemToCart] = useMutation(queries.ADD_TO_CART);
  const [removeItemFromCart] = useMutation(queries.REMOVE_FROM_CART);

  let userUid = "";
  if (isValidUser) {
    userUid = user.uid;
  }

  let { loading, error, data } = useQuery(queries.FETCH_USER, {
    fetchPolicy: "cache-and-network",
    variables: { _id: userUid },
  });

  let itemIdToAdd = props.itemToAddInCart;
  let inCartFlag = false;
  let addToCartBody = null;
  if (isValidUser) {
    if (data && data.fetchUser) {
      addToCartBody = (
        <div>
          {data.fetchUser.cart_items.map((cartItems) => {
            if (cartItems.item_id === itemIdToAdd) {
              inCartFlag = true;
              return inCartFlag;
            }
          })}

          {inCartFlag === false ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addItemToCart({
                  variables: {
                    _id: userUid,
                    user_name: data.fetchUser.user_name,
                    item_id: itemIdToAdd,
                    quantity: 1,
                  },
                });
              }}
            >
              <button type="submit">Add to cart</button>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                removeItemFromCart({
                  variables: {
                    _id: userUid,
                    user_name: data.fetchUser.user_name,
                    item_id: itemIdToAdd,
                    quantity: 0,
                  },
                });
              }}
            >
              <button type="submit">Remove from cart</button>
            </form>
          )}
        </div>
      );
    }
  } else {
    addToCartBody = (
      <div>
        <Link to={`/signin`}>
          <button type="submit">Add to cart</button>
        </Link>
      </div>
    );
  }
  return <div>{addToCartBody}</div>;
};

export default AddToCart;
