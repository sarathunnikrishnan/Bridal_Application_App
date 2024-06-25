import React from 'react'
import './CSS/SearchProduct.css'
import { useLocation } from 'react-router-dom'
import Items from '../Components/Items/Items';
import ItemsOther from '../Components/ItemsOther/ItemsOther';
import ItemVenus from '../Components/ItemsVenus/ItemVenus';
import { Container } from 'react-bootstrap';


const SearchProducts = () => {
    const location = useLocation();
    const {Product, searchInput} = location.state || {};
    // console.log(Product)
  return ( 
    <Container>
        <div className='search-result'>
            <div>
                <h4>Showing all search results for '{searchInput}' items.</h4>  
            </div>
        <div className="bridalcategory-products">
          {
            (Product.length !== 0) ? (
                Product.map((item, index) => {
                if ("men" === item.category || "women" === item.category || "kid" === item.category){
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
                } else if("Photo & Video Per Day" === item.category){
                    return (<ItemsOther key={index} id={item.id} name={item.name} place={item.place} image={item.image} new_price={item.new_price} old_price={item.old_price} category={item.category}/>)
                }else if("Hall & Catering Service" === item.category){
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
                }else{
                    return null;
                }
              })
            ) : ( <h1>Result Not Found</h1>)
          }
    </div>
    <div className="bridalcategory-loadmore">Explore More</div>
    </div>
    </Container>
  )
}

export default SearchProducts