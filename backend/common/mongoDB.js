
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(`${process.env.MONGODB_URI}/bridal-application`)
.then(response => console.log("MongoDB Connected"))
.catch(error=> console.log(error)); 