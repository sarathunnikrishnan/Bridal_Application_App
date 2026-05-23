import React,{ useContext, useState, useEffect} from 'react'
import './CSS/Photography.css'
import { BridalContext } from '../Context/BridalContext'
import ItemVenus from '../Components/ItemsVenus/ItemVenus'
import { Container } from 'react-bootstrap'
import Select from 'react-select'

const Venus = (props) => {
  const {all_product} = useContext(BridalContext);
  const [allProduct, setAllProduct] = useState([]);

  useEffect(() => {
    setAllProduct(all_product);
  }, [all_product]);

  const sortOptions = [
    { value: 'sort', label: 'Sort' },
    { value: 'veg_lowtohigh', label: 'Veg Price: Low to High' },
    { value: 'veg_hightolow', label: 'Veg Price: High to Low' },
    { value: 'nonveg_lowtohigh', label: 'Non-Veg Price: Low to High' },
    { value: 'nonveg_hightolow', label: 'Non-Veg Price: High to Low' },
    { value: 'allproduct', label: 'All Products' },
  ];

  const selectHandler = (selectedOption) => {
    const value = selectedOption.value;
    const Product = [...all_product];
    let sortProduct = [];

    switch (value) {
      case "veg_lowtohigh":
        sortProduct = Product.sort((a,b) => (a.veg_price || 0) - (b.veg_price || 0));
        break;
      case "veg_hightolow":
        sortProduct = Product.sort((a,b) => (b.veg_price || 0) - (a.veg_price || 0));
        break;
      case "nonveg_lowtohigh":
        sortProduct = Product.sort((a,b) => (a.non_price || 0) - (b.non_price || 0));
        break;
      case "nonveg_hightolow":
        sortProduct = Product.sort((a,b) => (b.non_price || 0) - (a.non_price || 0));
        break;
      default:
        sortProduct = [...all_product];
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
            return (<ItemVenus key={index} 
                   id={item.id} 
                   name={item.name} 
                   place={item.place} 
                   image={item.image} 
                   new_price={item.new_price} 
                   old_price={item.old_price} 
                   category={item.category} 
                   person_min={item.person_min} 
                   person_max={item.person_max}
                   veg_price={item.veg_price}
                   non_price={item.non_price}/>) 
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

export default Venus
