"use client";

import { useGetCourseContentDetailsQuery } from "@/radux/features/course/course";
import { HeaderSEO } from "@/utils/headerSEO";
import React, { useEffect, useState } from "react";
import Header from "../header";
import CourseContentDetails from "./CourseContentDetails";
import Footer from "../Footer/Footer";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "@/radux/features/orders/ordersapi";
import { loadStripe } from "@stripe/stripe-js";

const CourseDetails = ({ id }: { id: string }) => {
  const [route, setRoute] = useState("Login");
  const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useGetCourseContentDetailsQuery({ id });
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntent }] =
    useCreatePaymentIntentMutation();

  console.log("stripePromise", stripePromise, { config });

  useEffect(() => {
    if (config && config?.stripPublishableKey) {
      setStripePromise(loadStripe(config?.stripPublishableKey));
    }

    if (data && data.courses.price !== 0) {
      const amount = Math.round(data.courses.price * 100);
      createPaymentIntent({ amount });
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentIntent && paymentIntent?.clientSecret) {
      setClientSecret(paymentIntent?.clientSecret);
    }
  }, [paymentIntent]);

  return (
    <div className="w-[95%] mx-auto mt-5">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white mr-2" />{" "}
        </div>
      ) : (
        <div className="w-full">
          <HeaderSEO
            title={` ${data?.courses?.name + "- Elearning"}  `}
            description="Empower your learning journey with React Prodigy, the ultimate platform for online education. Explore interactive courses, track progress, and achieve your goals anytime, anywhere. Join a thriving community of learners and unlock your potential today"
            keyWords="Nextjs, React, Javascript, Radux MERN"
          />
          <Header
            activeItem={1}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            route={route}
            setRoute={setRoute}
          />
          {stripePromise && config?.stripPublishableKey && (
            <CourseContentDetails
              data={data}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
