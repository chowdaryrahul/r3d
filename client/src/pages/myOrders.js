import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import queries from "../queries.js";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../firebase/Auth";

const MyOrders = (props) => {
  console.log("here");
  const { isValidUser, user } = useContext(AuthContext);
  // let { items_ids } = useParams();

  let userUid = "";
  if (isValidUser) {
    userUid = user.uid;
    console.log(userUid);
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
    console.log(dataOrder);
    dataOrder.getuserOrder.map(
      (orders) =>
        // console.log(orders.item_ids);
        (order_id_arr = [...order_id_arr, orders.item_ids])

      // orders.items_ids.map((itemIds) => {
      //   console.log("inside: ", itemIds);
      //   // order_id_arr.push(orders.items_ids);

      //   // order_id_arr.push(itemIds);

      // });
    );
    order_id_arr = order_id_arr.flat();
    // console.log("order id arr: ", order_id_arr);
    // order_id_arr = dataOrder.getuserOrder.items_ids;
    console.log("all item ids: ", order_id_arr);
  }

  let { data: dataItems } = useQuery(queries.FETCH_MULTIPLE_ITEM_BY_ID, {
    fetchPolicy: "cache-and-network",
    variables: { ids: order_id_arr },
  });
  // if (dataItems && dataItems.fetchMultipleItemById)
  //   console.log("here", dataItems);
  // let cardData = null;
  // cardData = dataItems && dataItems.fetchMultipleItemById && (
  //   <Card itemsDataInCard={dataItems.fetchMultipleItemById} />
  // );
  let orderData = null;
  orderData = dataOrder && dataOrder.getuserOrder && (
    <div className="flex flex-nowrap lg:48 overflow-x-auto whitespace-wrap justify-content-center scroll-auto">
      <br />
      <ol className=" ">
        {dataOrder.getuserOrder.map((orders, idx) => (
          <div
            key={idx}
            className=" bg-white border-black-600 border-2 p-2 bg-transparent  overflow-x-scroll scroll-auto"
          >
            <container>
              <li className=" h-96">
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
                    {/* {cardData} */}
                    {dataItems && dataItems.fetchMultipleItemById && (
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
                    )}
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
            </container>
          </div>
        ))}
      </ol>
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
