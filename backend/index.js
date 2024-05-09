const port = 4000;
const express = require('express');
const app = express();
const mangoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { default: mongoose } = require('mongoose');
const { error } = require('console');
const { allowedNodeEnvironmentFlags } = require('process');

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb://localhost:27017/bridal-application");

// API Creation
app.get("/",(req,res)=>{
    res.send("Express App is Running");
})

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

// Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'),(req,res)=>{
     res.json({
        success : 1,
        image_url : `http://localhost:${port}/images/${req.file.filename}`
     })
})
// Creating Upload Photography Images
app.post("/photoupload", upload.array('product', 3),(req,res)=>{
    let imageUrls = [];
    req.files.forEach((file, index) => {
        imageUrls.push(`http://localhost:${port}/images/${file.filename}`);
    });
    res.json({
       success : 1,
       imageUrls: imageUrls
    }) 
})

// Schema for Creating Products
const Product = mongoose.model("Product",{
    id:{
        type:Number,
    },
    name:{
        type:String,
    },
    place:{
        type:String,
    },
    image:{
        type:String,
    },
    image1:{
        type:String,
    },
    image2:{
        type:String,
    },
    category:{
        type:String,
    },
    new_price:{
        type:Number,
    },
    old_price:{
        type:Number, 
    },
    veg_price:{
        type:Number, 
    },
    non_price:{
        type:Number, 
    },
    person_min:{
        type:Number, 
    },
    person_max:{
        type:Number, 
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }
})

app.post('/addproduct', async(req, res)=>{
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
})

// Creating API For Deleting Products
app.post('/removeproduct', async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

// Creating API for Getting All Products
app.get('/allproducts', async(req,res)=>{
    let products = await Product.find({});
    console.log("All Product Fetched");
    res.send(products);
})

// Shema creating for User model

const Users = mongoose.model('Users',{
    name:{
        type: String
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    Date:{
        type:Date,
        default:Date.now,
    }
})

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

// Creating Endpoint for new Collections Data
app.get('/newcollections', async(req,res)=>{
    let products = await Product.find({});

    let bridalCollection = products.filter(product => 
        product.category === 'women' ||
        product.category === 'men' ||
        product.category === 'kid'
    );

    let newcollection = bridalCollection.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

// Creating Endpoint Popular in Women section
app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0, 4);
    console.log("popular_in_women Fetched");
    res.send(popular_in_women);
})


// creating middleware to fetch user
   const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }else{
        try{
           const data = jwt.verify(token,'secret_ecom');
           req.user = data.user;
           next();
        }catch(error){
           res.status(401).send({errors:"Please aurhenticate using valid token"})
        }
    } 
   }

// Creating Endpoint for adding product in cartData
app.post('/addtocart', fetchUser ,async(req,res)=>{
    console.log("Added", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Added");
})

// creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async(req,res)=>{
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Removed");
} )

//Creating Endpoint to get cartdata
app.post('/getcart', fetchUser, async(req,res)=>{
    console.log("Get Cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port, (error)=>{
    if(!error){
        console.log("Server Running On Port "+ port)
    }else{
        console.log("Error : "+ error)
    }
})