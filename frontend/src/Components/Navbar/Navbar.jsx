import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { BridalContext } from "../../Context/BridalContext";

const Navbar = () => {
  const [isVisibleBridal, setIsVisibleBridal] = useState(false);
  const [isVisibleePhotography, setIsVisiblePhotography] = useState(false);
  const { getTotalCartItems } = useContext(BridalContext);

  const toggleVisibility = (e) => {
    if (e === "bridal") {
      setIsVisibleBridal(!isVisibleBridal);
      setIsVisiblePhotography(false);
    } else if (e === "photography") {
      setIsVisibleBridal(false);
      setIsVisiblePhotography(!isVisibleePhotography);
    }
  };

  return (
    <div>
      <navbar className="navbar">
        <div className="nav-logo col-12 col-md-4">
          <p className="nav-logo-head">BLACK & WHITE</p>
          <p className="nav-logo-quote">
            Creating memories, one step at a time
          </p>
        </div>
        <div className="nav-options col-6 col-md-4">
          <ul>
            <li>
              <Nav.Link
                as={Link}
                to="bridal"
                onClick={() => toggleVisibility("bridal")}
              >
                BRIDAL
              </Nav.Link>
            </li>
            <li>
              <Nav.Link
                as={Link}
                to="photography"
                onClick={() => toggleVisibility("photography")}
              >
                PHOTOGRAPHY
              </Nav.Link>
            </li>
            <li>
              <Nav.Link as={Link} to="venus">
                VENUE & CATERING
              </Nav.Link>
            </li>
          </ul>
        </div>
        <div className="nav-connect col-6 col-md-4">
          <ul>
            {localStorage.getItem("auth-token") ? (
              <li
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  window.location.replace("/");
                }}
              >
                <p>Log Out</p>
              </li>
            ) : (
              <li>
                <Nav.Link  as={Link} to="login">
                  <i class="fa-regular fa-circle-user"></i>
                </Nav.Link>
              </li>
            )}
            <li>
             <Nav.Link target="_blank"
              href="https://api.whatsapp.com/send/?phone=919961820377&text&type=phone_number&app_absent=0">
              <i class="fa-brands fa-whatsapp"></i>
              </Nav.Link>
            </li>
            </ul>
            <div className="cart-div">
              <Nav.Link as={Link} to="cart">
                <i class="fa-regular fa-heart"></i>
              </Nav.Link>
              <div className="nav-connect-cart">{getTotalCartItems()}</div>
              </div>
        </div>
        {isVisibleBridal && (
          <div className="bridal-options">
            <ul>
              <li>
                <Nav.Link as={Link} to="womens">
                  WOMEN
                </Nav.Link>
              </li>
              <li>
                <Nav.Link as={Link} to="mens">
                  MEN
                </Nav.Link>
              </li>
              <li>
                <Nav.Link as={Link} to="kids">
                  KIDS
                </Nav.Link>
              </li>
            </ul>
          </div>
        )}
      </navbar>
    </div>
  );
};

export default Navbar;
