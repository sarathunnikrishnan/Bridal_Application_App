import React, { useContext, useState, useEffect } from "react";
import "./CSS/BridalCategory.css";
import { Container } from "react-bootstrap";
import { BridalContext } from "../Context/BridalContext";
import Items from "../Components/Items/Items";

const BridalCategory = (props) => {
  const { all_product } = useContext(BridalContext);
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    setAllProduct(all_product);
  }, [all_product]);

  const selectHandler = (e) => {
    const { value } = e.target;
    const Product = [...all_product]
    let sortProduct = [];

    for (let item of all_product) {
      switch (value) {
        case "lowtohigh":
          const sortLowtohigh = Product.sort((a,b) => a.new_price - b.new_price);
          sortProduct = sortLowtohigh
          break;
          case "hightolow":
            const sorthightolow = Product.sort((a,b) => b.new_price - a.new_price);
            sortProduct = sorthightolow
            break;
        case "lessthan10000":
          if (props.category === item.category && item.new_price < 10000) {
            sortProduct.push(item);
          }
          break;
        case "10000-25000":
          if (props.category === item.category && item.new_price > 10000 && item.new_price < 25000) {
            sortProduct.push(item);
          }
          break;
        case "morethan25000":
          if (props.category === item.category && item.new_price > 25000) {
            sortProduct.push(item);
          }
          break;
        default:
          sortProduct = [...all_product]
      }
    }
    setAllProduct(sortProduct);
  };

  function customStyle (){
    return {
      background: "#8391A1",
      width : "300px",
    };
  } 


  return (
    <div className="bridal-category">
      <Container>
        <img className="bridalcategory-banner" src={props.banner} alt="" />
        <div className="bridalcategory-indexSort">
          <p>
            <span>Showing 1-12</span> out of 36 products
          </p>
          <div className="bridalcategory-sort">
            <select
              for="Sort"
              style={{
                color: "black",
                background: "transparent",
                border: "transparent",
                "font-size": "15px",
                width: "60px",
              }}
              onChange={selectHandler}
            >
              <option
                style={customStyle()}
                name="Sort"
                value="sort"
                selected
              >
                Sort
              </option>
              <option
                style={{ background: "#8391A1", width: "30px" }}
                name="Sort"
                value="lowtohigh" 
              >
                Low to High Price
              </option>
              <option
                style={{ background: "#8391A1", width: "30px" }}
                name="Sort"
                value="hightolow" 
              >
                High to Low Price
              </option>
              <option
                style={{ background: "#8391A1", width: "30px" }}
                name="Sort"
                value="lessthan10000" 
              >
                less than 10000
              </option>
              <option
                style={{ background: "#8391A1" }}
                name="Sort"
                value="10000-25000"
              >
                10000-25000
              </option>
              <option
                style={{ background: "#8391A1" }}
                name="Sort"
                value="morethan25000"
              >
                more than 25000
              </option>
              <option
                style={{ background: "#8391A1" }}
                name="Sort"
                value="allproduct"
              >
                All Product
              </option>
            </select>
          </div>
        </div>
        <div className="bridalcategory-products">
          {
            (allProduct.length !== 0) ? (
              allProduct.map((item, index) => {
                if (props.category === item.category) {
                  return (
                    <Items
                      key={index}
                      id={item.id}
                      name={item.name}
                      image={item.image}
                      new_price={item.new_price}
                      old_price={item.old_price}
                    />
                  );
                } else {
                  return null;
                }
              })
            ) : ( <h1>Result Not Found</h1>)
          }
        </div>
        <div className="bridalcategory-loadmore">Explore More</div>
      </Container>
    </div>
  );
};

export default BridalCategory;
