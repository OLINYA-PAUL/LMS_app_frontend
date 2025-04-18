"use client";

import React, { useState } from "react";
import { UserProtected } from "../hooks/useProtected";
import { HeaderSEO } from "@/utils/headerSEO";
import Header from "../components/header";
import Profile from "../components/profile/Profile";
import { useSelector } from "react-redux";

const Page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number>(5);
  const [route, setRoute] = useState<string>("Login");
  const { user } = useSelector((state: any) => state.auth);
  console.log("profileUser", { user });

  return (
    <div>
      <UserProtected>
        <>
          <HeaderSEO
            title={`${user?.name} Profile - Elearning`}
            descripion="Empower your learning journey with React Prodigy, the ultimate platform for online education. Explore interactive courses, track progress, and achieve your goals anytime, anywhere. Join a thriving community of learners and unlock your potential today"
            keyWords="Nextjs, React, Javascript, Radux MERN"
          />
          <Header
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            activeItem={activeItem}
            setRoute={setRoute}
            route={route}
          />

          <Profile user={user} />
        </>
      </UserProtected>
    </div>
  );
};

export default Page;
