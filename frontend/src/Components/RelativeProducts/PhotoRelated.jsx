import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../utils/constants";
import { Container } from "react-bootstrap";
import ItemsOther from "../ItemsOther/ItemsOther";

const PhotoRelated = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_ENDPOINTS.RELATED_PRODUCTS}?category=photo`)
      .then((res) => res.json())
      .then((data) => setRelatedProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="relativeproducts">
      <Container>
        <h1>RELATED PRODUCTS</h1>
        <hr />
        <div className="relatedproduct-items-3">
          {relatedProducts.slice(0, 3).map((item, index) => {
            return (
              <ItemsOther
                key={index}
                id={item.id}
                name={item.name}
                place={item.place}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
                category={item.category}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default PhotoRelated;
