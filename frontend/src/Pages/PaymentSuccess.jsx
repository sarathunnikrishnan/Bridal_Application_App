import React from 'react'
import PaymentReciept from '../Components/Payment/PaymentReciept'
import { useLocation } from 'react-router-dom'

const PaymentSuccess = () => {
  const { state } = useLocation();
  return (
    <div>
        <PaymentReciept value={state}/> 
    </div>
  )
}

export default PaymentSuccess