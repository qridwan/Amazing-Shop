import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    {console.log(cart)}

    let productPrice = 0;
    cart.map(arr => {
        console.log(arr.price)
        productPrice = productPrice + arr.price; 
    })
let shipping= 0;
if (productPrice < 35 && productPrice != 0) {
    shipping = 4.99;
} 
else if ( productPrice >= 35 && productPrice < 70) {
    shipping = 12.99
}
else{
    shipping = 0;
}
    const tax = +(productPrice*0.1).toFixed(2)
const grandTotal = (productPrice + tax + shipping).toFixed(2) ;

    return (
        <div>
            <h4>Order Summery </h4>
            <h5>Total Ordered: {cart.length}</h5>
            <h5>Product Price: {productPrice}</h5>
            <small>Tax: {tax}</small> <br/>
            <small>Shipping Charge: {shipping}</small>
            <h4>Total : ${grandTotal}</h4>
        </div>
    );
};

export default Cart;