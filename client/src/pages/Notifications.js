
import React, { useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import { useQuery } from "@apollo/client";
import queries from "../queries.js";

export default function Notifications() {

    const [notifications, setNotifications] = useState([])
    const {data, loading, error, refetch} = useQuery(queries.ALL_NOTIFICATIONS);

           console.log(notifications)
    useEffect(async()=>{
       await refetch()
       if(data){
       setNotifications(data.notifications)
       }
    },[1])

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            onClick={() => refetch()}
            className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md  px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span>Notifications</span>
            <ChevronDownIcon
              className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                  {data &&
                    data.notifications &&
                    data.notifications.map((item) => (
                      <div className="bg-blue-100 rounded-lg py-2 px-2 mb-4 text-base text-blue-700 mb-1">
                        <span
                          className="font-bold text-blue-800"
                          style={{ paddingRight: "5px" }}
                        >
                          {item.user_name}
                        </span>
                        <span>added a Post</span>
                      </div>
                    ))}
                  {error && (
                    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4">
                      <span className="font-bold text-orange-800">
                        {error.message}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

