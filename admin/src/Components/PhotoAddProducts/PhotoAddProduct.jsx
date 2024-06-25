// import React from 'react'
import './PhotoAddProduct.css'
import upload_area from "../../assets/upload_area.svg";
import { useState } from "react";

const PhotoAddProduct = () => {
  const [image, setImage] = useState(false);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [productDetails, setProductDetails] = useState({
        name : "",
        place : '',
        category : "Photo & Video Per Day",
        image : "",
        image1 : "",
        image2 : "",
        new_price: "", 
        old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const imageHandler1 = (e) => {
    setImage1(e.target.files[0]);
  };
  const imageHandler2 = (e) => {
    setImage2(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    // console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);
    formData.append("product", image1);
    formData.append("product", image2);

    await fetch("http://localhost:4000/image/photoupload", {
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
      product.image = responseData.imageUrls[0];
      product.image1 = responseData.imageUrls[1];
      product.image2 = responseData.imageUrls[2];
      console.log(product.image+ " " + "image");
      console.log(product.image1+ " " + "image1");
      console.log(product.image2+ " " + "image2");
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
      <h3>Add Photography Products</h3>
      <hr />
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
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type Here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
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
          <option value="Photo & Video Per Day">Photo & Video</option>
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
         <label htmlFor="file-input-1">
          <img
            src={image1 ? URL.createObjectURL(image1) : upload_area}
            className="addproduct-thumnail-image"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler1}
          type="file"
          name="image1"
          id="file-input-1"
          hidden
        />
         <label htmlFor="file-input-2">
          <img
            src={image2 ? URL.createObjectURL(image2) : upload_area}
            className="addproduct-thumnail-image"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler2}
          type="file"
          name="image2"
          id="file-input-2"
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

export default PhotoAddProduct
