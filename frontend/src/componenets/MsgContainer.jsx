import React from 'react'
import SentInput from './sentInput'
import Messages from './Messages'
import { useSelector } from 'react-redux'
// import { setSelectedUser } from '../redux/userSlice'

const MsgContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
  const isOnline = onlineUsers.includes(selectedUser?._id);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => dispatch(setSelectedUser(null));
  // }, []);
  return (
    <>
      {
        selectedUser !== null ? (<div className='md:min-w-[550px] flex flex-col h-full'>

          <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2'>
            <div className={`avatar ${isOnline ? 'avatar-online' : ''}`}>
              <div className='w-10 rounded-full'>
                <img src={selectedUser?.profilePhoto} alt="" />
              </div>
            </div>
            <div className='flex flex-col flex-1'>
              <div className='flex justify-between gap-2 font-medium'>
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>

          <div className='flex-1 overflow-y-auto'>
            <Messages />
          </div>

          <div className='sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
            <SentInput />
          </div>
        </div>) : (
          <div className='md:min-w-[550px] flex flex-col h-full justify-center items-center '>
            <h1 className='text-4xl font-bold'>Hi, {authUser?.fullName}</h1>
            <h1 className='text-2xl '>Let's Start Conversations</h1>
          </div>
        )
      }
    </>

  )
}

export default MsgContainer