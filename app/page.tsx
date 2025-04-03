"use client";
import React, { useState } from "react";
import { HeaderSEO } from "../utils/headerSEO";
import Header from "./components/header";
import HeroBannar from "./components/heroBannar";
import Courses from "./components/Courses/Courses";
import Reviews from "./components/Reviews/Reviews";
import { Fa500Px } from "react-icons/fa";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number>(0);
  const [route, setRoute] = useState<string>("Login");

  return (
    <div className="flex items-center justify-center flex-col">
      <HeaderSEO
        title="React Prodigy | Elearning"
        description="Empower your learning journey with React Prodigy, the ultimate platform for online education. Explore interactive courses, track progress, and achieve your goals anytime, anywhere. Join a thriving community of learners and unlock your potential today"
        keyWords="Nextjs, React, Javascript, Radux MERN"
      />
      <section>
        <Header
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <HeroBannar />
        <Courses />
        <Reviews />
        <FAQ />
        <Footer />
      </section>
    </div>
  );
};

export default Home;
