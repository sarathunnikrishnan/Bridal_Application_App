// import React from 'react'
import "../AddProduct/AddProduct.css";
import { API_ENDPOINTS } from "../../Const/constants";
import upload_area from "../../assets/upload_area.svg";
import { useState } from "react";

const VenusAddProduct = () => {
  const [image, setImage] = useState(false);
  const [preview, setPreview] = useState(upload_area);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState({ show: false, message: '', isSuccess: true });
  
  const initialProductDetails = {
    name : "",
        place : "",
        category : "Hall & Catering Service",
        image : "",
        person_min : "",
        person_max : "",
        veg_price : "",
        non_price : "",
        new_price: 0, 
  };

  const [productDetails, setProductDetails] = useState(initialProductDetails);

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

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    setIsLoading(true);
    try {
      console.log(productDetails);
      let responseData;
      let product = productDetails;

      let formData = new FormData();
      formData.append("product", image);

      await fetch(API_ENDPOINTS.IMAGE_UPLOAD, {
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
        await fetch(API_ENDPOINTS.ADD_PRODUCT,{
          method : 'POST',
          headers:{
            Accept:'application/json',
            'content-Type' : 'application/json',
          },
          body:JSON.stringify(product),
        }).then((resp)=>resp.json()).then((data)=>{
          if (data.success) {
            setShowPopup({ show: true, message: "Product has been successfully added to the store.", isSuccess: true });
            setProductDetails(initialProductDetails);
            setImage(false);
            setPreview(upload_area);
          } else {
            setShowPopup({ show: true, message: "Failed to add product. Please try again.", isSuccess: false });
          }
        })
      } else {
        setShowPopup({ show: true, message: "Failed to upload photo. Please try again.", isSuccess: false });
      }
    } finally {
      setIsLoading(false);
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
      </div>
      <button
        disabled={isLoading}
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-btn"
      >
        {isLoading ? "ADDING..." : "ADD"}
      </button>

      {showPopup.show && (
        <div className="custom-popup-overlay">
          <div className="custom-popup">
            <div className={`popup-icon ${showPopup.isSuccess ? 'success' : 'error'}`}>
              {showPopup.isSuccess ? '✓' : '✕'}
            </div>
            <h4>{showPopup.isSuccess ? 'Success!' : 'Error!'}</h4>
            <p>{showPopup.message}</p>
            <button onClick={() => setShowPopup({ show: false, message: '', isSuccess: true })}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default VenusAddProduct
