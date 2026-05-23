import React, { useContext, useState, useEffect } from "react";
import "./CSS/BridalCategory.css";
import { Container } from "react-bootstrap";
import { BridalContext } from "../Context/BridalContext";
import Items from "../Components/Items/Items";
import Select from "react-select";
const BridalCategory = (props) => {
  const { all_product } = useContext(BridalContext);
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    setAllProduct(all_product);
  }, [all_product]);

  const sortOptions = [
    { value: 'sort', label: 'Sort' },
    { value: 'lowtohigh', label: 'Low to High Price' },
    { value: 'hightolow', label: 'High to Low Price' },
    { value: 'lessthan10000', label: 'Less than 10000' },
    { value: '10000-25000', label: '10000 - 25000' },
    { value: 'morethan25000', label: 'More than 25000' },
    { value: 'allproduct', label: 'All Products' },
  ];

  const selectHandler = (selectedOption) => {
    const value = selectedOption.value;
    const Product = [...all_product];
    let sortProduct = [];

    switch (value) {
      case "lowtohigh":
        sortProduct = Product.sort((a,b) => a.new_price - b.new_price);
        break;
      case "hightolow":
        sortProduct = Product.sort((a,b) => b.new_price - a.new_price);
        break;
      case "lessthan10000":
        sortProduct = Product.filter(item => item.new_price < 10000);
        break;
      case "10000-25000":
        sortProduct = Product.filter(item => item.new_price >= 10000 && item.new_price <= 25000);
        break;
      case "morethan25000":
        sortProduct = Product.filter(item => item.new_price > 25000);
        break;
      default:
        sortProduct = [...all_product];
    }
    setAllProduct(sortProduct);
  };

  return (
    <div className="bridal-category">
      <Container>
        <img className="bridalcategory-banner" src={props.banner} alt="" />
        <div className="bridalcategory-indexSort">
          <p>
            <span>Showing 1-12</span> out of 36 products
          </p>
          <div className="bridalcategory-sort" style={{ border: 'none', padding: 0 }}>
            <Select
              options={sortOptions}
              defaultValue={sortOptions[0]}
              onChange={selectHandler}
              isSearchable={false}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: '1px solid black',
                  borderRadius: '10px',
                  boxShadow: 'none',
                  minWidth: '160px',
                  padding: '0.1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  backgroundColor: 'transparent'
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isFocused ? '#E7EAE5' : 'white',
                  color: 'black',
                  cursor: 'pointer'
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  zIndex: 5
                })
              }}
            />
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
