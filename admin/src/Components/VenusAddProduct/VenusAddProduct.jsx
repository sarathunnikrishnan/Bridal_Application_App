// import React from 'react'
import "../AddProduct/AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { useState } from "react";

const VenusAddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name : "",
        place : "",
        category : "Hall & Catering Service",
        image : "",
        person_min : "",
        person_max : "",
        veg_price : "",
        non_price : "",
        new_price: 0, 
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/image/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/product/addproduct',{
        method : 'POST',
        headers:{
          Accept:'application/json',
          'content-Type' : 'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed");
      })
    }
  };
  return (
    <div className="addproduct">
      <h3>Add Venues Products</h3>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type Here"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Place</p>
        <input
          value={productDetails.place}
          onChange={changeHandler}
          type="text"
          name="place"
          placeholder="Type Here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Veg Price</p>
          <input
            value={productDetails.veg_price}
            onChange={changeHandler}
            type="text"
            name="veg_price"
            placeholder="Type Here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Non.Veg Price</p>
          <input
            value={productDetails.non_price}
            onChange={changeHandler}
            type="text"
            name="non_price"
            placeholder="Type Here"
          />
        </div>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Min Person</p>
          <input
            value={productDetails.person_min }
            onChange={changeHandler}
            type="text"
            name="person_min"
            placeholder="Type Here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Max Person</p>
          <input
            value={productDetails.person_max}
            onChange={changeHandler}
            type="text"
            name="person_max"
            placeholder="Type Here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Catergory</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="Hall & Catering Service">Hall & Catering Service</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumnail-image"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-btn"
      >
        ADD
      </button>
    </div>
  )
}

export default VenusAddProduct
