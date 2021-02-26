import React, { useState } from 'react';
import fakeData from "../../../src/img/fakeData/index";
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const clickHandle = (prod)=> {console.log('Clicked', prod)}
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
                <h4>My Cart</h4>
            </div>
        </div>
    );
};

export default Shop;