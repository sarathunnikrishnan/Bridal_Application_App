 const port = 4000;
 const express = require('express');
 const imagerouter = express.Router();
 const uploadImage = require("../multer/multer");

//  const image = require('../upload/images')

// Creating Upload Endpoint for images
imagerouter.post("/upload", uploadImage.single('product'),(req,res)=>{
    try {
        res.json({
           success : 1,
           image_url : req.file.path
        })
    } catch (error) {
        console.error("Error in /upload:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
})
// Creating Upload Photography Images
imagerouter.post("/photoupload", uploadImage.array('product', 4),(req,res)=>{
    try {
        let imageUrls = [];
        req.files.forEach((file, index) => {
            imageUrls.push(file.path);
        });
        res.json({
           success : 1,
           imageUrls: imageUrls
        }) 
    } catch (error) {
        console.error("Error in /photoupload:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
})

 module.exports = imagerouter;