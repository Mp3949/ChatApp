import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/msgSlice";
import notifiSound from '../assets/preview.mp3';


const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const { messages } = useSelector(store => store.message);
    const dispatch = useDispatch();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            const sound = new Audio(notifiSound);
            sound.play();
            dispatch(setMessages([...messages, newMessage]));
        });
        return () => socket?.off("newMessage");
    }, [ messages, dispatch, socket]);
};
export default useGetRealTimeMessage