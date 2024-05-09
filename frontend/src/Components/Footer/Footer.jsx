import React from 'react'
import './Footer.css'
import instagram_logo from '../Assets/instagram_icon.png'
import pintester_logo from '../Assets/pintester_icon.png'
import whatsapp_logo from '../Assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <p>BLACK & WHITE</p>
      </div>
      <ul className='footer-links'>
         <li>Company</li>
         <li>Products</li>
         <li>Offices</li>
         <li>About</li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
            <img src={instagram_logo} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={pintester_logo} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={whatsapp_logo} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
