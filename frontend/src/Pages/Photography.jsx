import React,{ useContext, useState, useEffect } from 'react'
import './CSS/Photography.css'
import { BridalContext } from '../Context/BridalContext'
import ItemsOther from '../Components/ItemsOther/ItemsOther'
import { Container } from 'react-bootstrap'
import Select from 'react-select'


const Photography = (props) => {
 const { all_product } = useContext(BridalContext);
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    setAllProduct(all_product);
  }, [all_product]);

  const sortOptions = [
    { value: 'sort', label: 'Sort' },
    { value: 'lowtohigh', label: 'Low to High Price' },
    { value: 'hightolow', label: 'High to Low Price' },
    { value: 'lessthan75000', label: 'Less than 75000' },
    { value: '75000-100000', label: '75000 - 100000' },
    { value: 'morethan100000', label: 'More than 100000' },
    { value: 'allproduct', label: 'All Products' },
  ];

  const selectHandler = (selectedOption) => {
    const value = selectedOption.value;
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
        case "lessthan75000":
          if (item.new_price < 75000) {
            sortProduct.push(item);
          }
          break;
        case "75000-100000":
          if (item.new_price >= 75000 && item.new_price <= 100000) {
            sortProduct.push(item);
          }
          break;
        case "morethan100000":
          if (item.new_price > 100000) {
            sortProduct.push(item);
          }
          break;
        default:
          sortProduct = [...all_product];
      }
    }
    setAllProduct(sortProduct);
  };

  return (
    <div className='photography'>
      <Container>
      <img className='photography-banner' src={props.banner} alt="" />
      <div className="photography-indexSort">
        <p>
          <span>Showing 1-9</span> out of 36 products
        </p>
        <div className="photography-sort" style={{ border: 'none', padding: 0 }}>
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
      <div className="photography-products">
        {
          allProduct.map((item, index)=>{
           if(props.category === item.category){
              return (<ItemsOther key={index} id={item.id} name={item.name} place={item.place} image={item.image} new_price={item.new_price} old_price={item.old_price} category={item.category}/>)
            }
            else{
              return null;
            }
          })
        }
      </div>
      <div className="photography-loadmore">
        Explore More
      </div>
      </Container>
    </div>
  )
}

export default Photography

