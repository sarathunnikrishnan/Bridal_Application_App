import { useEffect } from 'react'
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";
import Accordion from "react-bootstrap/Accordion";
import drop_icon from '../../assets/circle-chevron-down-solid.svg'
import { useState } from "react";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 746) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleAccordion = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <div className="sidebar">
      <div className="accordionbtn col-2 col-md-2">
        <button onClick={toggleAccordion}><img src={drop_icon} alt="" /></button>
      </div>
      {
        showSidebar &&
        <div className="accordion-div">
      <Container>
      <Accordion defaultActiveKey="0" className="accordion">
        <Accordion.Item eventKey="0" >
          <Accordion.Header>Add Products</Accordion.Header>
          <Accordion.Body className="accordion-body">
            <Nav.Link
              as={Link}
              to={"/addbridalproduct"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className="sidebar-item">
                <img src={add_product_icon} alt="" />
                <p>Add Bridal Product</p>
              </div>
            </Nav.Link>
          </Accordion.Body>
          <Accordion.Body className="accordion-body">
            <Nav.Link
              as={Link}
              to={"/addphotoproduct"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className="sidebar-item">
                <img src={add_product_icon} alt="" />
                <p>Add Photo Product</p>
              </div>
            </Nav.Link>
          </Accordion.Body>
          <Accordion.Body className="accordion-body">
            <Nav.Link
              as={Link}
              to={"/addvenusproduct"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className="sidebar-item">
                <img src={add_product_icon} alt="" />
                <p>Add Venus Product</p>
              </div>
            </Nav.Link>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Product List</Accordion.Header>
          <Accordion.Body>
            <Nav.Link
              as={Link}
              to={"/listproductbridal"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className="sidebar-item">
                <img src={list_product_icon} alt="" />
                <p>Bridal Product List</p>
              </div>
            </Nav.Link>
          </Accordion.Body>
          <Accordion.Body>
            <Nav.Link
              as={Link}
              to={"/photolistproduct"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className="sidebar-item">
                <img src={list_product_icon} alt="" />
                <p>Photo Product List</p>
              </div>
            </Nav.Link>
          </Accordion.Body>
          <Accordion.Body>
            <Nav.Link
              as={Link}
              to={"/venuslistproduct"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className="sidebar-item">
                <img src={list_product_icon} alt="" />
                <p>Venus Product List</p>
              </div>
            </Nav.Link>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </Container>
      </div>
       
      }
    </div>
  );
};

export default Sidebar;
