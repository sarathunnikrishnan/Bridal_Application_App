const express = require('express');
const productrouter = express.Router();
const Product = require('../model/ProductModel');

productrouter.post('/addproduct', async(req, res)=>{
    try {
        let products = await Product.find({});
        let id;
        if(products.length>0){
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id+1;
        }else{
            id = 1;
        }
        const product = new Product({
            id:id,
            name:req.body.name,
            place:req.body.place,
            image:req.body.image,
            image1:req.body.image1,
            image2:req.body.image2,
            category:req.body.category,
            new_price:req.body.new_price,
            old_price:req.body.old_price,
            veg_price:req.body.veg_price,
            non_price:req.body.non_price,
            person_min:req.body.person_min,
            person_max:req.body.person_max,
        })
        console.log(product);
        await product.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name,
        })
    } catch (error) {
        console.error("Error in /addproduct:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
})

// Creating API For Deleting Products
productrouter.post('/removeproduct', async(req,res)=>{
    try {
        await Product.findOneAndDelete({id:req.body.id});
        console.log("Removed");
        res.json({
            success:true,
            name:req.body.name
        })
    } catch (error) {
        console.error("Error in /removeproduct:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
})

// Creating API for Getting All Products
productrouter.get('/allproducts', async(req,res)=>{
    try {
        let products = await Product.find({});
        console.log("All Product Fetched");
        res.send(products);
    } catch (error) {
        console.error("Error in /allproducts:", error);
        res.status(500).send({ success: false, message: "Internal Server Error", error: error.message });
    }
})

// Creating Endpoint for new Collections Data
productrouter.get('/newcollections', async(req,res)=>{
    try {
        let products = await Product.find({});

        let bridalCollection = products.filter(product => 
            product.category === 'women' ||
            product.category === 'men' ||
            product.category === 'kid'
        );

        let newcollection = bridalCollection.slice(1).slice(-8);
        console.log("NewCollection Fetched");
        res.send(newcollection);
    } catch (error) {
        console.error("Error in /newcollections:", error);
        res.status(500).send({ success: false, message: "Internal Server Error", error: error.message });
    }
})

// Creating Endpoint Popular in Women section
productrouter.get('/popularinwomen',async(req,res)=>{
    try {
        let products = await Product.find({category:"women"});
        let popular_in_women = products.slice(0, 4);
        console.log("popular_in_women Fetched");
        res.send(popular_in_women);
    } catch (error) {
        console.error("Error fetching popular_in_women:", error);
        res.status(500).send({ success: false, message: "Internal Server Error", error: error.message });
    }
})


module.exports = productrouter;