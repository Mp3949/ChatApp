import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers.includes(user._id);
    const selectedUserHandler = (user1) => {
        dispatch(setSelectedUser(user1));
    }

    return (
        <>
            <div
                onClick={() => selectedUserHandler(user)}
                className={`${selectedUser?._id === user?._id ? 'bg-zinc-200 rounded-md p-2 cursor-pointer text-black' : ''} flex gap-2 items-center  hover:text-black hover:bg-zinc-200 rounded-md p-2 cursor-pointer`}
            >
                <div className={`avatar ${isOnline ? 'avatar-online' : ''}`}>
                    <div className='w-10 rounded-full'>
                        <img
                            src={user?.profilePhoto}
                            alt={user?.fullName || "User avatar"}
                        />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 font-medium'>
                        <p>{user?.fullName}</p>
                    </div>
                </div>
            </div >
            <div className='divider m-0 p-0 h-1'></div>
        </>
    )
}

export default OtherUser;