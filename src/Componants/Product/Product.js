
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Product.css';
const Product = (props) => {
    const {name, img, seller, price, stock,star,features} = props.product;
    //  {console.log(props.product)}
    return (
        <div className="single-product-container">
        <div className="img-container">
            <img src={img} alt=""/>
        </div>
    <div className="shop-container-details">
    <div>
        <p>{name}</p>
    <div className="details">
    
    <div style={{marginRight: '15px'}}>
    <h6>by {seller} </h6>
    <h3>Price: ${price}</h3>
    <h6>Only {stock} left in stock. Order Soon!</h6>
    
    </div>
     
        <div><h6>Ratings: {star}</h6>
        <ul> {features.map( desc => <li><small>{desc.description} : {desc.value}</small></li>)}
            </ul> </div>
    </div>
    <button 
    onClick={()=> {props.clickHandle(props.product)}}
    className="btn-custom"><FontAwesomeIcon icon={faShoppingCart} />Add To Cart</button>
    </div>
    </div>
    </div>
    );
};

export default Product;