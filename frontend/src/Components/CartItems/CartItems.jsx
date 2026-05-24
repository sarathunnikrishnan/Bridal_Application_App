import React, { useContext } from 'react'
import './CartItems.css'
import { BridalContext } from '../../Context/BridalContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINTS, RAZORPAY_CONFIG } from '../../utils/constants'
const CartItems = () => {

    const { all_product, cartItem, addToCart, removeFromCart, getTotalCartAmount} = useContext(BridalContext);
    const navigate = useNavigate();

    const handlePayment = async()=>{
      const orderUrl = API_ENDPOINTS.MAKE_PAYMENT;

      const response = await axios.post(orderUrl, {
        amount : getTotalCartAmount(),
        currency : RAZORPAY_CONFIG.CURRENCY,
        receipt : RAZORPAY_CONFIG.RECEIPT_PREFIX
      });

      const { id } = response.data;

      const options = {
        key : RAZORPAY_CONFIG.KEY_ID,
        amount : getTotalCartAmount() * 100,
        currency : RAZORPAY_CONFIG.CURRENCY,
        name : RAZORPAY_CONFIG.NAME,
        description : RAZORPAY_CONFIG.DESCRIPTION,
        order_id : id,
        handler : function (response) {
          navigate("/payment", {state :{ response : response, totalAmount : getTotalCartAmount()}});
        },
        prefill : {
          name : RAZORPAY_CONFIG.PREFILL.NAME,
          email : RAZORPAY_CONFIG.PREFILL.EMAIL,
          contact : RAZORPAY_CONFIG.PREFILL.CONTACT
        }
      }

      const rzp1 = new window.Razorpay(options);

      rzp1.open();

    }


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
                        <div className='cartitems-quantity-selector'>
                          <button className='quantity-btn' onClick={()=>{removeFromCart(e.id)}}>-</button>
                          <span className='cartitems-quantity-text'>{cartItem[e.id]}</span>
                          <button className='quantity-btn' onClick={()=>{addToCart(e.id)}}>+</button>
                        </div>
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
          <button onClick={handlePayment}>PROCCED TO CHECKOUT</button>
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
