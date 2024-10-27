import { createContext, useEffect, useState } from "react";
import axios from "axios";

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
    // fetch('http://localhost:4000/allproducts')
    // .then((response)=>response.json())
    // .then((data)=>setAll_Product(data))
    axios.get("http://localhost:4000/product/allproducts").then((response) => {
      setAll_Product(response.data);
    });

    if (localStorage.getItem("auth-token")) {
      // fetch('http://localhost:4000/getcart',{
      //     method:'POST',
      //     headers:{
      //         Accept:'application/form-data',
      //         'auth-token':`${localStorage.getItem('auth-token')}`,
      //         'Content-Type' : 'application/json'
      //     },
      //     body:"",
      // }).then((response)=>response.json())
      // .then((data)=>setCartItems(data));
      axios
        .post(
          "http://localhost:4000/cart/getcart",
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
    //   fetch("http://localhost:4000/addtocart", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/form-data",
    //       "auth-token": `${localStorage.getItem("auth-token")}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ itemId: itemId }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => console.log(data));
    axios.post('http://localhost:4000/cart/addtocart', { itemId: itemId }, {
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
    //   fetch("http://localhost:4000/removefromcart", {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/form-data",
    //       "auth-token": `${localStorage.getItem("auth-token")}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ itemId: itemId }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => console.log(data));
    axios.post('http://localhost:4000/cart/removefromcart', { itemId: itemId }, {
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
        totalAmount += itemInfo.new_price * cartItem[item];
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
