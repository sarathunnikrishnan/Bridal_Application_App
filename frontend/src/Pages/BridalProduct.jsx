import React, { useContext } from 'react'
import { BridalContext } from '../Context/BridalContext';
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelativeProducts from '../Components/RelativeProducts/RelativeProducts';


const BridalProduct = () => {
    const { all_product } = useContext(BridalContext);
    const { bridalproductId } = useParams();
    const product = all_product.find((e)=>e.id === Number(bridalproductId))
  return (
    <div>
       <Breadcrums product={product}/>
       <ProductDisplay product={product}/>
       <DescriptionBox/>
       <RelativeProducts/>
    </div>   
  )
}

export default BridalProduct
