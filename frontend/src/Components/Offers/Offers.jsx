import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
       <div className="offers-left col-6 col-md-6">
         <h1>Exclusive</h1>
         <h1>Offers For You</h1>
         <p>ONLY ON BEST SELLERS PRODUCT</p>
         <button>Check Now</button>
       </div>
       <div className="offers-right col-6 col-md-6">
         <img src={exclusive_image} alt="" />
       </div>
    </div>
  )
}

export default Offers
