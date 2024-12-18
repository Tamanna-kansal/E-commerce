// StripeContext.js
import React, { createContext, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";

const StripeContext = createContext();

export const useStripeContext = () => {
  return useContext(StripeContext);
};

export const StripeProvider = ({ children }) => {
  const stripePromise = loadStripe("sk_test_51Q8bJEKODdllGjjVPXUIXqKtMIOek4EJ0ms2eqhAQvKXG2cGcnFXugYp2nRUOmOgPvBAUvcSAAQQZmzQRXKdrZ8r00LTQo1xmn"); // Replace with your actual Stripe public key

  return (
    <StripeContext.Provider value={stripePromise}>
      {children}
    </StripeContext.Provider>
  );
};
