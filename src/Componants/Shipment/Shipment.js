import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import "./Shipment.css";
const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(watch("example"));
  const [loggedIn, setLoggedIn] = useContext(UserContext);
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
