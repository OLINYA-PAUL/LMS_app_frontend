"use client";
import React, { useState } from "react";
import { HeaderSEO } from "../utils/headerSEO";
import Header from "./components/header";
import HeroBannar from "./components/heroBannar";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number>(0);
  const [route, setRoute] = useState<string>("Login");

  return (
    <>
      <HeaderSEO
        title="React Prodigy | Elearning"
        descripion="Empower your learning journey with React Prodigy, the ultimate platform for online education. Explore interactive courses, track progress, and achieve your goals anytime, anywhere. Join a thriving community of learners and unlock your potential today"
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
      </section>
    </>
  );
};

export default Home;
