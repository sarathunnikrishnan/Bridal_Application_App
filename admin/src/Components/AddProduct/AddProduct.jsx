// import React from 'react'
import "./AddProduct.css";
import { API_ENDPOINTS } from "../../Const/constants";
import upload_area from "../../assets/upload_area.svg";
import { useState } from "react";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);

  const [preview, setPreview] = useState(upload_area);
  const [preview1, setPreview1] = useState(upload_area);
  const [preview2, setPreview2] = useState(upload_area);
  const [preview3, setPreview3] = useState(upload_area);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState({ show: false, message: '', isSuccess: true });
  
  const initialProductDetails = {
    name: "",
    image: "",
    image1: "",
    image2: "",
    image3: "",
    category: "women",
    new_price: "",
    old_price: "",
  };

  const [productDetails, setProductDetails] = useState(initialProductDetails);
  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
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

  const imageHandler3 = (e) => {
    const file = e.target.files[0];
    setImage3(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview3(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview3(upload_area);
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
      if (image) formData.append("product", image);
      if (image1) formData.append("product", image1);
      if (image2) formData.append("product", image2);
      if (image3) formData.append("product", image3);

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
        product.image3 = responseData.imageUrls && responseData.imageUrls[3] ? responseData.imageUrls[3] : "";
        console.log(product);
        await fetch(API_ENDPOINTS.ADD_PRODUCT,{
          method : 'POST',
          headers:{
            Accept:'application/json',
            'content-Type' : 'application/json',
          },
          body:JSON.stringify(product),
        }).then((resp)=>resp.json()).then((data)=>{
          if(data.success){
            setShowPopup({ show: true, message: "Product has been successfully added to the store.", isSuccess: true });
            setProductDetails(initialProductDetails);
            setImage(false);
            setImage1(false);
            setImage2(false);
            setImage3(false);
            setPreview(upload_area);
            setPreview1(upload_area);
            setPreview2(upload_area);
            setPreview3(upload_area);
          } else {
            setShowPopup({ show: true, message: "Failed to add product. Please try again.", isSuccess: false });
          }
        })
      } else {
        setShowPopup({ show: true, message: "Failed to upload photos. Please try again.", isSuccess: false });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="addproduct">
      <h3>Add Bridal Products</h3>
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
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
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
        <label htmlFor="file-input-3">
          <img
            src={preview3}
            className="addproduct-thumnail-image"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler3}
          type="file"
          name="image3"
          id="file-input-3"
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
  );
};

export default AddProduct;
