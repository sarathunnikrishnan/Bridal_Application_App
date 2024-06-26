import React, { useEffect, useState } from 'react'
import './PaymentReciept.css';
import { BridalContext } from '../../Context/BridalContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const PaymentReciept = (props) => {
   const { cartItem, removeFromCart, all_product } = useContext(BridalContext);
   const { response , totalAmount } = props.value;
   const navigate = useNavigate(); 
   const [purchaseHistory, setPurchaseHistory ] = useState({}); 
  

 useEffect(()=>{
    all_product.forEach((e)=>{
          if(cartItem[e.id]>0){
            setPurchaseHistory(prevHistory => ({
                ...prevHistory,
                [e.id]: (prevHistory[e.id] || 0) + 1
            }));
             removeFromCart(e.id)
          }
    })
 },[cartItem,all_product,removeFromCart])

 const orderHistory = () => {
    const url = "http://localhost:4000/order/purchasehistory"
    axios.post(url, purchaseHistory, {
      headers: {
        Accept: 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error adding item to cart:', error);
    });

  }

//  console.log(user.user, purchaseHistory, "PurchadeHistory")

  return (
    <div className="body">
    <div class="container text-center">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h1 class="card-title">Thank You for Your Purchase!</h1>
                        <p class="card-text">Your order has been successfully placed. We appreciate your business and hope you enjoy your new bridal items.</p>
                        <div class="order-summary my-4">
                            <h3>Order Summary</h3>
                            <p>Order Number: <strong>{response.razorpay_order_id}</strong></p>
                            <p>Payment ID: <strong>{response.razorpay_payment_id}</strong></p>
                            <p>Total Amount: <strong>₹{totalAmount}</strong></p>
                        </div>
                        <button class="btn btn-custom btn-lg" onClick={()=>navigate('/bridal')}>Continue Shopping</button>
                        <button class="btn btn-light btn-lg" onClick={orderHistory}>View Order History</button>
                    </div>
                </div>
            </div> 
        </div>
    </div>
    </div>
  )
}

export default PaymentReciept