import React, { useEffect } from 'react'
import './PaymentReciept.css';
import { BridalContext } from '../../Context/BridalContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentReciept = (props) => {
   const { cartItem, removeFromCart, all_product } = useContext(BridalContext);
   const { response , totalAmount } = props.value;
   const navigate = useNavigate(); 

 useEffect(()=>{
    all_product.forEach((e)=>{
          if(cartItem[e.id]>0){
             removeFromCart(e.id)
          }
    })
 },[cartItem,all_product,removeFromCart])

  return (
    <div className="body">
    <div className="container text-center">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title">Thank You for Your Purchase!</h1>
                        <p className="card-text">Your order has been successfully placed. We appreciate your business and hope you enjoy your new bridal items.</p>
                        <div className="order-summary my-4">
                            <h3>Order Summary</h3>
                            <p>Order Number: <strong>{response.razorpay_order_id}</strong></p>
                            <p>Payment ID: <strong>{response.razorpay_payment_id}</strong></p>
                            <p>Total Amount: <strong>₹{totalAmount}</strong></p>
                        </div>
                        <button className="btn btn-custom btn-lg" onClick={()=>navigate('/bridal')}>Continue Shopping</button>
                    </div>
                </div>
            </div> 
        </div>
    </div>
    </div>
  )
}

export default PaymentReciept