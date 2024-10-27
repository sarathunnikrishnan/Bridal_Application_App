import React,{ useContext, useState, useEffect } from 'react'
import './CSS/Photography.css'
import { BridalContext } from '../Context/BridalContext'
import ItemsOther from '../Components/ItemsOther/ItemsOther'
import { Container } from 'react-bootstrap'


const Photography = (props) => {
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
        case "lessthan75000":
          if (item.new_price < 75000) {
            sortProduct.push(item);
          }
          break;
        case "75000-1000000":
          if (item.new_price > 75000 && item.new_price < 100000) {
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
        <div className="photography-sort">
        <select for="Sort" 
           style={ {"color": "black",
           "background" : "transparent",
           "border": "transparent",
           "font-size": "15px",
           "width": "60px",
           }} onChange={selectHandler}>
            <option style={{background : "#8391A1",}} name="Sort" value="sort" selected>Sort</option>
            <option style={{background : "#8391A1",}} name="Sort" value="lowtohigh" >Low - High Price</option>
            <option style={{background : "#8391A1",}} name="Sort" value="hightolow" >High - Low Price</option>
             <option style={{background : "#8391A1",}}  name="Sort" value="lessthan75000">less than 75000</option>
             <option style={{background : "#8391A1",}}  name="Sort" value="75000-1000000">75000-100000</option>
             <option style={{background : "#8391A1",}}  name="Sort" value="morethan100000">more than 100000</option>
             <option style={{background : "#8391A1",}}  name="Sort" value="allproduct">All Product</option>
        </select>
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

