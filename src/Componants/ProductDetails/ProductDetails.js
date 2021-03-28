import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

function ProductDetails() {
  const { productKey } = useParams();
  const [product, setProduct] = useState({})
  useEffect(()=>{
    fetch('http://https://emmajhon-server.herokuapp.com5000/product/'+productKey)
    .then(res => res.json())
    .then(data => setProduct(data))
  },[productKey])

  // const product = fakeData.find((pd) => pd.key === productKey);
  
  return (
    <div>
      <h1>This is all about!</h1>
      <Product showBtn={false} product={product} />
    </div>
  );
}

export default ProductDetails;
