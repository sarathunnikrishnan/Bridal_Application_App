import React,{ useContext} from 'react'
import './CSS/Photography.css'
import { BridalContext } from '../Context/BridalContext'
import ItemVenus from '../Components/ItemsVenus/ItemVenus'
import { Container } from 'react-bootstrap'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'

const Venus = (props) => {
  const {all_product} = useContext(BridalContext);
  return (
    <div className='photography'>
    <Container>
    <img className='photography-banner' src={props.banner} alt="" />
    <div className="photography-indexSort">
      <p>
        <span>Showing 1-9</span> out of 36 products
      </p>
      <div className="photography-sort">
         Sort by <img src={dropdown_icon} alt="" />
      </div>
    </div>
    <div className="photography-products">
      {
        all_product.map((item, index)=>{
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
