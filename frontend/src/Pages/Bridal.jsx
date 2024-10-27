import React from "react";
import { Container } from "react-bootstrap";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";

const Bridal = () => {
  return (
    <div className="bridal">
      <Container>
        <Popular />
        <Offers />
        <NewCollections />
        <NewsLetter/>
      </Container>
    </div>
  );
};

export default Bridal;
