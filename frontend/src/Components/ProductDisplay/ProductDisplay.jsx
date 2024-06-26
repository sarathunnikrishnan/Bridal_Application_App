import React, { useContext, useEffect, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { Container } from "react-bootstrap";
import { BridalContext } from "../../Context/BridalContext";
import { useNavigate } from "react-router-dom";

const ProductDisplay = (props) => {

  const { product } = props;
  const { addToCart } = useContext(BridalContext);
  const [ user , setUser] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
        console.log(localStorage.getItem('auth-token'),"+++++++")
         if(localStorage.getItem('auth-token')){
             setUser(true);
         }else{
          setUser(false)
         }
  
  },[user, setUser])

  // console.log(user)

  return (
    <div className="productdisplay">
        <Container>
      <div className="productdisplay-left ">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img src={product.image} alt="" className="productdisplay-main-img" />
        </div>
      </div>
      <div className="productdisplay-right ">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            <del>₹{product.old_price}</del>
          </div>
          <div className="productdisplay-right-price-new">
            ₹{product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
            <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
            </p>
        </div>
        <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
            </div>
        </div>
        <button onClick={()=>{(!user)? (navigate("/login")) : (addToCart(product.id))}}>ADD TO CART</button>
        <p className="productdisplay-right-category">
            <span>Category :</span> Women, Bridal, Saree
        </p> 
        <p className="productdisplay-right-category">  
            <span>Tags :</span> Modern, Latest
        </p>
      </div>
      </Container>
    </div>
  );
};

export default ProductDisplay;
