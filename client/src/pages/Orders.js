import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import queries from "../queries.js";
import { AuthContext } from "../firebase/Auth";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions.js";

import { LogoutIcon } from "@heroicons/react/outline";
import validator from "validator";

const Orders = (props) => {
  const dispatch = useDispatch();
  const { isValidUser, user } = useContext(AuthContext);
  const allCartItems = useSelector((state) => state.cartItems);
  const itemQuantity = useSelector((state) => state.itemQuantity);
  const [orderIdInUser] = useMutation(queries.UPDATE_ORDER_ID_IN_USER);
  const orderIdForUser = useSelector((state) => state.orderId);
  const [createOrder] = useMutation(queries.CREATE_ORDER, {
    onCompleted: (data) => {
      dispatch(actions.storeOrderIds(data.createOrder._id));
      dispatch(actions.emptyCart());
      dispatch(actions.itemQtyEmpty());

      orderIdInUser({
        variables: {
          _id: user.uid,
          orderId: data.createOrder._id,
        },
      });
      window.alert("Order Placed!");
      window.location = "/lastpage";
    },
  });

  let orderItemIds = [];
  let totalPrice = 0;
  let prices = [];
  if (allCartItems && itemQuantity) {
    allCartItems.cartItemData.map((itemsInCart) => {
      orderItemIds.push(itemsInCart._id);
      itemQuantity.map((itmqty, idx) => {
        if (itemsInCart._id === itmqty.idItem) {
          totalPrice = totalPrice + itemsInCart.price * itmqty.quantity;
        }
      });
    });
  }

  let productTotalprice = totalPrice;
  const taxPrice = totalPrice * 0.14;
  const shippingPrice = totalPrice > 500 ? 0 : 10;
  totalPrice = totalPrice + taxPrice + shippingPrice;

  let myCurrentDate = new Date();
  let myFutureDate = new Date(myCurrentDate);
  myFutureDate.setDate(myFutureDate.getDate() + 8);

  const validEmailRegex = RegExp(
    // eslint-disable-next-line
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const validphone = RegExp(
    // eslint-disable-next-line
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  );

  let errorMap = {
    firstName: "",
    lastName: "",
    email: "",
    Apartment: "",
    Street: "",
    City: "",
    State: "",
    Country: "select",
    Zipcode: "",
    cardholderName: "",
    cardnumber: "",
    expmonth: "",
    expyear: "",
    cvv: "",
  };

  const validateForm = (e) => {
    console.log(e);
    let valid = true;
    Object.keys(e).forEach((key) => {
      console.log(typeof key);
      if (document.getElementById(key).value.length === 0) valid = false;
      if (e[key] !== "" || e[key] === "select") valid = false;
    });
    console.log("valid val : ", valid);
    return valid;
  };

  const [errors, setErrors] = useState(errorMap);
  const handleChange = (event) => {
    const { name, value } = event.target;

    console.log("event name is: ", name);
    console.log("event value is: ", value);

    switch (name) {
      case "firstName":
        setErrors({
          ...errors,
          firstName:
            value.length < 2
              ? "Full Name must be at least 2 characters long!"
              : "",
        });
        console.log("changed name", errors.fn);

        break;
      case "lastName":
        setErrors({
          ...errors,
          lastName:
            value.length < 2
              ? "Last Name must be at least 2 characters long!"
              : "",
        });

        break;
      case "email":
        setErrors({
          ...errors,
          email: validEmailRegex.test(value) ? "" : "Email is not valid!",
        });

        break;
      case "phone":
        setErrors({
          ...errors,
          phone: validphone.test(value)
            ? ""
            : "Please enter valid Phone number!",
        });

        break;
      case "Apartment":
        setErrors({
          ...errors,
          Apartment:
            value.length === 0 ? "Apartment field cannot be blank" : "",
        });
        break;
      case "Street":
        setErrors({
          ...errors,
          Street: value.length < 2 ? "Street field cannot be blank" : "",
        });
        break;
      case "City":
        setErrors({
          ...errors,
          City:
            value.length < 2 ? "City must be at least 2 characters long!" : "",
        });
        break;
      case "State":
        setErrors({
          ...errors,
          State:
            value.length < 2 ? "State must be at least 2 characters long!" : "",
        });
        break;
      case "Country":
        setErrors({
          ...errors,
          Country: value === "select" ? "Select a Country" : "",
        });
        break;
      case "Zipcode":
        setErrors({
          ...errors,
          Zipcode:
            value.length < 2 ? "Zipcode must be at least 2 digits long!" : "",
        });

        break;
      case "cardholderName":
        setErrors({
          ...errors,
          cardholderName:
            value.length < 2 ? "Name must be at least 2 characters long!" : "",
        });
        break;
      case "cardnumber":
        setErrors({
          ...errors,
          cardnumber:
            validator.isCreditCard(value) === false
              ? "Invalid Credit Card Number"
              : "",
        });
        break;
      case "expmonth":
        setErrors({
          ...errors,
          expmonth: value.length > 2 ? "Please enter valid month" : "",
        });
        break;
      case "expyear":
        console.log("today", new Date());
        console.log(
          "someday",

          new Date().setFullYear(
            parseInt(value),
            parseInt(document.getElementById("expmonth").value),
            0
          )
        );
        const event = new Date();
        setErrors({
          ...errors,
          expyear:
            new Date() >
            event.setFullYear(
              parseInt(value),
              parseInt(document.getElementById("expmonth").value),
              0
            )
              ? "Please enter valid Year"
              : "",
        });
        break;
      case "cvv":
        setErrors({
          ...errors,
          cvv:
            value.length > 3 || value.length < 3
              ? "Please enter valid CVV"
              : "",
        });
        break;
      default:
        break;
    }
    console.log("errors is ", errors);
    return;
  };

  return (
    <div className="flex-auto flex-col overflow-scroll md:flex-row h-screen w-screen font-sans">
      <div className="min-h-full">
        <header className=" ">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Checkout
          </h1>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className=" overflow-scroll rounded-lg h-96 border-black-800 border-4 rounded h-max">
                <div className="container p-12 mx-auto">
                  <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
                    <div className="flex flex-col md:w-full">
                      <h2 className="mb-4 font-bold md:text-xl text-heading ">
                        Shipping Address
                      </h2>
                      <form
                        className="justify-center w-full mx-auto"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (validateForm(errors)) {
                            createOrder({
                              variables: {
                                item_ids: orderItemIds,
                                cvv: parseInt(
                                  document.getElementById("cvv").value,
                                  10
                                ),
                                card_no:
                                  document.getElementById("cardnumber").value,

                                phone: document.getElementById("phone").value,

                                firstname:
                                  document.getElementById("firstName").value,
                                lastname:
                                  document.getElementById("lastName").value,

                                notes:
                                  document.getElementById("notes").innerText,

                                month: parseInt(
                                  document.getElementById("expmonth").value,
                                  10
                                ),
                                year: parseInt(
                                  document.getElementById("expyear").value,
                                  10
                                ),
                                street: document.getElementById("Street").value,
                                apartment:
                                  document.getElementById("Apartment").value,
                                city: document.getElementById("City").value,
                                state: document.getElementById("State").value,
                                country:
                                  document.getElementById("Country").value,
                                zipcode:
                                  document.getElementById("Zipcode").value,
                                estimated_delivery: myFutureDate,
                                user_id: user.uid,
                                total_price: totalPrice,
                                tax: taxPrice,
                                shipping_cost: shippingPrice,
                              },
                            });
                          } else {
                            alert("Form Invalid!");
                          }
                        }}
                      >
                        <div className="">
                          <div className="space-x-0 lg:flex lg:space-x-4">
                            <div className="w-full lg:w-1/2">
                              <label
                                htmlFor="firstName"
                                className="block mb-3 text-sm font-semibold text-gray-500 required"
                              >
                                First Name
                              </label>
                              <input
                                name="firstName"
                                id="firstName"
                                type="text"
                                placeholder="First Name"
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />
                              {/* {errors &&
                                  errors.fn &&
                                  errors.fn.length > 0 && ( */}
                              <span className="error">{errors.firstName}</span>
                              {/* )} */}
                            </div>
                            <div className="w-full lg:w-1/2 ">
                              <label
                                htmlFor="lastName"
                                className="block mb-3 text-sm font-semibold text-gray-500"
                              >
                                Last Name
                              </label>
                              <input
                                name="lastName"
                                id="lastName"
                                onChange={handleChange}
                                type="text"
                                placeholder="Last Name"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />

                              <span className="error">{errors.lastName}</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="w-80  ">
                              <label
                                htmlFor="Email"
                                className="block mb-3 text-sm font-semibold text-gray-500"
                              >
                                Email
                              </label>
                              <input
                                name="email"
                                id="email"
                                onChange={handleChange}
                                type="text"
                                placeholder="Email"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />

                              <span className="error">{errors.email}</span>
                            </div>
                            <div className="w-80  ">
                              <label
                                htmlFor="phone"
                                className="block mb-3 text-sm font-semibold text-gray-500"
                              >
                                Mobile Number
                              </label>
                              <input
                                name="phone"
                                id="phone"
                                onChange={handleChange}
                                type="text"
                                placeholder="phone"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />

                              <span className="error">{errors.phone}</span>
                            </div>
                          </div>
                          <br />
                          <div className="space-x-0 lg:flex lg:space-x-4">
                            <div className="w-30">
                              <label
                                htmlFor="Apartment"
                                className="block mb-3 text-sm font-semibold text-gray-500"
                              >
                                Apartment
                              </label>
                              <input
                                id="Apartment"
                                name="Apartment"
                                onChange={handleChange}
                                type="text"
                                placeholder="Apartment"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />

                              <span className="error">{errors.Apartment}</span>
                            </div>
                            <div className="w-80">
                              <label
                                htmlFor="Street"
                                className="block mb-3 text-sm font-semibold text-gray-500"
                              >
                                Street
                              </label>
                              <input
                                id="Street"
                                name="Street"
                                onChange={handleChange}
                                type="text"
                                placeholder="Street"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />

                              <span className="error">{errors.Street}</span>
                            </div>
                          </div>
                          <br />
                          <div className="space-x-0 lg:flex lg:space-x-4">
                            <div className="w-full lg:w-1/2">
                              <label
                                htmlFor="city"
                                className="block mb-3 text-sm font-semibold text-gray-500"
                              >
                                City
                              </label>
                              <input
                                id="City"
                                name="City"
                                onChange={handleChange}
                                type="text"
                                placeholder="City"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />

                              <span className="error">{errors.City}</span>
                            </div>
                            <div className="w-full lg:w-1/2">
                              <label
                                htmlFor="State"
                                className="block mb-3 text-sm font-semibold text-gray-500"
                              >
                                State
                              </label>
                              <input
                                id="State"
                                name="State"
                                onChange={handleChange}
                                type="text"
                                placeholder="State"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />

                              <span className="error">{errors.State}</span>
                            </div>
                            <div className="w-full lg:w-1/2">
                              <label
                                htmlFor="Country"
                                className="block mb-3 text-sm font-semibold text-gray-500"
                              >
                                Country
                              </label>
                              <select
                                id="Country"
                                name="Country"
                                onChange={handleChange}
                                type="text"
                                placeholder="Country"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                              >
                                {" "}
                                <option value="select" className="grey_color">
                                  Select Country
                                </option>
                                <option value="Afganistan">Afghanistan</option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="American Samoa">
                                  American Samoa
                                </option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Antigua & Barbuda">
                                  Antigua & Barbuda
                                </option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bermuda">Bermuda</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Bonaire">Bonaire</option>
                                <option value="Bosnia & Herzegovina">
                                  Bosnia & Herzegovina
                                </option>
                                <option value="Botswana">Botswana</option>
                                <option value="Brazil">Brazil</option>
                                <option value="British Indian Ocean Ter">
                                  British Indian Ocean Ter
                                </option>
                                <option value="Brunei">Brunei</option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">
                                  Burkina Faso
                                </option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Canary Islands">
                                  Canary Islands
                                </option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Cayman Islands">
                                  Cayman Islands
                                </option>
                                <option value="Central African Republic">
                                  Central African Republic
                                </option>
                                <option value="Chad">Chad</option>
                                <option value="Channel Islands">
                                  Channel Islands
                                </option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Christmas Island">
                                  Christmas Island
                                </option>
                                <option value="Cocos Island">
                                  Cocos Island
                                </option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Congo">Congo</option>
                                <option value="Cook Islands">
                                  Cook Islands
                                </option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Cote DIvoire">
                                  Cote DIvoire
                                </option>
                                <option value="Croatia">Croatia</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Curaco">Curacao</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czech Republic">
                                  Czech Republic
                                </option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Dominican Republic">
                                  Dominican Republic
                                </option>
                                <option value="East Timor">East Timor</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Equatorial Guinea">
                                  Equatorial Guinea
                                </option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Falkland Islands">
                                  Falkland Islands
                                </option>
                                <option value="Faroe Islands">
                                  Faroe Islands
                                </option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option>
                                <option value="France">France</option>
                                <option value="French Guiana">
                                  French Guiana
                                </option>
                                <option value="French Polynesia">
                                  French Polynesia
                                </option>
                                <option value="French Southern Ter">
                                  French Southern Ter
                                </option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Great Britain">
                                  Great Britain
                                </option>
                                <option value="Greece">Greece</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Hawaii">Hawaii</option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="India">India</option>
                                <option value="Iran">Iran</option>
                                <option value="Iraq">Iraq</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Isle of Man">Isle of Man</option>
                                <option value="Israel">Israel</option>
                                <option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Korea North">Korea North</option>
                                <option value="Korea Sout">Korea South</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Laos">Laos</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libya">Libya</option>
                                <option value="Liechtenstein">
                                  Liechtenstein
                                </option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="Macau">Macau</option>
                                <option value="Macedonia">Macedonia</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">
                                  Marshall Islands
                                </option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Midway Islands">
                                  Midway Islands
                                </option>
                                <option value="Moldova">Moldova</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Myanmar">Myanmar</option>
                                <option value="Nambia">Nambia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherland Antilles">
                                  Netherland Antilles
                                </option>
                                <option value="Netherlands">
                                  Netherlands (Holland, Europe)
                                </option>
                                <option value="Nevis">Nevis</option>
                                <option value="New Caledonia">
                                  New Caledonia
                                </option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Niue">Niue</option>
                                <option value="Norfolk Island">
                                  Norfolk Island
                                </option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau Island">
                                  Palau Island
                                </option>
                                <option value="Palestine">Palestine</option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">
                                  Papua New Guinea
                                </option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Phillipines">Philippines</option>
                                <option value="Pitcairn Island">
                                  Pitcairn Island
                                </option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Republic of Montenegro">
                                  Republic of Montenegro
                                </option>
                                <option value="Republic of Serbia">
                                  Republic of Serbia
                                </option>
                                <option value="Reunion">Reunion</option>
                                <option value="Romania">Romania</option>
                                <option value="Russia">Russia</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="St Barthelemy">
                                  St Barthelemy
                                </option>
                                <option value="St Eustatius">
                                  St Eustatius
                                </option>
                                <option value="St Helena">St Helena</option>
                                <option value="St Kitts-Nevis">
                                  St Kitts-Nevis
                                </option>
                                <option value="St Lucia">St Lucia</option>
                                <option value="St Maarten">St Maarten</option>
                                <option value="St Pierre & Miquelon">
                                  St Pierre & Miquelon
                                </option>
                                <option value="St Vincent & Grenadines">
                                  St Vincent & Grenadines
                                </option>
                                <option value="Saipan">Saipan</option>
                                <option value="Samoa">Samoa</option>
                                <option value="Samoa American">
                                  Samoa American
                                </option>
                                <option value="San Marino">San Marino</option>
                                <option value="Sao Tome & Principe">
                                  Sao Tome & Principe
                                </option>
                                <option value="Saudi Arabia">
                                  Saudi Arabia
                                </option>
                                <option value="Senegal">Senegal</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">
                                  Sierra Leone
                                </option>
                                <option value="Singapore">Singapore</option>
                                <option value="Slovakia">Slovakia</option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">
                                  Solomon Islands
                                </option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">
                                  South Africa
                                </option>
                                <option value="Spain">Spain</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Swaziland">Swaziland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syria">Syria</option>
                                <option value="Tahiti">Tahiti</option>
                                <option value="Taiwan">Taiwan</option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania">Tanzania</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Togo">Togo</option>
                                <option value="Tokelau">Tokelau</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad & Tobago">
                                  Trinidad & Tobago
                                </option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Turkmenistan">
                                  Turkmenistan
                                </option>
                                <option value="Turks & Caicos Is">
                                  Turks & Caicos Is
                                </option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option>
                                <option value="United Kingdom">
                                  United Kingdom
                                </option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="United Arab Erimates">
                                  United Arab Emirates
                                </option>
                                <option value="United States of America">
                                  United States of America
                                </option>
                                <option value="Uraguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Vatican City State">
                                  Vatican City State
                                </option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="Virgin Islands (Brit)">
                                  Virgin Islands (Brit)
                                </option>
                                <option value="Virgin Islands (USA)">
                                  Virgin Islands (USA)
                                </option>
                                <option value="Wake Island">Wake Island</option>
                                <option value="Wallis & Futana Is">
                                  Wallis & Futana Is
                                </option>
                                <option value="Yemen">Yemen</option>
                                <option value="Zaire">Zaire</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                              </select>
                              <span className="error">{errors.Country}</span>
                            </div>
                            <div className="w-full lg:w-1/2 ">
                              <label
                                htmlFor="postcode"
                                className="block mb-3 text-sm font-semibold text-gray-500"
                              >
                                Zipcode
                              </label>
                              <input
                                id="Zipcode"
                                name="Zipcode"
                                onChange={handleChange}
                                type="number"
                                placeholder="Post Code"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />

                              <span className="error">{errors.Zipcode}</span>
                            </div>
                          </div>

                          <br />

                          <h2 className="mb-4 font-bold md:text-xl text-heading ">
                            Payment Details
                          </h2>
                          <div className="space-x-0 lg:flex lg:space-x-4">
                            <div className="w-full lg:w-1/2">
                              <label
                                htmlFor="firstName"
                                className="block mb-3 text-sm font-semibold text-gray-500"
                              >
                                Cardholder's Name
                              </label>
                              <input
                                name="cardholderName"
                                id="cardholderName"
                                onChange={handleChange}
                                type="text"
                                placeholder="Cardholder's Name"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />

                              <span className="error">
                                {errors.cardholderName}
                              </span>
                            </div>
                            <div className="w-full lg:w-1/2">
                              <label
                                htmlFor="cardnumber"
                                className="block mb-3 text-sm font-semibold text-gray-500"
                              >
                                Card Number
                              </label>
                              <input
                                id="cardnumber"
                                name="cardnumber"
                                onChange={handleChange}
                                type="text"
                                placeholder="0000 0000 0000 0000"
                                autoComplete="on"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />

                              <span className="error">{errors.cardnumber}</span>
                            </div>
                            <div className="w-full lg:w-1/2">
                              <label
                                htmlFor="expdate"
                                className="block mb-3 text-sm font-semibold text-gray-500"
                              >
                                Valid Through
                              </label>
                              <input
                                id="expmonth"
                                name="expmonth"
                                onChange={handleChange}
                                type="number"
                                min="01"
                                max="12"
                                step="1"
                                placeholder="MM"
                                className="w-1/2 px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />

                              <span className="error">{errors.expmonth}</span>

                              <input
                                id="expyear"
                                name="expyear"
                                onChange={handleChange}
                                type="number"
                                min="2000"
                                max="2099"
                                step="1"
                                placeholder="YYYY"
                                className="w-1/2 px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />

                              <span className="error">{errors.expyear}</span>
                            </div>
                            <div className="w-full lg:w-1/2">
                              <label
                                htmlFor="CVV"
                                className="block mb-3 text-sm font-semibold text-gray-500"
                              >
                                CVV
                              </label>
                              <input
                                id="cvv"
                                name="cvv"
                                onChange={handleChange}
                                type="number"
                                maxLength="3"
                                placeholder="123"
                                className="w-1/2 px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                              />

                              <span className="error">{errors.cvv}</span>
                            </div>
                          </div>

                          <div className="relative pt-3 xl:pt-6">
                            <label
                              id="notes"
                              htmlFor="text"
                              className="block mb-3 text-sm font-semibold text-gray-500"
                            >
                              {" "}
                            </label>
                            <input
                              onChange={handleChange}
                              name="notes"
                              className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                              rows="4"
                              placeholder="Notes for delivery"
                            ></input>
                          </div>
                          <br />
                          <button
                            type="submit"
                            className="bg-gray-300  text-black text-white font-bold py-2 px-4 rounded"
                          >
                            Place Order
                            <LogoutIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                          {/* </Link> */}
                        </div>
                      </form>
                    </div>
                    <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
                      <div className="pt-12 md:pt-0 2xl:ps-4">
                        <h2 className="text-xl font-bold">Order Summary</h2>

                        <div className="flex p-4 mt-4">
                          <h2 className="text-xl font-bold">{}</h2>
                        </div>
                        <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                          Subtotal:{" "}
                          <span className="ml-2">{productTotalprice}</span>
                        </div>
                        <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                          Taxes: <span className="ml-2">{taxPrice}</span>
                        </div>
                        <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                          Shipping Price:
                          <span className="ml-2">{shippingPrice}</span>
                        </div>
                        <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                          Total: <span className="ml-2">{totalPrice} </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;
