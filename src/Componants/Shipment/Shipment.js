import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../Info/utilities/databaseManager";
import "./Shipment.css";
const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const [loggedIn ] = useContext(UserContext);

  const onSubmit = (data) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedIn,
      products: savedCart,
      shipment: data,
      orderTime: new Date(),
    };

    fetch("http://https://emmajhon-server.herokuapp.com5000/addOrder", {
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
          
          alert("Order Confirmed!!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        name="exampleRequired"
        placeholder="Adress"
        ref={register({ required: true })}
      />
      {errors.exampleRequired && (
        <span className="error"> This field is required</span>
      )}

      <input type="submit" />
    </form>
  );
};

export default Shipment;
