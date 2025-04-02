import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/msgSlice';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    useEffect(() => {

        if (!selectedUser?._id) {
            console.log('No selected user ID');
            return;
        }

        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(
                    `http://localhost:8080/api/v1/message/${selectedUser._id}`
                );
                // console.log(res); // Will show response
                dispatch(setMessages(res.data));
            } catch (error) {
                console.error('API Error:', error.response?.data || error.message);
            }
        };

        fetchMessages();
    },[selectedUser, dispatch]); // Re-run when selectedUser changes
};

export default useGetMessages