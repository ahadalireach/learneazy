/* eslint-disable react-hooks/exhaustive-deps */
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import styles from "@/app/styles/styles";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useProcessOrderMutation } from "@/redux/features/order/orderApi";

import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  setOpen: any;
  data: any;
  user: any;
  refetch: any;
};

const CheckOutForm = ({ data, user, refetch }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [processOrder, { data: orderData, error }] = useProcessOrderMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      processOrder({ courseId: data._id, paymentInfo: paymentIntent });
    }
  };

  useEffect(() => {
    if (orderData) {
      refetch();
      socketId.emit("notification", {
        title: "New Order Placed",
        message: `A new order has been placed for '${data.name}' by user '${user.name}'.`,
        userId: user._id,
      });
      redirect(`/course-access/${data._id}`);
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [orderData, error]);
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1
          className={styles.combineStyles(
            styles.titleStyles.h4,
            "text-center mb-2"
          )}
        >
          Complete your purchase
        </h1>
        <p className={styles.titleStyles.subtitleSmall}>
          Secure payment powered by Stripe
        </p>
      </div>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className={styles.combineStyles(
          styles.formStyles.container,
          "space-y-4 bg-white dark:bg-slate-900 rounded-lg p-0"
        )}
      >
        <div className="space-y-4">
          <LinkAuthenticationElement id="link-authentication-element" />
          <PaymentElement id="payment-element" />
        </div>
        <button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className={styles.combineStyles(
            styles.buttonStyles.base,
            styles.buttonStyles.primary,
            styles.buttonStyles.small,
            "w-full mt-2 !h-[42px]"
          )}
        >
          {isLoading ? "Paying..." : "Pay now"}
        </button>
        {message && (
          <div
            id="payment-message"
            className="text-red-600 dark:text-red-400 font-Poppins pt-2 text-center"
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
