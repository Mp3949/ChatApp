import { useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchOtherUsres = async () => {
            try {
                axios.defaults.withCredentials = true; //this line is impoetant when middleware is used
                const res = await axios.get(`http://localhost:8080/api/v1/user/`);
                // console.log(res.data);
                //store
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log(error);

            }
        }
        fetchOtherUsres();
    }, [dispatch]);
}

export default useGetOtherUsers