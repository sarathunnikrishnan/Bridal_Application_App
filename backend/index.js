// const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const connectDB = require("./common/mongoDB");
require("dotenv").config();
const cors = require("cors");
const os = require("os");
const imagerouter = require("./router/uploadImages");
const productrouter = require("./router/productrouter");
const cartrouter = require("./router/cartrouter");
const makePaymentRouter = require("./router/paymentRouter");
const useraccountrouter = require("./router/userAccount");
const Users = require("./model/UserModel");

app.use(express.json());
app.use(cors());

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// API Creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

app.use("/images", express.static(os.tmpdir()));
app.use("/image", imagerouter);
app.use("/product", productrouter);
app.use("/cart", cartrouter);
app.use("/useraccount", useraccountrouter);
app.use("/order", makePaymentRouter);

// app.listen(port, (error) => {
//   if (!error) {
//     console.log(`Server Running On Port ${process.env.PORT}`);
//   } else {
//     console.log("Error : " + error);
//   }
// });

// Export the Express API for Vercel Serverless Functions
module.exports = app;

// Razorpay KEY_ID = rzp_test_o2q5XRREjVhw6K
// Razorpay KEY_SECRET = av07MHftwsurRww0LkCvomr4
