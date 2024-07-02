import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { BridalContext } from "../../Context/BridalContext";

const Navbar = () => {
  const [isVisibleBridal, setIsVisibleBridal] = useState(false);
  const [isVisibleePhotography, setIsVisiblePhotography] = useState(false);
  const [isVisibleSearchBar, setIsVisibleSearchBar] = useState(false);
  const { getTotalCartItems, all_product } = useContext(BridalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const Navigate = useNavigate();


  useEffect(()=>{
      setFilteredProducts(all_product);
  },[all_product])

  const toggleVisibility = (e) => {
    if (e === "bridal") {
      setIsVisibleBridal(!isVisibleBridal);
      setIsVisibleSearchBar(false); 
      setIsVisiblePhotography(false);
    } else if (e === "photography") {
      setIsVisibleBridal(false);
      setIsVisibleSearchBar(false);
      setIsVisiblePhotography(!isVisibleePhotography);
    } else if ( e === "search"){
      setIsVisibleBridal(false);
      setIsVisiblePhotography(false);
      setIsVisibleSearchBar(!isVisibleSearchBar);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterProducts(event.target.value);
  };

  const filterProducts = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = all_product.filter(product =>
      product.name.toLowerCase().includes(lowercasedTerm) ||
      product.category.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredProducts(filtered);
  };

  const handleSearchButton = () => {
    Navigate("/search", {state : { Product : filteredProducts, searchInput : searchTerm}})
  } 

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
                <Nav.Link as={Link} to="login">
                  <i class="fa-regular fa-circle-user"></i>
                </Nav.Link>
              </li>
            )}
            <li>
              <Nav.Link
                target="_blank"
                href="https://api.whatsapp.com/send/?phone=919961820377&text&type=phone_number&app_absent=0"
              >
                <i class="fa-brands fa-whatsapp"></i>
              </Nav.Link>
            </li>
            <li onClick={() => toggleVisibility("search")}>
              <i class="fa-solid fa-magnifying-glass"></i>
            </li>
          </ul>
          <div className="cart-div">
            <Nav.Link as={Link} to="cart">
            <i class="fa-solid fa-cart-shopping"></i>
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
        {isVisibleSearchBar && (
          <div className="bridal-options">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button onClick={handleSearchButton}>Search</button> 
          </div>
        )}
      </navbar>
    </div>
  );
};

export default Navbar;
