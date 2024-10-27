import React from 'react'
import photoRelated from '../Assets/Photography/photoRelated'
import { Container } from 'react-bootstrap'
import ItemsOther from '../ItemsOther/ItemsOther'

const PhotoRelated = () => {
  return (
    <div className='relativeproducts'>
        <Container>
       <h1>RELATED PRODUCTS</h1>
       <hr/>
       <div className="relatedproduct-items">
           {
            photoRelated.map((item, index)=>{
                return ((<ItemsOther key={index} id={item.id} name={item.name} place={item.place} image={item.image} new_price={item.new_price} old_price={item.old_price} category={item.category}/>))
            })
           }
       </div>
       </Container>
    </div>
  )
}

export default PhotoRelated
