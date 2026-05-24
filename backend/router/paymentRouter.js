const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');



const razorpay = new Razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})

router.post("/makepayment", async(req,res)=>{
    const { amount, currency, receipt} = req.body;
    try{

        const payment = await razorpay.orders.create({
            amount : amount * 100,
            currency,
            receipt
        })
 
        return res.json(payment)
    }catch(error){
        console.error("Error in /makepayment:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message || error });
    }
})



module.exports = router; 

// Razorpay KEY_ID = rzp_test_o2q5XRREjVhw6K
// Razorpay KEY_SECRET = av07MHftwsurRww0LkCvomr4