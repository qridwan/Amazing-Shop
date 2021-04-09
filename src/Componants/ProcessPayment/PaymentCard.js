import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentCard = ({handlePayment}) => {
  const stripe = useStripe();
  const elements = useElements();
const [paymentError, setPaymentError] = useState(null);
const [paymentSuccess, setPaymentSuccess] = useState(null);
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
  
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      setPaymentError(error.message);
      setPaymentSuccess(null)
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      handlePayment(paymentMethod.id)
      setPaymentSuccess("Your payment was successfully sent")
      setPaymentError(null)
    }
  };
  return (
    <div><form onSubmit={handleSubmit}>
    <CardElement />
    <button type="submit" disabled={!stripe}>
      Pay
    </button>
  </form>
  {paymentError && <p>{paymentError}</p>}
  {paymentSuccess && <p>{paymentSuccess}</p>}
  </div>
  );
};

export default PaymentCard;
