"use client";

import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useCreateOrderMutation } from "@/radux/features/orders/ordersapi";
import { useLoadUserQuery } from "@/radux/features/api/apiSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";
export const socket = io(SOCKET_URL, {
  // autoConnect: false,
  transports: ["websocket"],
});

const CheckoutForm = ({
  data,
  user,
  setAuthPaymentPopUp,
}: {
  data: any;
  user: any;
  setAuthPaymentPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentIntentStatus, setPaymentIntentStatus] = useState<string | null>(
    null
  );
  const { refetch } = useLoadUserQuery({
    refetchOnMountOrArgChange: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!elements || !stripe) return;

    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setIsLoading(false);
      toast.error(submitError?.message || "");
      setMessage(submitError?.message || "");
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setIsLoading(false);
      setMessage(error.message || "");
    } else if (paymentIntent?.status === "succeeded") {
      setIsLoading(false);
      setPaymentIntentStatus(paymentIntent.status);

      try {
        const response = await createOrder({
          courseId: data?.courses._id,
          payment_info: paymentIntent,
        }).unwrap(); // Ensures async operation is complete

        if (response) {
          await refetch(); // Ensures the user data updates
          toast.success("Payment succeeded!");
          setAuthPaymentPopUp(false);
          socket.emit("notification", {
            title: "New Order",
            type: "order",
            message: `You have anew order from ${data.course.name}`,
            userId: user._id,
          });
          router.push(`/course-access/${data.courses._id}`);
        }
      } catch (err) {
        console.error("Order creation failed:", err);
        toast.error("Order creation failed.");
      }
    }
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto max-h-[80vh] overflow-y-auto p-4 bg-white shadow-lg rounded-lg"
    >
      <LinkAuthenticationElement
        id="link-authentication-element"
        className="mb-4"
      />
      <PaymentElement id="payment-element" className="mb-6" />
      <div className="flex justify-start">
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="transition-colors duration-200 ease-in-out"
        >
          <span
            id="button-text"
            className="shadow-xl inline-block bg-primary rounded-full text-white bg-blue-800 px-10 py-2 font-medium"
          >
            {isLoading ? "Paying..." : "Pay now"}
          </span>
        </button>
      </div>
      {message && (
        <div
          id="payment-message"
          className="text-red-500 font-poppins pt-2 text-sm"
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
