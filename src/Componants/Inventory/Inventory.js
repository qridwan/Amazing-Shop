import React from "react";
import fakeData from "../../Info/fakeData";

function Inventory() {
  const handleAddProduct = () => {
    // fetch("https://emmajhon-server.herokuapp.com/allProduct", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(fakeData),
    // });
    console.log("Inventory Clicked")
  };
  return (
    <div>
      <h1>This is InventorYYY</h1>
      <form action="/">
        <input type="text" placeholder="Product Name" name="product"></input>
        <input type="text" placeholder="Product Price " name="price"></input>
        <input type="text" placeholder="Quantity" name="quantity"></input>
        <input type="file" name="image"></input>
        <input type="submit" value="Submit"></input>
      </form>
      {/* <button onClick={handleAddProduct}>Add Product</button> */}
    </div>
  );
}

export default Inventory;
