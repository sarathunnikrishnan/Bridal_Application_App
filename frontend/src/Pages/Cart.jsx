import React from 'react'
import CartItems from '../Components/CartItems/CartItems';
import LoginSignup from './LoginSignup';

const Cart = () => {
  console.log(localStorage.getItem('auth_token'))
  return (
    <div>
      {
        (!localStorage.getItem('auth_token')) ? (<LoginSignup/>) : (<CartItems/>)
      }
    </div>
  )
}

export default Cart
