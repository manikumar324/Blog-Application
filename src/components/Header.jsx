import React from "react";
import { AppBar, Button, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from cookies
    Cookie.remove("userToken");

    // Show a toast notification
    toast.success("Logged out successfully!");

    // Navigate to the login page
    navigate("/");
  };

  const storedUser = JSON.parse(localStorage.getItem("blogUser"));
  const name = storedUser ? storedUser.name : "Guest";
  const firstLetter = name[0].toUpperCase();

  return (
    <AppBar className="!bg-white">
      <Toaster />
      <Toolbar className="gap-5 justify-center !font-semibold text-black">
        <Link to="/home" className="border-none outline-none ">HOME</Link>
        <Link to="/about" className="border-none outline-none">ABOUT</Link>
        <Link to="/contact" className="border-none outline-none">CONTACT</Link>
        {/* <button className='bg-red-500 flex justify-center items-center rounded-full p-3 h-7 w-7'
        onClick={handleLogout}>
                 <h1 className='font-bold text-spotify-accent'>{firstLetter}</h1>
        </button> */}
        <Button className="!bg-red-600 !text-black" onClick={handleLogout}>LOGOUT</Button>

      </Toolbar>
    </AppBar>
  );
};

export default Header;
