import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import {auth} from "../../firebase"
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
const Navbar = (props) => {
  
  const navigate = useNavigate();
  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully")
    }).catch((error) => {
        console.log(error)
    });
}
  return (
    <div>
    <nav className="navbar">
      <div className="logo">FitMonk.</div>
      <ul className="nav-links">
        
        <li className="nav-item"><a href="/">Home</a></li>
        {props.user?
       <><li className="nav-item"><a href="/product">Product</a></li>
        <li className="nav-item"><a href="/" onClick={handleLogout}>Logout</a></li>
        </>
        :
        
        <><li className="nav-item"><a href="/login">Login</a></li>
        <li className="nav-item"><a href="/signup">Signup</a></li></>}
        
        
      </ul>
    </nav>
    </div>
  )
}

export default Navbar