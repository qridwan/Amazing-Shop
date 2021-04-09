import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../Info/utilities/databaseManager";
import ProcessPayment from "../ProcessPayment/ProcessPayment";
import "./Shipment.css";
const Shipment = () => {
  
const [shippingData, setShippingData] = useState(null)
  const { register, handleSubmit, errors } = useForm();
  const [loggedIn ] = useContext(UserContext);
  const onSubmit = (data) => { 
    setShippingData(data)
    };

    const handlePayment = (paymentId) => {
      const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedIn,
      products: savedCart,
      shipment: shippingData,
      paymentId,
      orderTime: new Date(),
    } 

    fetch("https://emmajhon-server.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder()
          
        }
      })
      .catch((err) => console.log(err));
  };

  return (
  <div className="row">
    <div className="col-md-6" style={{display: shippingData? 'none': 'block'}}> <form onSubmit={handleSubmit(onSubmit)}>
      <input name="Name" defaultValue={loggedIn.name} ref={register} />

      <input
        name="Email"
        defaultValue={loggedIn.email}
        placeholder="Name"
        ref={register({ required: true })}
      />
      {errors.Email && <span className="error"> This field is required</span>}

      <input
        name="exampleRequired"
        placeholder="Phone Number"
        ref={register({ required: true })}
      />
      {errors.exampleRequired && (
        <span className="error"> This field is required</span>
      )}

      <input
        name="address"
        placeholder="Address"
        ref={register({ required: true })}
      />
      {errors.exampleRequired && (
        <span className="error"> This field is required</span>
      )}

      <input type="submit" />
    </form></div>
    <div style={{display: shippingData? 'block': 'none'}} className="col-md-5 m-3">
      <ProcessPayment handlePayment={handlePayment}/>
    </div>
  </div>
  );
};

export default Shipment;
