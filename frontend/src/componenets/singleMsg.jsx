import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { extractTime } from '../utils/extratTime';

const SingleMsg = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector(store => store.user);
  const formatedTime = extractTime(message.createdAt);
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);
  return (
    <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Anakin Skywalker"
            src={message.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto}
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 ml-1">
          {formatedTime}
        </time>
      </div>
      <div className={`chat-bubble rounded-xl ${authUser?._id !== message?.senderId ? ' bg-gray-200  text-black' : ' bg-gray-900 text-white'}`}>{message?.message}</div>
      {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
    </div>
    // </div>
  );
};

export default SingleMsg;