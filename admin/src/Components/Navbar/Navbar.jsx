// import React from 'react'
import './Navbar.css'
import navProfile from '../../assets/nav-profile.svg'


const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo col-8 col-md-4">
         <p className="nav-logo-head" >BLACK & WHITE</p>
         <p className="nav-logo-quote">Admin Panel</p>
      </div>
      <div className="nav-profile col-2 col-md-2">
         <img src={navProfile} alt="" />
      </div>
    </div>
  )
}

export default Navbar
