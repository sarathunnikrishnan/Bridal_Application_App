import React, { useContext } from 'react'
import './CSS/BridalCategory.css'
import { Container } from 'react-bootstrap'
import { BridalContext} from '../Context/BridalContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Items from '../Components/Items/Items'

const BridalCategory = (props) => {
  const {all_product} = useContext(BridalContext)
  return (
    <div className='bridal-category'>
      <Container>
      <img className='bridalcategory-banner' src={props.banner} alt="" />
      <div className="bridalcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="bridalcategory-sort">
           Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="bridalcategory-products">
        {
          all_product.map((item, index)=>{
           if(props.category === item.category){
              return (<Items key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>)
            }
            else{
              return null;
            }
          })
        }
      </div>
      <div className="bridalcategory-loadmore">
        Explore More
      </div>
      </Container>
    </div>
  )
}

export default BridalCategory
