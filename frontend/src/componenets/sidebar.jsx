import React from 'react';
import { FaSearch } from "react-icons/fa";
import OtherUsers from './otherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';

const Sidebar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const { otherUsers, authUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
        } catch (error) {
            console.log(error);
        }
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) => 
            user.fullName.toLowerCase().includes(search.toLowerCase())
        );
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        } else {
            toast.error("User Not found");
        }
    }

    return (
        <div className="flex flex-col h-full border-r border-slate-500">
            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-4">
                <form onSubmit={searchSubmitHandler} className="flex items-center gap-2 mb-4">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered rounded-md w-full"
                        type="text"
                        placeholder="Search..."
                    />
                    <button
                        type="submit"
                        className="btn bg-slate-500 hover:bg-slate-600 text-white"
                    >
                        <FaSearch size="20px" className='outline-none' />
                    </button>
                </form>

                <div className="divider px-3"></div>
                <OtherUsers />
            </div>

            {/* Fixed Bottom Section */}
            <div className='flex flex-row items-center justify-between sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3 shadow-sm'>
                <div className='flex items-center gap-3'>
                    <div className='relative avatar avatar-online'>
                        <div className='w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600'>
                            <img
                                src={authUser?.profilePhoto}
                                alt='User avatar'
                                className='w-full h-full object-cover'
                            />
                        </div>
                    </div>
                    <div>
                        <p className='font-medium text-gray-800 dark:text-gray-100'>{authUser?.fullName}</p>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={logoutHandler}
                    className='px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition-colors'
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;