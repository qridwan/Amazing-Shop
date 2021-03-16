import React, { useEffect, useState } from "react";
import fakeData from "../../Info/fakeData";
import {
  getDatabaseCart,
  processOrder,
  removeFromDatabaseCart
} from "../../Info/utilities/databaseManager";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";
import Oredereditems from "../Ordereditems/Ordereditems";
import ThankYou from "../../Images/giphy.gif";
import "./Order.css";

function Order() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, []);
  const removeProduct = (ky) => {
    const updatedCart = cart.filter((pd) => pd.key !== ky);
    setCart(updatedCart);
    removeFromDatabaseCart(ky);
  };

  const [confirmed, setConfirmed] = useState(false);

  const clickToConfirm = () => {
    console.log("clicked");
    setCart([]);
    processOrder();
    setConfirmed(true);
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {/* <h1>You Ordered {cart.length} product[s]</h1> */}
        {cart.map((pd) => (
          <Oredereditems
            removeProduct={removeProduct}
            product={pd}
            key={pd.key}
          />
        ))}
        {confirmed && <img src={ThankYou} alt="Thank You" />}
      </div>
      <Cart cart={cart}>
        <Link to="/order">
          <button onClick={clickToConfirm} className="btn-custom">
            {" "}
            Confirm Order{" "}
          </button>
        </Link>
      </Cart>
    </div>
  );
}

export default Order;
