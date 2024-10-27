const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');



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



module.exports = router; 

// Razorpay KEY_ID = rzp_test_o2q5XRREjVhw6K
// Razorpay KEY_SECRET = av07MHftwsurRww0LkCvomr4