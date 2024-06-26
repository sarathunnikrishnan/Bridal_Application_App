import React from 'react'
import CartItems from '../Components/CartItems/CartItems';
import LoginSignup from './LoginSignup';

const Cart = () => {
  return (
    <div>
      {
        (!localStorage.getItem('auth-token')) ? (<LoginSignup/>) : (<CartItems/>)
      }
    </div>
  )
}

export default Cart
