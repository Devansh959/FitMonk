import React from 'react'
import "./Navbar.css"
const Navbar = () => {
  return (
    <div>
    <nav className="navbar">
      <div className="logo">FitMonk.</div>
      <ul className="nav-links">
        <li className="nav-item"><a href="/">Home</a></li>
        <li className="nav-item"><a href="/login">Login</a></li>
        <li className="nav-item"><a href="/signup">Signup</a></li>
        
      </ul>
    </nav>
    </div>
  )
}

export default Navbar