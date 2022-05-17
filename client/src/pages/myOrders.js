import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import queries from "../queries.js";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";

const MyOrders = (props) => {
  const { isValidUser, user } = useContext(AuthContext);

  let userUid = "";
  if (isValidUser) {
    userUid = user.uid;
  }

  let {
    loading: loadingOrder,
    error: errorOrder,
    data: dataOrder,
  } = useQuery(queries.GET_USER_ORDER, {
    fetchPolicy: "cache-and-network",
    variables: { userId: userUid },
  });
  let order_id_arr = [];
  if (dataOrder && dataOrder.getuserOrder) {
    dataOrder.getuserOrder.map(
      (orders) => (order_id_arr = [...order_id_arr, orders.item_ids])
    );
    order_id_arr = order_id_arr.flat();
    order_id_arr = [...new Set(order_id_arr)];
  }

  let { data: dataItems } = useQuery(queries.FETCH_MULTIPLE_ITEM_BY_ID, {
    fetchPolicy: "cache-and-network",
    variables: { ids: order_id_arr },
  });

  function generateItems(itemid) {
    let b = [];
    if (dataItems !== undefined) {
      for (let idx = 0; idx < dataItems.fetchMultipleItemById.length; idx++) {
        if (dataItems.fetchMultipleItemById[idx]._id === itemid) {
          b.push(
            <div>
              <div className=" bg-white border-black-600 border-2 p-2 bg-transparent flex ">
                <Link
                  to={`/itemview/${dataItems.fetchMultipleItemById[idx]._id}`}
                >
                  <p className="flex flex-nowrap overflow-auto whitespace-wrap justify-content-center">
                    {dataItems.fetchMultipleItemById[idx].title}
                  </p>
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
                    <section className="">
                      <img
                        src={
                          dataItems.fetchMultipleItemById[idx]
                            .multiple_images_of_obj[0]
                        }
                        className="object-scale-down h-20"
                      />
                    </section>
                  </span>
                </Link>
              </div>
            </div>
          );
        }
      }
    }

    return b;
  }

  let orderData = null;
  orderData = dataOrder && dataOrder.getuserOrder && (
    <div className="flex flex-nowrap lg:48 overflow-x-auto whitespace-wrap justify-content-center scroll-auto">
      <br />
      {dataOrder.getuserOrder.length > 0 ? (
        <ol className=" ">
          {dataOrder.getuserOrder.map((orders, idx) => (
            <div
              key={idx}
              className=" bg-white border-black-600 border-2 p-2 bg-transparent  overflow-x-scroll scroll-auto"
            >
              <li className="h-96" key={idx}>
                <div className="font-medium text-base text-black-500  text-left font-sans">
                  <p>Estimated Delivery: {orders.estimated_delivery}</p>
                  <p>Shipping Address:</p>
                  <div>
                    {orders.address.apartment},{orders.address.street},{" "}
                    {orders.address.city},{orders.address.state},{" "}
                    {orders.address.country} - {orders.address.zipcode}
                  </div>
                  <p>Purchased items:</p>

                  <div className="flex flex-nowrap  overflow-x-auto ">
                    {orders.item_ids.map((itemid, jdx) => {
                      return generateItems(itemid);
                    })}
                  </div>
                  <div>
                    <p>Price details:</p>
                    <div className=" text-base text-black-500">
                      Total Cost: {orders.price_details.total_price}
                      <br />
                      shipping Cost: {orders.price_details.shipping_cost}
                      <br />
                      Taxes: {orders.price_details.tax}
                    </div>
                  </div>
                </div>
              </li>
            </div>
          ))}
        </ol>
      ) : (
        "No Orders to display"
      )}
    </div>
  );

  return (
    <div>
      <header className="text-3xl font-bold text-Black-600 text-center ">
        MY ORDERS
      </header>
      <br />
      <div className="grid grid-cols-1 grid-rows-1 gap-1 grid place-items-center flex items-stretch">
        <div></div>
        {orderData}
      </div>
    </div>
  );
};

export default MyOrders;
