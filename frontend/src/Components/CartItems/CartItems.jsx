import React, { useContext } from 'react'
import './CartItems.css'
import { BridalContext } from '../../Context/BridalContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { Container } from 'react-bootstrap'

const CartItems = () => {

    const { all_product, cartItem, removeFromCart, getTotalCartAmount} = useContext(BridalContext)
  return (
    <div className='cartitems'>
      <Container>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr/>
      {
        all_product.map((e)=>{
            if(cartItem[e.id]>0){
                return (
                    <div>
                    <div className="cartitems-format cartitems-format-main">
                        <img src={e.image} alt="" className='carticon-product-icon'/>
                        <p>{e.name}</p>
                        <p>₹{e.new_price}</p>
                        <button className='cartitems-quantity'>{cartItem[e.id]}</button>
                        <p>₹{e.new_price*cartItem[e.id]}</p>
                        <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                    </div>
                    <hr /> 
                  </div>
                )
            }else{
                return null;
            }
        })
      }
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cartitems-total-item'>
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Total</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
          </div>
          <button>PROCCED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitem-promobox">
            <input type="text" placeholder='Promo Code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
      </Container>
    </div>
  )
}

export default CartItems
