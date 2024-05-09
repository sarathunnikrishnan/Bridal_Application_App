import React from "react";
import "./ImageSlider.css";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const ImageSlider = (props) => {
  const slider = props.slider;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="imageslider">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img src={slider.image} alt="" />
        </Carousel.Item>
        <Carousel.Item>
        <img src={slider.image1} alt="" />
        </Carousel.Item>
        <Carousel.Item>
        <img src={slider.image2} alt="" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ImageSlider;
