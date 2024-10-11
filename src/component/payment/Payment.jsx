import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useLoaderData, useNavigation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);

console.log(stripePromise);

const Payment = () => {
  const booking = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  return (
    <div className="my-14 lg:ml-24 md:ml-12 sm:ml-12 ml-4">
      <p>Enter your Card number </p>
      <h2 className="text-2xl">Payment for {booking?.name} </h2>
      <h2 className="text-xl">
        Please Pay <span className="text-amber-500">{booking?.price} $</span>
      </h2>

      <div className="my-8 w-96">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
