 const port = 4000;
 const express = require('express');
 const imagerouter = express.Router();
 const uploadImage = require("../multer/multer");

//  const image = require('../upload/images')

// Creating Upload Endpoint for images
imagerouter.post("/upload", uploadImage.single('product'),(req,res)=>{
     res.json({
        success : 1,
        image_url : `http://localhost:${port}/images/${req.file.filename}`
     })
})
// Creating Upload Photography Images
imagerouter.post("/photoupload", uploadImage.array('product', 3),(req,res)=>{
    let imageUrls = [];
    req.files.forEach((file, index) => {
        imageUrls.push(`http://localhost:${port}/images/${file.filename}`);
    });
    res.json({
       success : 1,
       imageUrls: imageUrls
    }) 
})

 module.exports = imagerouter;