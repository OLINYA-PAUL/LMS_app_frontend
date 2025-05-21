"use client";

import React, { useEffect, useState } from "react";
import { HeaderSEO } from "@/utils/headerSEO";
import Header from "../components/header";
import { useSelector } from "react-redux";

import Footer from "../components/Footer/Footer";
import FAQ from "../components/FAQ/FAQ";

interface Question {
  _id: string;
  question: string;
  answer: string;
  active?: boolean;
}

const Page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number>(4);
  const [route, setRoute] = useState<string>("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="min-h-screen">
      <HeaderSEO
        title={`${user?.name} Profile - Elearning`}
        description="Empower your learning journey with React Prodigy, the ultimate platform for online education. Explore interactive courses, track progress, and achieve your goals anytime, anywhere. Join a thriving community of learners and unlock your potential today"
        keyWords="Nextjs, React, Javascript, Radux MERN"
      />
      <Header
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />

      <div className="w-full mt-20">
        <FAQ />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
