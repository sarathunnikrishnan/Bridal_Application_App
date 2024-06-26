const port = 4000;
const express = require('express');
const app = express();
const db = require('./common/mongoDB');
const cors = require("cors");
const imagerouter = require('./router/uploadImages');
const productrouter = require('./router/productrouter');
const cartrouter = require('./router/cartrouter');
const makePaymentRouter = require('./router/paymentRouter')
const useraccountrouter = require('./router/userAccount');
const Users = require('./model/UserModel');
// const { default: mongoose } = require('mongoose');
// const { error } = require('console');
// const { allowedNodeEnvironmentFlags } = require('process');

app.use(express.json());
app.use(cors());

// API Creation
app.get("/",(req,res)=>{
    res.send("Express App is Running"); 
})

app.use('/images', express.static('./upload/images'))
app.use('/image', imagerouter);
app.use('/product', productrouter);
app.use('/cart', cartrouter);
app.use('/useraccount', useraccountrouter); 
app.use('/order', makePaymentRouter);


// Creating Endpoint  for registering the user
app.post('/signup',async(req,res)=>{

   let check = await Users.findOne({email:req.body.email});
   if(check){
    return res.status(400).json({success:false, errors:"Existing User Found With Same Email Address"})
   }
   let cart={};
   for (let i=0; i<300; i++){
    cart[i]=0;
   }
   const user = new Users({
    name : req.body.username,
    email : req.body.email,
    password : req.body.password,
    cartData: cart,
   })

   await user.save();

   const data = {
    user : {
        id: user.id
    }
   }

   const token = jwt.sign(data, 'secret_ecom');
   res.json({success:true, token})

})

// creating End Point for User Login
app.post('/login', async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true,token});
        }else{
            res.json({success:false, errors:"Wrong Password"});
        }
    }else{
        res.json({success:false, errors:"Wrong Email Id"})
    }
})


app.listen(port, (error)=>{
    if(!error){
        console.log("Server Running On Port "+ port)
    }else{
        console.log("Error : "+ error)
    }
})

 

// Razorpay KEY_ID = rzp_test_o2q5XRREjVhw6K
// Razorpay KEY_SECRET = av07MHftwsurRww0LkCvomr4