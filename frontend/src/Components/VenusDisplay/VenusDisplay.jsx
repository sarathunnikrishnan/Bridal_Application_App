import React, { useContext, useState } from "react";
import "./VenusDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { Container } from "react-bootstrap";
import { BridalContext } from "../../Context/BridalContext";
import { useNavigate } from "react-router-dom";

const VenusDisplay = (props) => {
  const [vegTotal, setVegTotal] = useState(0);
  const [nonTotal, setNonTotal] = useState(0);
  const [qtydisplay, setQtyDisplay] = useState(false);
  const navigate = useNavigate()

  const { product } = props;
  const { addToCart } = useContext(BridalContext);

  const handleVegChange = (event) => {
    let inputValue = parseFloat(event.target.value);

    if (
      inputValue === "" ||
      (inputValue >= 0 && inputValue <= product.person_max)
    ) {
      setVegTotal(inputValue);
    }
  };

  const handleNonChange = (event) => {
    let inputValue = parseFloat(event.target.value);

    if (
      inputValue === "" ||
      (inputValue >= 0 && inputValue <= product.person_max)
    ) {
      setNonTotal(inputValue);
    }
  };

  const HandleSubmit = () => {
    let total = parseFloat(vegTotal) + parseFloat(nonTotal);
    if (total >= product.person_min && total <= product.person_max + 1) {
      const vegTotalAmout = product.veg_price * vegTotal;
      const nonTotalAmout = product.non_price * nonTotal;

      product.new_price = vegTotalAmout + nonTotalAmout;
      setQtyDisplay(false);

      addToCart(product.id);
    } else {
        setQtyDisplay(true);
    }
  };

  return (
    <div className="venusdisplay">
      <Container>
        <div className="venusdisplay-left ">
          <img src={product.image} alt="" />
        </div>
        <div className="venusdisplay-right ">
          <h1>{product.name}</h1>
          <div className="venusdisplay-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
          </div>
          <div className="venusdisplay-right-prices">
            <div className="venusdisplay-right-price-new">
              <h3>Veg ₹{product.veg_price}</h3>
              <h6>per plate</h6>
            </div>
            <div className="venusdisplay-right-price-new">
              <h3>Non.Veg ₹{product.non_price}</h3>
              <h6>per plate</h6>
            </div>
          </div>
          <div className="venusdisplay-right-description">
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
            </p>
          </div>
          <div className="venusdisplay-right-prices">
            <div className="venusdisplay-right-price-new">
              <h3>Veg Qty :</h3>
              <input type="number" onChange={handleVegChange} />
            </div>
            <div className="venusdisplay-right-price-new">
              <h3>Non.Veg Qty :</h3>
              <input type="number" onChange={handleNonChange} />
            </div>
          </div>
          {qtydisplay ? (
            <div className="venusdisplay-maxqty">
              <p>Total quantity must be between {product.person_min} and {product.person_max}</p>
            </div>
          ) : null}
          <div className="venusdisplay-right-price-new">
            <h3>
              {product.person_min} - {product.person_max}
            </h3>
            <h6>pax</h6>
          </div>
          <button
            onClick={() => {
             (!localStorage.getItem('auth-token')) ? (navigate('/login')) : (HandleSubmit())
            }}
          >
            ADD TO CART
          </button>
          <p className="venusdisplay-right-category">
            <span>Category :</span> Auditorium, Hall, Catering
          </p>
          <p className="venusdisplay-right-category">
            <span>Tags :</span> Modern, Latest
          </p>
        </div>
      </Container>
    </div>
  );
};

export default VenusDisplay;
