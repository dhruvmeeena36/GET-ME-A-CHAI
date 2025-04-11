"use client"; // Enables client-side rendering in Next.js

// Import necessary dependencies
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Search from "./Search"; // Importing the Search component
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession(); // Retrieves authentication session data
  const [showDropDown, setShowDropDown] = useState(false); // State for dropdown visibility

  return (
    <nav>
      {/* Navbar container */}
      <div className="bg-gray-900 text-white flex justify-between items-center px-5 md:px-10 pt-2 h-16">

        {/* Logo Section */}
        <div className="logo font-bold md:text-lg">
          <Link href={'/'}>
            {/* Display text logo on larger screens and icon on small screens */}
            <span className="hidden md:block">GetMeAChai!</span>
            <span className="block md:hidden">
              <Image
                src="/tea.gif"
                alt="Tea Logo"
                className="bg-blend-luminosity w-[60px] pb-6"
              />
            </span>
          </Link>
        </div>

        {/* Right Section: Search bar, User Dropdown, Login/Logout */}
        <div className="relative flex">
          <Search /> {/* Search component */}

          {/* If user is logged in, show dropdown */}
          {session ? (
            <>
              {/* Dropdown button */}
              <button
                className="text-white mx-1 md:mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-3 md:px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2"
                type="button"
                onClick={() => setShowDropDown(!showDropDown)} // Toggle dropdown on click
                onBlur={() => setTimeout(() => setShowDropDown(false), 300)}
              >
                {/* When user clicks outside, dropdown disappears after 300ms */}
                <span className="hidden md:inline">Welcome&nbsp;</span>
                <span>{session.user.name}</span>
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Dropdown menu  
              If showDropDown === true, it removes hidden, making the dropdown visible.
              If showDropDown === false, it adds hidden, making the dropdown invisible. */ }
              <div
                id="dropdown"
                className={`z-10 ${showDropDown ? "" : 'hidden'} absolute top-12 right-0 md:right-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    {/* Navigate to Dashboard */}
                    <Link
                      href={"/profile"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    {/* Navigate to User's Payment Page */}
                    <Link
                      href={`/${session.user.name}`}  //NAME VHI JO USERNAME BAN CHUKA THA 
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Your Page
                    </Link>
                  </li>
                  <li>
                    {/* Logout */}
                    <Link
                      href="/"
                      onClick={() => signOut()} // Calls signOut function from NextAuth
                      className="block px-4 py-2 border border-x-0 border-b-0 rounded-sm border-t-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Hidden Logout button (extra) */}
              <button
                type="button"
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 hidden"
                onClick={() => signOut()}
              >
                LogOut
              </button>
            </>
          ) : (
            // If user is not logged in, show Login button
            <Link href={"/login"}>
              <button
                type="button"
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 mb-2"
              >
                LogIn
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
