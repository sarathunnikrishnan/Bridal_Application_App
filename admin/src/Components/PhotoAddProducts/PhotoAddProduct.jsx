// import React from 'react'
import './PhotoAddProduct.css'
import { API_ENDPOINTS } from "../../Const/constants"
import upload_area from "../../assets/upload_area.svg";
import { useState } from "react";

const PhotoAddProduct = () => {
  const [image, setImage] = useState(false);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);

  const [preview, setPreview] = useState(upload_area);
  const [preview1, setPreview1] = useState(upload_area);
  const [preview2, setPreview2] = useState(upload_area);

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
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(upload_area);
    }
  };
  const imageHandler1 = (e) => {
    const file = e.target.files[0];
    setImage1(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview1(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview1(upload_area);
    }
  };
  const imageHandler2 = (e) => {
    const file = e.target.files[0];
    setImage2(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview2(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview2(upload_area);
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    // console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    if (image) formData.append("product", image);
    if (image1) formData.append("product", image1);
    if (image2) formData.append("product", image2);

    await fetch(API_ENDPOINTS.IMAGE_PHOTO_UPLOAD, {
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

    if (responseData && responseData.success) {
      product.image = responseData.imageUrls && responseData.imageUrls[0] ? responseData.imageUrls[0] : "";
      product.image1 = responseData.imageUrls && responseData.imageUrls[1] ? responseData.imageUrls[1] : "";
      product.image2 = responseData.imageUrls && responseData.imageUrls[2] ? responseData.imageUrls[2] : "";
      console.log(product.image+ " " + "image");
      console.log(product.image1+ " " + "image1");
      console.log(product.image2+ " " + "image2");
      await fetch(API_ENDPOINTS.ADD_PRODUCT,{
        method : 'POST',
        headers:{
          Accept:'application/json',
          'content-Type' : 'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed");
      })
    } else {
        alert("Photo upload failed");
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
            src={preview}
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
            src={preview1}
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
            src={preview2}
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
