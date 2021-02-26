import React, { useState } from 'react';
import fakeData from "../../../src/img/fakeData/index";
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0,15);
const [cart, setCart] = useState([])
    const clickHandle = (prod)=> {
        console.log('Clicked', prod)
const newCart = [...cart , prod];
setCart(newCart);
}

   const [products, setProducts] = useState(first10);
    return (
       
        <div className="shop-container">
            <div className="product-container">
            
      {          
products.map(pd => 
    <Product clickHandle={clickHandle} product={pd} ></Product>
    )
    }
            </div>
            <div className="cart-container">
               <Cart cart=
               {cart}></Cart> 

            </div>
        </div>
    );
};

export default Shop;