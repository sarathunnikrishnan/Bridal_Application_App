import React, { useContext } from 'react'
import { BridalContext } from '../Context/BridalContext';
import { useParams } from 'react-router-dom';
import PhotographyDisplay from '../Components/PhotographyDisplay/PhotographyDisplay'
import BreadcrumsPhoto from '../Components/Breadcrums/BreadcrumsPhoto';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import PhotoRelated from '../Components/RelativeProducts/PhotoRelated';

const PhotographyProduct = () => {
    const { all_product } = useContext(BridalContext);
    const { photographyitemsId } = useParams();
    const product = all_product.find((e)=>e.id === Number(photographyitemsId))
  return (
    <div>
      <BreadcrumsPhoto product={product} />
      <PhotographyDisplay product={product}/>
      <DescriptionBox/>
      <PhotoRelated />
    </div>
  )
}

export default PhotographyProduct
