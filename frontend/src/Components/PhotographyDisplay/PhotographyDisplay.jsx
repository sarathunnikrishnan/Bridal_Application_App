import React, { useContext } from 'react'
import './PhotographyDisplay.css'
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { Container } from "react-bootstrap";
import { BridalContext } from "../../Context/BridalContext";
import ImageSlider from '../ImageSlider/ImageSlider';
import { useNavigate } from 'react-router-dom';

const PhotographyDisplay = (props) => {

    const { product } = props;
    const { addToCart } = useContext(BridalContext);
    const navigate = useNavigate()
    
    const slider = {
        image : `${product.image}`,
        image1 : `${product.image1}`,
        image2 : `${product.image2}`,
    }

  return (
    <div className="productdisplay"> 
        <Container>
      <div className="productdisplay-left ">
        <ImageSlider slider={slider}/>
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
        <button onClick={()=>{(!localStorage.getItem('auth-token')) ?  (navigate('/login')) : (addToCart(product.id))}}>ADD TO CART</button>
        <p className="productdisplay-right-category">
            <span>Category :</span> Photo, Video
        </p>
        <p className="productdisplay-right-category">
            <span>Tags :</span> Modern, Latest
        </p>
      </div>
      </Container>
    </div>
  )
}

export default PhotographyDisplay
