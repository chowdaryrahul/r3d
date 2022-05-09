import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import queries from "../queries.js";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions.js";
import { AuthContext } from "../firebase/Auth";
import { Link } from "react-router-dom";

const Lastpage = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  dispatch(actions.emptyCart());

  const orderIdForUser = useSelector((state) => state.orderId);

  const [orderIdInUser] = useMutation(queries.UPDATE_ORDER_ID_IN_USER);

  if (orderIdForUser) {
    console.log("order id last page: ", orderIdForUser);
    console.log("order id last page and one moreeee: ", orderIdForUser.orderId);
    orderIdInUser({
      variables: {
        _id: user.uid,
        orderId: orderIdForUser.orderId,
      },
    });
  }

  return (
    <div className="flex-auto  overflow-scroll font-sans grid place-items-center h-screen">
      <div className=" rounded text-black-900 text-5xl">
        Thank You for Shopping with us!
      </div>
      <div>
        <Link to={`/`}>
          <button
            type="button"
            class="border p-2 rounded bg-blue-300 hover:bg-blue-500"
          >
            <svg
              class="motion-safe:animate-spin h-5 w-5 mr-3 ..."
              viewBox="0 0 24 24"
            ></svg>
            Back to Explore
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Lastpage;
