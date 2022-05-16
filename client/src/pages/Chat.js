import React, { useEffect, useState, useContext } from "react";
import "../style/chat.css";
import { useSubscription, useQuery, useMutation } from "@apollo/client";
import queries from "../queries.js";
import {AiOutlineSend} from 'react-icons/ai';
import { AuthContext } from "../firebase/Auth";



export default function Chat() {
  const { user, isValidUser } = useContext(AuthContext);
  let userUid;
  let userName;
  console.log(user)
  if (isValidUser) {
    userUid = user.uid;
    userName = user.displayName;
  }
  const [msg, setMsg] = useState({message:"", user_name:`${userName}`, date:String(new Date())})
  const [allMessages, setAllMsgs] = useState([]);
  const {
    data: updateData,
    error: updateError,
    loading: updateLoader,
  } = useSubscription(queries.GET_MESSAGE);
  console.log(updateData);
  let { _, error:getErr, data:allMsgs } = useQuery(queries.ALL_MESSAGES, {
    fetchPolicy: "cache-and-network",
  });
  const [addChat, { data:addedMsg, loading, error }] = useMutation(queries.ADD_MESSAGE);

const handleMsg = async() => {
     await addChat({variables:{...msg}})
     .then((res)=>console.log(res))
     .catch((err)=>console.log(err))
}
useEffect(()=>{
  if(allMsgs){
    
    setAllMsgs([...allMsgs.allChats].reverse());
  }
},[allMsgs])
useEffect(()=>{
if(updateData){
console.log(updateData)
setAllMsgs([updateData.addedChat, ...allMessages])
}
},[updateData])

  return (
    <div>
      {allMsgs && allMessages ? allMessages.map((user)=>(
      <div
        className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 message-area"
        role="alert"
      >
        <h5 className="text-2xl font-medium leading-tight mb-2">{user.user_name}</h5>
        <p className="mb-4">
           {user.message}
        </p>
        <p style={{ float: "right", marginTop: "-0.5em", fontSize: "small" }}>
          {new Date(user.date).toLocaleString()}
        </p>
      </div>
      )):(
        <div
        className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 message-area"
        role="alert"
      >
        <p className="mb-4">
              No Messages found
        </p>
       
      </div>
      )}
      <div className="flex justify-center outer-div">
        <div className="mb-3 xl:w-96 input-div">
          <textarea
          disabled={msg.user_name ? false : true}
          value={msg.message}
          onChange={(e)=>setMsg({...msg, message:e.target.value})}
            className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Your message"
          ></textarea>
          <button onClick={()=>handleMsg()}           disabled={msg.user_name ? false : true}
><AiOutlineSend/></button>
        </div>
      </div>
    </div>
  );
}
