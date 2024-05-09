import React from 'react'
import { Container } from 'react-bootstrap'
import ItemVenus from '../ItemsVenus/ItemVenus'
import VenusRelated from '../Assets/Venue/VenusRelated'

const VenusRelatedProduct = () => {
  return (
    <div className='relativeproducts'>
        <Container>
       <h1>RELATED PRODUCTS</h1>
       <hr/>
       <div className="relatedproduct-items">
           {
            VenusRelated.map((item, index)=>{
                return ((<ItemVenus key={index} 
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
                    non_price={item.non_price}/>) )
            })
           }
       </div>
       </Container>
    </div>
  )
}

export default VenusRelatedProduct
