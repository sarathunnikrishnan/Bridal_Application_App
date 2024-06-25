

const mongoose = require('mongoose');

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

module.exports = Product;