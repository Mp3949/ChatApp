import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './componenets/HomePage';
import SignUp from './componenets/SignUp';
import Login from './componenets/Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/register",
    element: <SignUp />
  },
  {
    path: "/login",
    element: <Login />
  },
])

function App() {
  const { authUser } = useSelector(store => store.user);
  const { socket } = useSelector(store => store.socket);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:8080', {
        query: {
          userId: authUser._id
        }
      });
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser, dispatch, socket]);


  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
