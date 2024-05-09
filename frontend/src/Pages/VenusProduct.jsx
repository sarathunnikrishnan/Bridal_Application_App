import React, { useContext } from 'react'
import { BridalContext } from '../Context/BridalContext';
import { useParams } from 'react-router-dom';
import VenusDisplay from '../Components/VenusDisplay/VenusDisplay';
import BreadcrumsVenus from '../Components/Breadcrums/BreadcrumsVenus';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import VenusRelatedProduct from '../Components/RelativeProducts/VenusRelatedProduct';

const VenusProduct = () => {
    const { all_product } = useContext(BridalContext);
    const { venusitemsId } = useParams();
    const product = all_product.find((e)=>e.id === Number(venusitemsId))
  return (
    <div>
      <BreadcrumsVenus product={product}/> 
       <VenusDisplay product={product}/>
       <DescriptionBox />
       <VenusRelatedProduct/>
    </div>
  )
}

export default VenusProduct
