import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { AuthContext } from "../firebase/Auth";
import { doSignOut } from "../firebase/FirebaseFunctions";
import { useNavigate } from "react-router-dom";
import Notifications from '../pages/Notifications'

let userInfo = {
  name: "Guest",
  email: "guest@stevens.edu",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Explore", href: "/", current: true },
  { name: "Projects", href: "/projects", current: false },
  { name: "Create", href: "/create", current: false },
];
let userNavigation;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const { user, userUpdate, isValidUser } = useContext(AuthContext);
  const { displayName, email } = user || "";
  const navigate = useNavigate();

  const signOut = async (e) => {
    e.preventDefault();
    await doSignOut();
    //Clear AuthContext
    userUpdate(null);
  };

  const signIn = async (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  userNavigation = [
    { name: "Your Profile", href: "/profile" },
    { name: "Your Orders", href: "/myorders" },
    { name: "Settings", href: "/settings" },
    { name: "Chatting", href: "/chat"}
  ];

  if (isValidUser) {
    userNavigation.push({
      name: "Sign out",
      href: "#",
      clickHandle: signOut,
    });
    userInfo.name = displayName;
    userInfo.email = email;
  } else {
    userNavigation.push({
      name: "Sign in",
      href: "/signin",
      clickHandle: signIn,
    });
    userInfo.name = "Guest";
    userInfo.email = "guest@stevens.edu";
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          "px-3 py-2 rounded-md text-sm font-medium" +
                          (isActive
                            ? " bg-gray-900 text-white"
                            : " text-gray-300 hover:bg-gray-700 hover:text-white")
                        }
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                    <Notifications />
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {!isValidUser ? (
                    <button
                      onClick={signIn}
                      type="button"
                      className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Login
                    </button>
                  ) : (
                    ""
                  )}
                  <Link to={`/cart`}>
                    <button
                      type="button"
                      className="text-white fill-indigo-500 hover:fill-indigo-300 focus:ring-4 focus:outline-none focus:ring-blue-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2  dark:focus:ring-blue-800"
                    >
                      <svg
                        className="w-5 h-5 mr-2 -ml-1 "
                        fill="indigo-100"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                      </svg>
                      Cart
                    </button>
                  </Link>
                  <Link to={`/contactus`}>
                    <button
                      type="button"
                      className="text-white fill-indigo-500 hover:fill-indigo-300 focus:ring-4 focus:outline-none focus:ring-blue-300 
                    font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2  dark:focus:ring-blue-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="indigo-100"
                        viewBox="0 0 24 24"
                        stroke="black"
                        strokeWidth="1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Contact Us
                    </button>
                  </Link>
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={userInfo.imageUrl}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right z-50 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item key="Your Profile">
                          {({ active }) => (
                            <NavLink
                              to="/profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item key="Your Orders">
                          {({ active }) => (
                            <NavLink
                              to="/myorders"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Orders
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item key="Settings">
                          {({ active }) => (
                            <NavLink
                              to="/settings"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Update Profile
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item key="Chatting">
                          {({ active }) => (
                            <NavLink
                              to="/chat"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              All Chats
                            </NavLink>
                          )}
                        </Menu.Item>
                        {isValidUser ? (
                          <Menu.Item key="Sign Out">
                            {({ active }) => (
                              <a
                                href="/"
                                onClick={signOut}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign Out
                              </a>
                            )}
                          </Menu.Item>
                        ) : (
                          <Menu.Item key="Sign In">
                            {({ active }) => (
                              <a
                                href="/"
                                onClick={signIn}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign In
                              </a>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="div"
                  className={classNames(
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      "px-3 py-2 rounded-md text-sm font-medium" +
                      (isActive
                        ? " bg-gray-900 text-white"
                        : " text-gray-300 hover:bg-gray-700 hover:text-white")
                    }
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </NavLink>
                </Disclosure.Button>
              ))}
              <Notifications />
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={userInfo.imageUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {userInfo.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {userInfo.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="div"
                    onClick={item.clickHandle}
                    className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    {/* <button onClick={item.clickHandle}>{item.name}</button> */}
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
