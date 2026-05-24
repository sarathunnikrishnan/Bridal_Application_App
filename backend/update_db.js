const mongoose = require("mongoose");
const Product = require("./model/ProductModel");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(`${process.env.MONGODB_URI}/bridal-application`)
  .then(async () => {
    console.log("MongoDB Connected");

    try {
      // Get all products
      const products = await Product.find({});

      console.log(`Found ${products.length} products to update.`);

      // Update image URLs
      for (const product of products) {
        if (product.image && product.image.includes("http://localhost:4000")) {
          product.image = product.image.replace("http://localhost:4000", "");

          // Save updated product
          await product.save();

          console.log(`Updated product: ${product._id}`);
        }
      }

      console.log("Products updated successfully.");
      process.exit(0);
    } catch (error) {
      console.error("Error updating products:", error);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
