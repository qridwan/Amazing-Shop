import React from "react";
import "./Ordereditems.css";

const Oredereditems = (props) => {
  const { name, seller, quantity, key } = props.product;
  return (
    <div className="single-product-container">
      <div>
        <h3>{name}</h3>
        <h4>by {seller} </h4>
        <h4>Quantity: {quantity}</h4>
        <button onClick={() => props.removeProduct(key)} className="btn-custom">
          {" "}
          Remove Item
        </button>
      </div>
    </div>
  );
};

export default Oredereditems;
