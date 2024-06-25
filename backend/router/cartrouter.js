const express = require('express');
const cartrouter = express.Router();
const Users = require('../model/UserModel');
const jwt = require('jsonwebtoken')


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

// Creating Endpoint for adding product in cartData
cartrouter.post('/addtocart', fetchUser ,async(req,res)=>{
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Added");
})

// creating endpoint to remove product from cartdata
cartrouter.post('/removefromcart', fetchUser, async(req,res)=>{
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Removed");
} )

//Creating Endpoint to get cartdata
cartrouter.post('/getcart', fetchUser, async(req,res)=>{

    console.log("Get Cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData); 
   
})

cartrouter.get('/check', (req,res)=>{
    res.send("Success")
})


module.exports = cartrouter;