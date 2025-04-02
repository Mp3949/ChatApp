import React from 'react'
import SingleMsg from './singleMsg'
import useGetMessages from '../hook/useGetMessages'
import { useSelector } from 'react-redux'
import useGetRealTimeMessage from '../hook/useGetRatlTimeMessage'

const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector(store => store.message);

  return (
    <div className='px-4 flex-1 overflow-auto'>                                     
      {
        messages && messages?.map((message) => {
          return (
            <SingleMsg key={message._id} message={message} />
          )
        })
      }

    </div>
  )
}

export default Messages