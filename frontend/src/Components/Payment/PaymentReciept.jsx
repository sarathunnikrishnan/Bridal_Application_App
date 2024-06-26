import React from 'react'
import './PaymentReciept.css';

const PaymentReciept = (props) => {

   console.log(props.value);
   const {razorpay_order_id, razorpay_payment_id} = props.value;

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
                            <p>Order Number: <strong>{razorpay_order_id}</strong></p>
                            <p>Payment ID: <strong>{razorpay_payment_id}</strong></p>
                            <p>Total Amount: <strong>$299.99</strong></p>
                        </div>
                        <a href="/" class="btn btn-custom btn-lg">Continue Shopping</a>
                        <a href="/order-history" class="btn btn-light btn-lg">View Order History</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default PaymentReciept