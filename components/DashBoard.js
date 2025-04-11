"use client"; // Enables client-side rendering in Next.js

// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUser, updateProfile } from '@/action/useractions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify";
import Link from 'next/link';

const DashBoard = () => {
  // Retrieve the user session data
  const { data: session, update } = useSession(); //Used to redirect users to /login if not authenticated.
  const router = useRouter(); //Used to redirect users to /login if not authenticated.
  const [form, setForm] = useState({}); // State to store user data

  // Fetch user data and redirect if not logged in
  useEffect(() => {
    const getData = async () => {
      let user = await fetchUser(session?.user?.name);
      setForm(JSON.parse(user));
    };
  
    if (session) {
      getData();
    }
  }, [session]); // ✅ Runs only when session changes
  

  // Function to fetch user details from the database
  const getData = () => {
    if (session) {
      fetchUser(session.user.name).then((data) => { // PURA USER HI AA GAYA IS SE 
        setForm(JSON.parse(data)); // Parse the JSON data and set it in the state
      });
    }
  }; 
  /*{ YE USER A GYA AND FORM MAI STORE HO GYA
  "name": "Dhruv Meena",
  "email": "dhruvmeena@gmail.com",
  "username": "dhruvmeena",
  "profilepicture": "https://example.com/profile.jpg"
}*/

  // Handles input changes, including formatting the username
  const handleChange = (e) => {
    if (e.target.name === 'username') {
      // Format the username to ensure it's lowercase and doesn't contain special characters
      const name = e.target.value;
      const slugName = name.split(/[^\w-]+/).join("").toLowerCase();
      setForm({
        ...form,
        [e.target.name]: e.target.value,     // jo bhi new data aayega vo form mai add hota jyega 
        username: slugName  // username bhi form mai aa jyega 
      });/*
      \w → Keeps letters, numbers, and underscores.
      - → Keeps hyphens.
      [^...] → Removes everything except allowed characters.
      Converts the username to lowercase (toLowerCase()).
      ex:- "Dhruv@Meena!"	  become   "dhruvmeena"
      */

    } else {
      setForm({  //Updates only the changed field.
        ...form,
        [e.target.name]: e.target.value
      });
    }
  };

  // Handles form submission and updates the user profile
  const handelSubmit = async (e) => { //EVENT LIYA ISMAI AND UPDATE KAR DIYA
    let response = await updateProfile(e, session.user.name); // e = jo jo hum new kar rhe hai , session.user.name = current username
    await update(); // Refresh session data after update
    const result = JSON.parse(response);

    // Display success notification
    toast(result.message, {
      position: "top-right",
      autoClose: 5000,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <>
      {/* Toast notifications for displaying success or error messages */}
      <ToastContainer position="top-right" autoClose={5000} theme="dark" transition="Bounce" />

      <div className='min-h-screen'>
        {/* Page Title */}
        <h2 className='text-2xl font-bold text-center py-5'>Welcome to your dashboard</h2>

        {/* Profile Update Form */}
        <form className="max-w-sm md:max-w-lg mx-auto pb-5 px-3 md:px-0" action={handelSubmit}>
          
          {/* Name Input */}
          <div className="mb-1">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-blue-300">Name</label>
            <input 
              type="text" 
              value={form.name || ""}   //value={form.name || ""} → Displays the user's current name.
              onChange={handleChange} 
              name='name' 
              id="name" 
              className="input-style w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          {/* Email Input (Read-Only) */}
          <div className="mb-1">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue-300">Email</label>
            <input 
              type="email" 
              value={form.email || ""} 
              name='email' 
              id="email" 
              readOnly
              className="input-style cursor-not-allowed w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 " 
              title="Email can't be modified" 
            />
          </div>

          {/* Username Input */}
          <div className="mb-1">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-blue-300">Username</label>
            <input 
              type="text" 
              value={form.username || ""} 
              onChange={handleChange} 
              name='username' 
              id="username" 
              className="input-style w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          {/* Profile Picture Input */}
          <div className="mb-1">
            <label htmlFor="profilpicture" className="block mb-2 text-sm font-medium text-blue-300">Profile Picture</label>
            <input 
              type="url" 
              value={form.profilpicture || ""} 
              onChange={handleChange} 
              name='profilpicture' 
              id="profilpicture" 
              className="input-style w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 " 
            />
          </div>

          {/* Cover Picture Input */}
          <div className="mb-1">
            <label htmlFor="coverpicture" className="block mb-2 text-sm font-medium text-blue-300">Cover Picture</label>
            <input 
              type="url" 
              value={form.coverpicture || ""} 
              onChange={handleChange} 
              name='coverpicture' 
              id="coverpicture" 
              className="input-style w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          {/* Razorpay ID Input */}
          <div className="mb-1">
            <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-blue-300">Razorpay ID</label>
            <input 
              type="text" 
              value={form.razorpayid || ""} 
              onChange={handleChange} 
              name='razorpayid' 
              id="razorpayid" 
              className="input-style w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 " 
            />
          </div>

          {/* Razorpay Secret Input */}
          <div className="mb-5">
            <label htmlFor="razorpaySecret" className="block mb-2 text-sm font-medium text-blue-300">Razorpay Secret</label>
            <input 
              type="text" 
              value={form.razorpaySecret || ""} 
              onChange={handleChange} 
              name='razorpaySecret' 
              id="razorpaySecret" 
              className="input-style w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 
                    focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          {/* Save Button */}
          <button 
            className="text-blue-300 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center 
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Save
          </button>
          
        </form>
      </div>
    </>
  );
};

export default DashBoard;
