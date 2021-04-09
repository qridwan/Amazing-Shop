import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { Link } from "react-router-dom";
import {
  addToDatabaseCart,
  getDatabaseCart,
} from "../../Info/utilities/databaseManager";
import "./Shop.css";

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
const [search, setSearch] = useState('');
  useEffect(() => {
    fetch("https://emmajhon-server.herokuapp.com/product?search="+search)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [search]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    fetch("https://emmajhon-server.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);
console.log(cart)
  const clickHandle = (prod) => {
    const toBeAddedKey = prod.key;
    console.log("🚀 ~ file: Shop.js ~ line 37 ~ clickHandle ~ toBeAddedKey", toBeAddedKey)
console.log(cart)
    const sameProduct = cart.find((pd => pd.key === toBeAddedKey))

    console.log("🚀 ~ file: Shop.js ~ line 37 ~ clickHandle ~ sameProduct", sameProduct);

    let newCart;
    let count = 1;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== prod.key);
      newCart = [...others, sameProduct];
      setCart(newCart);
    } 
    else {
      console.log(prod)
      prod.quantity = 1 ;
      newCart = [...cart, prod];
      setCart(newCart);
    }
    addToDatabaseCart(prod.key, count);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  }
console.log(cart)
  return (
    <>
     <input type="text" placeholder=" SEARCH" onBlur={handleSearch} style={{}}/>
    <div className="shop-container">
      <div className="product-container">
        {products.map((pd, index) => (
          <Product
            showBtn={true}
            clickHandle={clickHandle}
            product={pd}
            key={index}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/order">
            <button className="btn-custom"> Review Order </button>
          </Link>
        </Cart>
      </div>
    </div></>
  );
};

export default Shop;
