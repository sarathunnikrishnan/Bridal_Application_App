import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../utils/constants";

export const BridalContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const BridalContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItem, setCartItems] = useState(getDefaultCart());

  useEffect(() => {

    axios.get(API_ENDPOINTS.ALL_PRODUCTS).then((response) => {
      setAll_Product(response.data);
    });

    if (localStorage.getItem("auth-token")) {

      axios
        .post(
          API_ENDPOINTS.GET_CART,
          {},
          {
            headers: {
              Accept: "application/json",
              "auth-token": localStorage.getItem("auth-token"),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setCartItems(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {

    axios.post(API_ENDPOINTS.ADD_TO_CART, { itemId: itemId }, {
        headers: {
          Accept: 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
      });
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {

    axios.post(API_ENDPOINTS.REMOVE_FROM_CART, { itemId: itemId }, {
        headers: {
          Accept: 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
      });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItem += cartItem[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  console.log("Props.Children", props.children)

  return (
    <BridalContext.Provider value={contextValue}>
      {props.children}
    </BridalContext.Provider>
  );
};

export default BridalContextProvider;
