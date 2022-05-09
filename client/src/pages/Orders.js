import React, { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import queries from "../queries.js";
import { AuthContext } from "../firebase/Auth";

import { useDispatch, useSelector } from "react-redux";
import actions from "../actions.js";
import { Link } from "react-router-dom";
import { LogoutIcon } from "@heroicons/react/outline";

const Orders = (props) => {
  let flag = false;

  const dispatch = useDispatch();
  const { isValidUser, user } = useContext(AuthContext);
  const allCartItems = useSelector((state) => state.cartItems);
  const [orderIdInUser] = useMutation(queries.UPDATE_ORDER_ID_IN_USER);
  const orderIdForUser = useSelector((state) => state.orderId);
  const [createOrder] = useMutation(queries.CREATE_ORDER, {
    onCompleted: (data) => {
      dispatch(actions.storeOrderIds(data.createOrder._id));
      dispatch(actions.emptyCart());

      orderIdInUser({
        variables: {
          _id: user.uid,
          orderId: data.createOrder._id,
        },
      });
    },
  });

  let orderItemIds = [];
  let totalPrice = 0;
  if (allCartItems) {
    allCartItems.cartItemData.map((itemsInCart) => {
      orderItemIds.push(itemsInCart._id);
      totalPrice = totalPrice + itemsInCart.price;
    });
  }
  let productTotalprice = totalPrice;
  const taxPrice = totalPrice * 0.14;
  const shippingPrice = totalPrice > 500 ? 0 : 10;
  totalPrice = totalPrice + taxPrice + shippingPrice;

  let myCurrentDate = new Date();
  let myFutureDate = new Date(myCurrentDate);
  myFutureDate.setDate(myFutureDate.getDate() + 8);

  function validateForm() {
    let x = document.forms["myForm"]["firstName"].value;

    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }

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
                <body>
                  {/* <div class="mt-20">
          <h1 class="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">
            Checkout
          </h1>
        </div> */}
                  <div class="container p-12 mx-auto">
                    <div class="flex flex-col w-full px-0 mx-auto md:flex-row">
                      <div class="flex flex-col md:w-full">
                        <h2 class="mb-4 font-bold md:text-xl text-heading ">
                          Shipping Address
                        </h2>
                        <form
                          class="justify-center w-full mx-auto"
                          // method="post"
                          // action
                          onSubmit={(e) => {
                            e.preventDefault();
                            createOrder({
                              variables: {
                                item_ids: orderItemIds,
                                cvv: parseInt(
                                  document.getElementById("cvv").value,
                                  10
                                ),
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
                            // user db modification
                          }}
                        >
                          <div class="">
                            <div class="space-x-0 lg:flex lg:space-x-4">
                              <div class="w-full lg:w-1/2">
                                <label
                                  for="firstName"
                                  class="block mb-3 text-sm font-semibold text-gray-500 required"
                                >
                                  First Name
                                </label>
                                <input
                                  name="firstName"
                                  type="text"
                                  placeholder="First Name"
                                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                              </div>
                              <div class="w-full lg:w-1/2 ">
                                <label
                                  for="lastName"
                                  class="block mb-3 text-sm font-semibold text-gray-500"
                                >
                                  Last Name
                                </label>
                                <input
                                  name="Last Name"
                                  type="text"
                                  placeholder="Last Name"
                                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                              </div>
                            </div>
                            <div class="mt-4">
                              <div class="w-80  ">
                                <label
                                  for="Email"
                                  class="block mb-3 text-sm font-semibold text-gray-500"
                                >
                                  Email
                                </label>
                                <input
                                  name="Last Name"
                                  type="text"
                                  placeholder="Email"
                                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                              </div>
                            </div>
                            <br />
                            <div class="space-x-0 lg:flex lg:space-x-4">
                              <div class="w-30">
                                <label
                                  for="Apartment"
                                  class="block mb-3 text-sm font-semibold text-gray-500"
                                >
                                  Apartment
                                </label>
                                <input
                                  id="Apartment"
                                  name="Apartment"
                                  type="text"
                                  placeholder="Apartment"
                                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                              </div>
                              <div class="w-80">
                                <label
                                  for="Street"
                                  class="block mb-3 text-sm font-semibold text-gray-500"
                                >
                                  Street
                                </label>
                                <input
                                  id="Street"
                                  name="Street"
                                  type="text"
                                  placeholder="Street"
                                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                              </div>
                            </div>
                            <br />
                            <div class="space-x-0 lg:flex lg:space-x-4">
                              <div class="w-full lg:w-1/2">
                                <label
                                  for="city"
                                  class="block mb-3 text-sm font-semibold text-gray-500"
                                >
                                  City
                                </label>
                                <input
                                  id="City"
                                  name="city"
                                  type="text"
                                  placeholder="City"
                                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                              </div>
                              <div class="w-full lg:w-1/2">
                                <label
                                  for="State"
                                  class="block mb-3 text-sm font-semibold text-gray-500"
                                >
                                  State
                                </label>
                                <input
                                  id="State"
                                  name="State"
                                  type="text"
                                  placeholder="State"
                                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                              </div>
                              <div class="w-full lg:w-1/2">
                                <label
                                  for="Country"
                                  class="block mb-3 text-sm font-semibold text-gray-500"
                                >
                                  Country
                                </label>
                                <select
                                  id="Country"
                                  name="Country"
                                  type="text"
                                  placeholder="Country"
                                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                >
                                  {" "}
                                  <option value="select" class="grey_color">
                                    Select Country
                                  </option>
                                  <option value="Afganistan">
                                    Afghanistan
                                  </option>
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
                                  <option value="El Salvador">
                                    El Salvador
                                  </option>
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
                                  <option value="Isle of Man">
                                    Isle of Man
                                  </option>
                                  <option value="Israel">Israel</option>
                                  <option value="Italy">Italy</option>
                                  <option value="Jamaica">Jamaica</option>
                                  <option value="Japan">Japan</option>
                                  <option value="Jordan">Jordan</option>
                                  <option value="Kazakhstan">Kazakhstan</option>
                                  <option value="Kenya">Kenya</option>
                                  <option value="Kiribati">Kiribati</option>
                                  <option value="Korea North">
                                    Korea North
                                  </option>
                                  <option value="Korea Sout">
                                    Korea South
                                  </option>
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
                                  <option value="New Zealand">
                                    New Zealand
                                  </option>
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
                                  <option value="Phillipines">
                                    Philippines
                                  </option>
                                  <option value="Pitcairn Island">
                                    Pitcairn Island
                                  </option>
                                  <option value="Poland">Poland</option>
                                  <option value="Portugal">Portugal</option>
                                  <option value="Puerto Rico">
                                    Puerto Rico
                                  </option>
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
                                  <option value="Switzerland">
                                    Switzerland
                                  </option>
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
                                  <option value="Wake Island">
                                    Wake Island
                                  </option>
                                  <option value="Wallis & Futana Is">
                                    Wallis & Futana Is
                                  </option>
                                  <option value="Yemen">Yemen</option>
                                  <option value="Zaire">Zaire</option>
                                  <option value="Zambia">Zambia</option>
                                  <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                              </div>
                              <div class="w-full lg:w-1/2 ">
                                <label
                                  for="postcode"
                                  class="block mb-3 text-sm font-semibold text-gray-500"
                                >
                                  Zipcode
                                </label>
                                <input
                                  id="Zipcode"
                                  name="postcode"
                                  type="number"
                                  placeholder="Post Code"
                                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                              </div>
                            </div>

                            <br />

                            <h2 class="mb-4 font-bold md:text-xl text-heading ">
                              Payment Details
                            </h2>
                            <div class="space-x-0 lg:flex lg:space-x-4">
                              <div class="w-full lg:w-1/2">
                                <label
                                  for="firstName"
                                  class="block mb-3 text-sm font-semibold text-gray-500"
                                >
                                  Cardholder's Name
                                </label>
                                <input
                                  name="firstName"
                                  type="text"
                                  placeholder="Card Number"
                                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                              </div>
                              <div class="w-full lg:w-1/2">
                                <label
                                  for="cardnumber"
                                  class="block mb-3 text-sm font-semibold text-gray-500"
                                >
                                  Card Number
                                </label>
                                <input
                                  id="cardnumber"
                                  name="cardnumber"
                                  type="text"
                                  placeholder="0000 0000 0000 0000"
                                  autocomplete="on"
                                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                              </div>
                              <div class="w-full lg:w-1/2">
                                <label
                                  for="expdate"
                                  class="block mb-3 text-sm font-semibold text-gray-500"
                                >
                                  Valid Through
                                </label>
                                <input
                                  id="expmonth"
                                  name="expdate"
                                  type="number"
                                  min="01"
                                  max="12"
                                  step="1"
                                  placeholder="MM"
                                  class="w-1/2 px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                                <input
                                  id="expyear"
                                  name="expdate"
                                  type="number"
                                  min="2000"
                                  max="2099"
                                  step="1"
                                  placeholder="YYYY"
                                  class="w-1/2 px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                              </div>
                              <div class="w-full lg:w-1/2">
                                <label
                                  for="CVV"
                                  class="block mb-3 text-sm font-semibold text-gray-500"
                                >
                                  CVV
                                </label>
                                <input
                                  id="cvv"
                                  name="cvv"
                                  type="text"
                                  pattern="\d*"
                                  maxlength="3"
                                  placeholder="123"
                                  class="w-1/2 px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                />
                              </div>
                            </div>
                            <div class="flex items-center mt-4">
                              <label class="flex items-center text-sm group text-heading">
                                <input
                                  type="checkbox"
                                  class="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
                                />
                                <span class="ml-2">
                                  Use existing information
                                </span>
                              </label>
                            </div>

                            <div class="relative pt-3 xl:pt-6">
                              <label
                                for="note"
                                class="block mb-3 text-sm font-semibold text-gray-500"
                              >
                                {" "}
                                Notes (Optional)
                              </label>
                              <textarea
                                name="note"
                                class="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                rows="4"
                                placeholder="Notes for delivery"
                              ></textarea>
                            </div>
                            <br />
                            <Link to={`/lastpage`}>
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
                            </Link>
                          </div>
                        </form>
                      </div>
                      <div class="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
                        <div class="pt-12 md:pt-0 2xl:ps-4">
                          <h2 class="text-xl font-bold">Order Summary</h2>

                          <div class="flex p-4 mt-4">
                            <h2 class="text-xl font-bold">{}</h2>
                          </div>
                          <div class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Subtotal:{" "}
                            <span class="ml-2">{productTotalprice}</span>
                          </div>
                          <div class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Taxes: <span class="ml-2">{taxPrice}</span>
                          </div>
                          <div class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Shipping Price:
                            <span class="ml-2">{shippingPrice}</span>
                          </div>
                          <div class="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                            Total: <span class="ml-2">{totalPrice} </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </body>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;
