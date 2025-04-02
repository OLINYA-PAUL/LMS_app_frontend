// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   PaymentElement,
//   useStripe,
//   useElements,
//   LinkAuthenticationElement,
// } from "@stripe/react-stripe-js";
// import { useCreateOrderMutation } from "@/radux/features/orders/ordersapi";
// import { useLoadUserQuery } from "@/radux/features/api/apiSlice";
// import toast from "react-hot-toast";
// import { redirect } from "next/navigation";

// const CheckoutForm = ({
//   data,
//   setIsOpen,
// }: {
//   data: any;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
//   const [message, setMessage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [paymentIntentStatus, setPaymentIntentStatus] = useState<string | null>(
//     null
//   );
//   const [loadUser, setLoadUser] = useState(false);
//   const { refetch } = useLoadUserQuery({
//     refetchOnMountOrArgChange: true,
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!elements || !stripe) return;

//     setIsLoading(true);

//     const { error: submitError } = await elements.submit();
//     if (submitError) {
//       setIsLoading(false);
//       toast.error(submitError?.message || "");
//       setMessage(submitError?.message || "");
//       return;
//     }

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       redirect: "if_required",
//     });

//     if (error) {
//       setIsLoading(false);
//       setMessage(error.message || "");
//     } else if (paymentIntent && paymentIntent.status === "succeeded") {
//       setIsLoading(false);
//       setMessage("Payment succeeded!");
//       toast.success("Payment succeeded!");
//       setPaymentIntentStatus(paymentIntent.status);
//       createOrder({
//         courseId: data?.courses._id,
//         payment_info: paymentIntent,
//       });
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (orderData) {
//       refetch();
//       redirect(`course-access/${data.courses._id}`);
//     }
//   }, [orderData, refetch, error]);

//   return (
//     <form
//       id="payment-form"
//       onSubmit={handleSubmit}
//       className="w-full max-w-md mx-auto max-h-[80vh] overflow-y-auto p-4 bg-white shadow-lg rounded-lg"
//     >
//       <LinkAuthenticationElement
//         id="link-authentication-element"
//         className="mb-4"
//       />
//       <PaymentElement id="payment-element" className="mb-6" />
//       <div className="flex justify-start">
//         <button
//           disabled={isLoading || !stripe || !elements}
//           id="submit"
//           className="transition-colors duration-200 ease-in-out"
//         >
//           <span
//             id="button-text"
//             className="shadow-xl inline-block bg-primary rounded-full text-white bg-blue-800 px-10 py-2 font-medium"
//           >
//             {isLoading ? "Paying..." : "Pay now"}
//           </span>
//         </button>
//       </div>
//       {message && (
//         <div
//           id="payment-message"
//           className="text-red-500 font-poppins pt-2 text-sm"
//         >
//           {message}
//         </div>
//       )}
//     </form>
//   );
// };

// export default CheckoutForm;

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

const CheckoutForm = ({
  data,
  setIsOpen,
}: {
  data: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      setMessage("Payment succeeded!");
      toast.success("Payment succeeded!");
      setPaymentIntentStatus(paymentIntent.status);
      createOrder({
        courseId: data?.courses._id,
        payment_info: paymentIntent,
      });
      router.push(`/course-access/${data.courses._id}`);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (orderData) {
      refetch();
      // Replace redirect with router.push
      // router.push(`/course-access/${data.courses._id}`);
    }
  }, [orderData, data?.courses?._id, refetch, router]);

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
