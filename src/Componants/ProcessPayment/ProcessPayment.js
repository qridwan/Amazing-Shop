import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentCard from './PaymentCard';


const stripePromise = loadStripe('pk_test_51IeBpsCMoqc2zPDN3LSpKhedP6raPvf1W4T93DbsnhMs2hVyeOe1HByeFTYzTF36QAKfPK4p6jrmpmSqiA0nZuWL007c1hMTIl');


const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentCard handlePayment={handlePayment} />
      </Elements>
    );
};

export default ProcessPayment;