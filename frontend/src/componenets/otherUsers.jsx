import React from 'react';
import OtherUser from './otherUser';
import useGetOtherUsers from '../hook/useGetOtherUsers';
import { useSelector } from 'react-redux';

const OtherUsers = () => {
    // my custom hooks
    useGetOtherUsers();
    const { otherUsers } = useSelector(store => store.user);
    if (!otherUsers) return; //early return in react
    return (
        <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 flex-1"> {/* Add fixed height */}
            {
                otherUsers?.map((user) => {
                    return (
                        <OtherUser key={user._id} user={user}/>
                    )
                })
            }
        </div>
    )
}

export default OtherUsers;