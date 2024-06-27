const express = require('express');
const useraccountrouter = express.Router();
const Users = require('../model/UserModel');
const jwt = require("jsonwebtoken");
const userotp = require("../model/userOtpModel");
const sendMail = require("../common/nodemailer");
const bcrypt = require("bcrypt");
const validation = require('../common/validation');


// Creating Endpoint  for registering the user
useraccountrouter.post('/signup',async(req,res,next)=>{
    
    try{
        const { formData, otp} = req.body;
        const parsedFormData = JSON.parse(formData)
        const { email } =  parsedFormData;  
        const findUser = await userotp.findOne({ email }) 
    
        if(otp == findUser.otp){
           next(); 
        }else{
            return res.json({ success: false, error: "Incorrect OTP" })
        }
        }catch (error) {
            console.error('Error during signup:', error);
            res.send({ message: 'Internal server error' });
          }
},async(req,res)=>{
    const { formData } = req.body;
        const parsedFormData = JSON.parse(formData)
        const { username, email, password} =  parsedFormData;  
        const passwordHash = await bcrypt.hash(password, 10)
    let check = await Users.findOne({email});
    if(check){
     return res.status(400).json({success:false, errors:"Existing User Found With Same Email Address"})
    }
    let cart={};
    for (let i=0; i<300; i++){
     cart[i]=0; 
    }
    const user = new Users({
     name : username,
     email : email,
     password : passwordHash,
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
 useraccountrouter.post('/login',(req,res,next)=>{
    if(validation.validateEmail("Email ", req.body.email) !== ""){
        return res.json({success : false, error: validation.validateEmail("Email ", req.body.email)})
     }
     if(!req.body.password){
        return res.json({success: false , error: "Please Enter Your Password"})
     }
    
     next();
 }, async(req,res)=>{
     let user = await Users.findOne({email:req.body.email});
     if(user){
         const passCompare = await bcrypt.compare(req.body.password , user.password)
         if(passCompare){
             const data = {
                 user: {
                     id: user.id
                 }
             }
             const token = jwt.sign(data, 'secret_ecom');
             res.json({success:true,token});
         }else{
             res.json({success:false, error:"Wrong Password"});
         }
     }else{
         res.json({success:false, error:"Wrong Email Id"})
     }
 })

useraccountrouter.post('/userotpsend',(req,res,next)=>{

    const { username, email, password} = req.body;

         if(validation.validateStr("Username", username) !== ""){
            return res.json({success : false, error: validation.validateStr("Username", username)})
         }
         if(validation.validateEmail("Email ", email) !== ""){
            return res.json({success : false, error: validation.validateEmail("Email ", email)})
         }
         if(validation.validatePassword("Password", password) !== ""){
            return res.json({success : false, error : validation.validatePassword("Password", password)})
         }
    
         next();

}, async(req,res)=>{

    const { email, username } = req.body; 
    console.log(email)

    try {
        const existEmail = await userotp.findOne({ email: email });
        if (!existEmail) {
            let OTP = Math.floor(100000 + Math.random() * 900000).toString();
            const presuer = await userotp.create({ email: email, otp: OTP });

            if (presuer) {
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending Email For OTP Validation",
                    html : `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            background-color: #ffffff;
            margin: 30px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
        }
        .email-header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #dddddd;
        }
        .email-header img {
            width: 100px;
        }
        .email-content {
            padding: 20px;
            text-align: center;
        }
        .email-content h2 {
            color: #333333;
        }
        .email-content p {
            color: #666666;
        }
        .otp-code {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            font-size: 24px;
            letter-spacing: 5px;
            color: #ffffff;
            background-color: #007BFF;
            border-radius: 5px;
        }
        .email-footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #dddddd;
            color: #999999;
        }
        .nav-logo-head{
             font-family: "Abril Fatface", serif;
             font-weight: 400;
             font-style: normal;
             font-size: 22px;
              margin-top: .2rem;
             padding-top: .2rem;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <p class="nav-logo-head">BLACK & WHITE</p>
        </div>
        <div class="email-content">
            <h2>Verify Your Email Address</h2>
            <p>Dear ${username},</p>
            <p>Thank you for creating an account with us. To complete your registration, please enter the following OTP code on the verification page:</p>
            <div class="otp-code">${OTP}</div>
            <p>If you did not request this, please ignore this email.</p>
        </div>
        <div class="email-footer">
            <p>&copy; 2024 Black & White. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
                }; 

                sendMail.triggerMail(mailOptions, (err, mailSend)=>{
                    if(err){
                      res.send(err)
                    }else{
                      res.send("OTP Send Your Gmail Account");
                    }
                })
            } else {
                return res.send({ error: "Email can't be created" });
            }
        } else {
            return res.send({ error: "Email already exists" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error", details: error });
    } 
})
     
module.exports = useraccountrouter;