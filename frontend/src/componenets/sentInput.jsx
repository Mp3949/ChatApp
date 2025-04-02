import React, { useState } from 'react'
import { RiSendPlane2Fill } from "react-icons/ri";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/msgSlice';


const SentInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user);
  const { messages } = useSelector(store => store.message);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser?._id}`, { message },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
      // console.log(res);
      dispatch(setMessages([...messages, res?.data?.newMessage]));

    } catch (error) {
      console.log(error);
    }
    // alert(message);
    setMessage("");
  }


  return (
    <form onSubmit={onSubmitHandler} className='px-4 my-3'>
      <div className='w-full relative'>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Sent a message...'
          className='border text-md rounded-md block w-full bg-gray-600 text-white p-3 border-zinc-500' />
        <button type='submit' className='absolute flex items-center inset-y-0 end-0 pr-4'> <RiSendPlane2Fill /></button>
      </div>
    </form>
  )
}

export default SentInput