import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import queries from "../queries.js";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Comments from "../components/Comments.js";
import Like from "../components/Like.js";
import { AuthContext } from "../firebase/Auth";
import Page404 from "./Page404.js";
import AddToCart from "../components/AddToCart.js";

const ItemView = (props) => {
  const { isValidUser, user } = useContext(AuthContext);
  let { _id } = useParams();
  let { loading, error, data } = useQuery(queries.FETCH_ITEM, {
    fetchPolicy: "cache-and-network",
    variables: { _id: _id },
  });

  let itemData = null;
  let likedIdx = false;
  itemData = data && data.fetchItem && (
    <div className=" gap-1 border">
      <header className="fmt-1 text-4xl text-black-900 text-left">
        {data.fetchItem.title}
      </header>

      <br />
      <div className="  overflow-scroll">
        <div class="grid grid-cols-2 gap-4">
          <Carousel className="border p-3  ">
            {data.fetchItem.multiple_images_of_obj.map((imgs, idx) => (
              <div
                key={idx}
                className="  flex flex-nowrap lg:48 overflow-x-auto whitespace-wrap justify-content-center scroll-auto p-4 h-60 w-100 "
              >
                <img src={imgs} />
              </div>
            ))}
          </Carousel>
          <div>
            <p className="fmt-1 text-2xl text-black-900 text-center border">
              Details:
            </p>
            <p className="border">Posted by: {data.fetchItem.user_name}</p>
            <p className="border">Category: {data.fetchItem.category}</p>
            <p className="border">Tags: {data.fetchItem.tags}</p>
            <p className="border">Description: {data.fetchItem.description}</p>
            <p className="border">Upload Date: {data.fetchItem.upload_date}</p>
            <p className="border">License: {data.fetchItem.license}</p>
            <p className="border">Price: {data.fetchItem.price}</p>

            <p className="border">Print Settings: </p>

            <p className="border">
              Printer: {data.fetchItem.print_settings.printer}
            </p>
            <p className="border">
              Printer Brand: {data.fetchItem.print_settings.printer_brand}
            </p>
            <p className="border">
              Rafts: {data.fetchItem.print_settings.rafts}
            </p>
            <p className="border">
              Supports: {data.fetchItem.print_settings.supports}
            </p>
            <p className="border">
              Resolution: {data.fetchItem.print_settings.resolution}
            </p>
            <p className="border">
              Infill: {data.fetchItem.print_settings.infill}
            </p>
            <p className="border">
              Filament Brand: {data.fetchItem.print_settings.filament_brand}
            </p>
            <p className="border">
              Filament Color: {data.fetchItem.print_settings.filament_color}
            </p>
            <p className="border">
              Filament Material:{" "}
              {data.fetchItem.print_settings.filament_material}
            </p>
          </div>

          <div>
            <p className="font-bold text-xl mb-2 text-gray-700 text-base ">
              {data.fetchItem.likeDetails.map((likes, idx) => {
                if (isValidUser && likes.user_id === user.uid) {
                  likedIdx = true;
                }
              })}
            </p>
            {likedIdx === false ? (
              <Like likeFlag="toLike" itemDataToLike={data.fetchItem} />
            ) : (
              <Like likeFlag="toUnlike" itemDataToLike={data.fetchItem} />
            )}
            <br />
            <AddToCart itemToAddInCart={data.fetchItem._id} />
            <br />
            <Comments itemDataForComm={data.fetchItem} />
          </div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return <Page404 />;
  }

  return (
    <div className="grid grid-col-2">
      <div>{itemData}</div>
    </div>
  );
};

export default ItemView;
