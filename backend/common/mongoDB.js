
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/bridal-application")
.then(response => console.log("MongoDB Connected"))
.catch(error=> console.log(error));