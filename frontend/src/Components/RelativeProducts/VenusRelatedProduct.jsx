import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import ItemVenus from '../ItemsVenus/ItemVenus'

const VenusRelatedProduct = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/product/relatedproducts?category=venus')
      .then((res) => res.json())
      .then((data) => setRelatedProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='relativeproducts'>
        <Container>
       <h1>RELATED PRODUCTS</h1>
       <hr/>
       <div className="relatedproduct-items">
           {
            relatedProducts.map((item, index)=>{
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
