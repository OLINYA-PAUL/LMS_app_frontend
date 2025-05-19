"use client";

import CoursePlayer from "@/utils/CoursePlayer";
import Ratings from "@/utils/Rating";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircle, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import CourseContentList from "./CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../checkOutForm/CheckoutForm";
import { useRouter } from "next/navigation";
import { useLoadUserQuery } from "@/radux/features/api/apiSlice";
import { MdVerified } from "react-icons/md";

interface Benefit {
  title: string;
}

interface Prerequisite {
  title: string;
}

interface Link {
  title: string;
  url: string;
}

interface CourseContent {
  videoUrl: string;
  title: string;
  description: string;
  videoSection: string;
  videoLength: string;
  link: Link[];
  suggestion: string;
}

interface CourseData {
  _id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  estimatedPrice: number;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnails: string;
  benefits: Benefit[];
  prerequiste: Prerequisite[];
  courseData: CourseContent[];
  reviews: Review[];
  purchased: number;
  ratings: number;
}

interface Review {
  _id: string;
  user: {
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface CourseContentDetailsProps {
  data: {
    courses: CourseData;
  };
  stripePromise: Promise<any | null>;
  clientSecret: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRoute: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
}

const CourseContentDetails = ({
  data,
  stripePromise,
  clientSecret,
  setIsOpen,
  setRoute,
  isOpen,
}: CourseContentDetailsProps) => {
  const disCountPercentage = data?.courses?.estimatedPrice
    ? ((data.courses.estimatedPrice - data.courses.price) /
        data.courses.estimatedPrice) *
      100
    : 0;

  const { data: userData } = useLoadUserQuery({});
  const isPurchased = userData?.user?.courses?.some((c: any) => {
    return c._id === data?.courses?._id;
  });

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (userData) {
      setUser(userData.user);
    }
  }, [userData]);

  const [activeVideo, setActiveVideo] = useState(0);

  const [authPaymentPopUp, setAuthPaymentPopUp] = useState(false);

  const handleOrder = () => {
    if (user || isPurchased) {
      setAuthPaymentPopUp(true);
    } else {
      setRoute("Login");
      setIsOpen(true);
      setAuthPaymentPopUp(false);
      return;
    }
  };

  const router = useRouter();

  return (
    <div className="w-full mx-auto mt-3 font-Poppins px-4 sm:px-6 lg:px-8 text-xs sm:text-sm">
      <div className="w-full flex flex-col 800px:flex-row gap-6">
        {/* Left Content Section */}
        <div className="w-full 800px:w-[65%] 800px:pr-6">
          <h1 className="text-lg sm:text-xl font-bold text-black dark:text-white">
            {data?.courses?.name}
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-3">
            <div className="flex items-center gap-2">
              <Ratings rating={Number(data?.courses?.ratings)} />
              <span className="text-black dark:text-white">
                {data?.courses?.reviews?.length || 0} Reviews
              </span>
            </div>
            <span className="text-black dark:text-white">
              {data?.courses?.purchased || 0} Students
            </span>
          </div>

          <section className="mt-4">
            <h2 className="text-base font-bold text-black dark:text-white mb-2">
              What you'll learn
            </h2>
            <ul className="list-disc pl-4 space-y-1">
              {data?.courses?.benefits?.map(
                (benefit: Benefit, index: number) => (
                  <li key={index} className="text-black dark:text-white">
                    {benefit.title}
                  </li>
                )
              )}
            </ul>
          </section>

          <section className="mt-4">
            <h2 className="text-base font-bold text-black dark:text-white mb-2">
              Prerequisites
            </h2>
            <ul className="list-disc pl-4 space-y-1">
              {data?.courses?.prerequiste?.map(
                (prereq: Prerequisite, index: number) => (
                  <li key={index} className="text-black dark:text-white">
                    {prereq.title}
                  </li>
                )
              )}
            </ul>
          </section>

          <section className="mt-4">
            <h2 className="text-base font-bold text-black dark:text-white mb-2">
              Course Overview
            </h2>
            <CourseContentList
              data={data}
              isDemo={true}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
            />
          </section>
          <section className="mt-4">
            <h2 className="text-base font-bold text-black dark:text-white mb-2">
              Course Details
            </h2>
            <p className="text-black dark:text-white leading-relaxed">
              {data?.courses?.description}
            </p>
          </section>

          <section className="mt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Ratings rating={Number(data?.courses?.ratings)} />
              <div className="flex flex-row gap-3">
                <span className="font-medium text-black dark:text-white">
                  {Number(data?.courses?.ratings).toFixed(1)} Course Rating
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {data?.courses?.reviews?.length || 0} Reviews
                </span>
              </div>
            </div>
          </section>

          <section className="mt-4">
            <h2 className="text-base font-bold text-black dark:text-white mb-3">
              Student Reviews
            </h2>
            <div className="space-y-4">
              {data?.courses?.reviews?.map((reviews: Review | any) => {
                console.log("reviews <----->", reviews);
                return (
                  <div
                    key={reviews._id}
                    className=" p-3 rounded-lg shadow-sm border-l border-gray-300 dark:border-gray-700 border-b "
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={
                          reviews.user?.avatar?.url ||
                          "https://img.freepik.com/premium-photo/memoji-african-american-man-white-background-emoji_826801-6860.jpg?w=740"
                        }
                        alt={reviews.user?.name || "user avatar"}
                        className="rounded-full w-[50px] h-[50px] object-cover max-sm:w-[30px] max-sm:h-[30px] flex-shrink-0"
                      />
                      <div className="flex flex-col">
                        <h1 className="font-bold font-Poppins text-[15px] text-black dark:text-white">
                          {reviews.user.name}
                        </h1>
                        <Ratings rating={reviews.ratings} />
                        <p className="dark:text-slate-300 text-black font-Poppins text-sm break-words">
                          {reviews.comment}
                        </p>
                        <small className="dark:text-slate-400 text-gray-500 font-Poppins text-xs">
                          {format(reviews.createdAt)}
                        </small>
                      </div>
                    </div>

                    <div className="w-full mt-5 ml-10 max-sm:ml-2">
                      {[...reviews.commentReplies]
                        .reverse()
                        .map((review: any, index: number) => {
                          console.log("review <----->", review);
                          return (
                            <div
                              className="w-full font-Poppins text-black dark:text-white my-5"
                              key={review._id || index}
                            >
                              <div className="flex items-start gap-3">
                                <img
                                  src={
                                    review.user?.avatar?.url ||
                                    "https://img.freepik.com/premium-photo/memoji-african-american-man-white-background-emoji_826801-6860.jpg?w=740"
                                  }
                                  alt={review.user?.name || "user avatar"}
                                  className="rounded-full w-[40px] h-[40px] object-cover max-sm:w-[30px] max-sm:h-[30px] flex-shrink-0"
                                />
                                <div className="flex flex-col">
                                  <h1 className="font-bold font-Poppins text-[15px] text-black dark:text-white flex items-center gap-2">
                                    {review.user.name}
                                    {review.user.role === "admin" && (
                                      <MdVerified
                                        size={15}
                                        className="text-blue-500"
                                      />
                                    )}
                                  </h1>
                                  <small className="dark:text-slate-400 text-gray-500 font-Poppins text-xs">
                                    {format(review.createdAt)}
                                  </small>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="w-full 800px:w-[35%]">
          <div className="sticky top-20 space-y-4">
            <div className="aspect-w-16 aspect-h-9">
              <CoursePlayer
                videoID={data?.courses?.demoUrl}
                title={data?.courses?.title}
                isCoursePlayer={true}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  {data?.courses?.estimatedPrice > 0 && (
                    <span className="line-through text-gray-500 dark:text-gray-400">
                      ${data?.courses?.estimatedPrice}
                    </span>
                  )}
                  <span className="text-lg font-bold text-green-600">
                    {data?.courses?.price === 0
                      ? "Free"
                      : `$${data?.courses?.price}`}
                  </span>
                  {data?.courses?.estimatedPrice > 0 && (
                    <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-200 px-2 py-1 rounded-full text-xs">
                      {disCountPercentage.toFixed(0)}% Off
                    </span>
                  )}
                </div>

                <button
                  className={`cursor-pointer w-full py-2 px-4 rounded-lg font-semibold transition-colors text-white
                    ${
                      isPurchased
                        ? "bg-blue-600 hover:bg-blue-700 cursor-default"
                        : "bg-red-800 hover:bg-red-900"
                    }

                  `}
                  onClick={() => {
                    if (isPurchased) {
                      router.push(`/course-access/${data.courses._id}`);
                    } else {
                      handleOrder();
                    }
                  }}
                >
                  {isPurchased
                    ? "Enter to course"
                    : data?.courses?.price === 0
                    ? "Enroll Now"
                    : `Buy now - $${data?.courses?.price}`}
                </button>

                <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                  {[
                    "Source Code Included",
                    "Full Lifetime Access",
                    "Certificate of Completion",
                    "Premium Support",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <IoMdCheckmarkCircleOutline className="flex-shrink-0 text-green-600 text-sm" />
                      <span className="text-black dark:text-white">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <>
        {authPaymentPopUp && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex flex-col items-center justify-center  ">
            <div className="w-[500px] min-h-[400px] rounded-lg max-sm:w-[300px] max-sm:min-h-[300px] shadow-md bg-white dark:bg-white p-3">
              <div className="w-full flex justify-end">
                <IoIosCloseCircle
                  size={30}
                  className="text-black  cursor-pointer"
                  onClick={() => setAuthPaymentPopUp(false)}
                />
              </div>
              <div className="w-full mt-5">
                {clientSecret && stripePromise && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm
                      data={data}
                      user={user}
                      setAuthPaymentPopUp={setAuthPaymentPopUp}
                    />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseContentDetails;
