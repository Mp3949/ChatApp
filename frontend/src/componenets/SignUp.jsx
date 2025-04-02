import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'


const SignUp = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/register`, user, {
        headers: {
          'Content-Type': "application/json"
        },
        withCredentials: true
      });
      
      // console.log("Full response:", res); // Log the entire response
      // console.log("Response data:", res.data); // Log just the data part
      
      // More flexible response handling
      if (res.data && (res.data.success || res.data.message)) {
        navigate("/login");
        toast.success(res.data.message || "Registration successful!");
      } else {
        // Handle case where success flag is missing but request technically succeeded
        toast.warning("Registration completed, but no success flag received");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error:", error);
      
      // Better error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log("Error response data:", error.response.data);
        toast.error(error.response.data.message || "Registration failed");
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Error request:", error.request);
        toast.error("No response from server");
      } else {
        // Something happened in setting up the request
        console.log("Error message:", error.message);
        toast.error("Request setup error");
      }
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: ""
    })
  }

  return (
    <div className='min-w-96 mx-auto' >
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center text-gray-300'>Sign Up</h1>

        <form onSubmit={onSubmitHandler}>
          {/* Full Name */}
          <div className='mb-4'>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              className='w-full input input-bordered h-10'
              type="text"
              name="fullName"
              placeholder='Full Name'
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              required
            />
          </div>

          {/* Username */}
          <div className='mb-4'>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              className='w-full input input-bordered h-10'
              type="text"
              name="username"
              placeholder='Username'
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className='mb-4'>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              className='w-full input input-bordered h-10'
              type="password"
              name="password"
              placeholder='Password'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className='mb-4'>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              className='w-full input input-bordered h-10'
              type="password"
              name="confirmPassword"
              placeholder='Confirm Password'
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              required
            />
          </div>

          <div className='flex items-center'>
            <div className='flex items-center my-4'><p>Male:</p><input type="checkbox" checked={user.gender === "male"} onChange={() => handleCheckbox("male")} className="checkbox mx-2" /></div>
            <div className='flex items-center'><p>Female:</p><input type="checkbox" checked={user.gender === "female"} onChange={() => handleCheckbox("female")} className="checkbox mx-2" /></div>
          </div>

          <div className='w-full mx-auto flex items-center text-center'>
            <p className='text-center my-2'>Already have na account?</p>
            <Link className='text-center' to="/login">Login</Link>
          </div>

          <div>
            <button
              type="submit"
              className='btn btn-block btn-sm mt-2 border border-slate-100'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div >
  );
};




export default SignUp;