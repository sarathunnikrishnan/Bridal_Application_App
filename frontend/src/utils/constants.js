export const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const API_ENDPOINTS = {
  SIGNUP: `${BASE_URL}/useraccount/signup`,
  LOGIN: `${BASE_URL}/useraccount/login`,
  SEND_OTP: `${BASE_URL}/useraccount/userotpsend`,
  POPULAR_IN_WOMEN: `${BASE_URL}/product/popularinwomen`,
  NEW_COLLECTIONS: `${BASE_URL}/product/newcollections`,
  ALL_PRODUCTS: `${BASE_URL}/product/allproducts`,
  GET_CART: `${BASE_URL}/cart/getcart`,
  ADD_TO_CART: `${BASE_URL}/cart/addtocart`,
  REMOVE_FROM_CART: `${BASE_URL}/cart/removefromcart`,
  MAKE_PAYMENT: `${BASE_URL}/order/makepayment`,
};

export const RAZORPAY_CONFIG = {
  KEY_ID: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_o2q5XRREjVhw6K',
  CURRENCY: 'INR',
  NAME: 'BLACK & WHITE',
  DESCRIPTION: 'Test Transaction',
  RECEIPT_PREFIX: 'receipt#1',
  PREFILL: {
    NAME: 'Sarath Unnikrishnan',
    EMAIL: 'sarathunnikrishnan18@gmail.com',
    CONTACT: '9961820377',
  }
};
