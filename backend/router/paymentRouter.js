const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const jwt = require('jsonwebtoken');
const User = require('../model/UserModel')


// creating middleware to fetch user
const fetchUser = async(req,res,next)=>{
    const token = await req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }else{
        try{
           const data = await jwt.verify(token,'secret_ecom');
           req.user = data.user;
           next();
        }catch(error){
           res.status(401).send({errors:"Please aurhenticate using valid token"})
        }
    } 
   } 

const razorpay = new Razorpay({
    key_id : "rzp_test_o2q5XRREjVhw6K",
    key_secret : "av07MHftwsurRww0LkCvomr4"
})

router.post("/makepayment", async(req,res)=>{
    const { amount, currency, receipt} = req.body;
   console.log(req.body)
    try{

        const payment = await razorpay.orders.create({
            amount : amount * 100,
            currency,
            receipt
        })
 
        console.log(payment)
        return res.json(payment)
    }catch(error){
        res.status(500).send(error)
    }
})

router.post('/purchasehistory', fetchUser, async(req,res)=>{
     
    const findUser = await User.findOne({_id : req.user.id})
    console.log(findUser);
    res.send("Success"); 
}); 


module.exports = router; 

// Razorpay KEY_ID = rzp_test_o2q5XRREjVhw6K
// Razorpay KEY_SECRET = av07MHftwsurRww0LkCvomr4