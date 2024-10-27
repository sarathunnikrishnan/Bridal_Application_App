

const mongoose = require('mongoose')



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
    orderHistory :{
        type : Object
    },
    Date:{
        type:Date,
        default:Date.now,
    }
})

module.exports = Users;