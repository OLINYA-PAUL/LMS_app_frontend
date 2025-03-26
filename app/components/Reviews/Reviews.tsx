import React from "react";
import image from "../../../public/assets/5869496-removebg.png";
import Image from "next/image";
import { styles } from "@/app/styles/style";
import ReviewCard from "./ReviewCard";

export interface IReview {
  name: string;
  avatar: string;
  professor: string;
  comment: string;
}
const Reviews = () => {
  const reviews: IReview[] = [
    {
      name: "Alice Johnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      professor: "Dr. Robert Williams",
      comment:
        "Dr. Williams is an exceptional professor who knows how to simplify complex topics. His engaging teaching style, combined with real-world examples, made the subject much easier to understand. I appreciated how he encouraged questions and discussions, creating a truly interactive learning experience. Looking forward to more of his lectures!",
    },
    {
      name: "Michael Smith",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      professor: "Dr. Emily Brown",
      comment:
        "Dr. Brown’s lecture was both insightful and engaging. Her ability to connect theoretical concepts with practical applications was outstanding. The class was well-structured, and I walked away with a clearer understanding of the subject. She truly makes learning enjoyable and effective!",
    },
    {
      name: "Sophia Martinez",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      professor: "Dr. John Doe",
      comment:
        "I absolutely loved the interactive approach in Dr. Doe’s class! He encouraged discussions, making sure every student was engaged. The examples he provided made the material more relatable, and I found myself understanding concepts much faster than before. His enthusiasm for teaching is truly inspiring!",
    },
    {
      name: "David Wilson",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      professor: "Dr. Sarah Connor",
      comment:
        "Dr. Connor’s ability to simplify difficult concepts is remarkable. She used real-world case studies that not only made the lecture more interesting but also helped solidify my understanding of the topic. Her passion for teaching is evident, and I would highly recommend her classes to anyone!",
    },
    {
      name: "Emma Thompson",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      professor: "Dr. Mark Evans",
      comment:
        "Dr. Evans is one of the best professors I’ve had! His deep knowledge and ability to break down topics into easy-to-digest sections made the learning process smooth. He also takes the time to ensure every student is on the same page before moving forward. Truly an excellent educator!",
    },
    {
      name: "James Anderson",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      professor: "Dr. Olivia White",
      comment:
        "Dr. White’s lecture was well-organized and full of valuable insights. Her ability to explain concepts with clarity and precision made it easy to follow along. She also provided practical examples that connected theory to real-world applications. A truly enriching learning experience!",
    },
    {
      name: "Olivia Harris",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      professor: "Dr. Daniel Scott",
      comment:
        "Dr. Scott is an outstanding educator. His structured teaching method and engaging explanations kept the entire class focused and eager to learn. He ensured that even the most challenging concepts were explained in a way that made sense to everyone. One of the best lectures I’ve attended!",
    },
    {
      name: "Benjamin Clark",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      professor: "Dr. Jessica Lewis",
      comment:
        "Dr. Lewis brought so much energy and enthusiasm to the lecture! Her ability to simplify technical subjects and keep students engaged was truly impressive. She also provided valuable insights that gave us a deeper understanding of the topic. I would love to take more of her classes!",
    },
    {
      name: "Charlotte Moore",
      avatar: "https://randomuser.me/api/portraits/women/9.jpg",
      professor: "Dr. William Carter",
      comment:
        "Dr. Carter’s teaching style is exceptional. He takes the time to make sure every student understands the material before moving forward. His practical examples were highly relevant, helping me connect classroom knowledge to real-world scenarios. I feel much more confident in this subject now!",
    },
    {
      name: "Henry Walker",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      professor: "Dr. Grace Mitchell",
      comment:
        "Dr. Mitchell’s ability to break down complex topics into simple, understandable concepts is truly impressive. She has a unique way of making even the driest topics interesting and engaging. Her lectures are always informative, and I appreciate the effort she puts into ensuring her students succeed!",
    },
  ];

  return (
    <div className="w-[95%] mt-3 mx-auto">
      <div className="w-full  800px:flex flex items-center justify-bewteen max-sm:flex-wrap md:flex-none">
        <Image src={image} alt="review_image" height={700} width={700} />
        <div className="w-full max-sm:p-2 md:p-0">
          <h1 className="font-bold text-3xl font-Poppins  max-sm:text-center">
            Our student are
            <span className="hero_animations   bg-gradient-to-r from-purple-400 to-purple-800 bg-clip-text text-transparent">
              {"  "} Our Strength
            </span>{" "}
            <br className="max-sm:hidden md:inline" /> See what they said about
            us
          </h1>
          <p
            className={`text-lg  font-Poppins text-left leading-7 pt-5 max-sm:text-sm md:text-lg max-sm:text-center text-balance`}
          >
            🚀 Paul is a senior developer and an outstanding educator who makes
            complex topics easy to understand. His engaging teaching style,
            real-world examples, and clear explanations create a dynamic
            learning experience. He is patient, knowledgeable, and passionate
            about ensuring every student grasps the material. His lectures are
            both insightful and inspiring, making him a truly exceptional
            professor.🚀
          </p>
        </div>
      </div>
      <div className=" mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
        {reviews && reviews.length > 0 ? (
          reviews.map((review: IReview, index: number) => (
            //@ts-ignore
            <ReviewCard reviews={review} key={index} />
          ))
        ) : (
          <div className="col-span-full text-center">No reviews available</div>
        )}
      </div>
      <div className=" mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
        {reviews && reviews.length > 0 ? (
          reviews.map((review: IReview, index: number) => (
            //@ts-ignore
            <ReviewCard reviews={review} key={index} />
          ))
        ) : (
          <div className="col-span-full text-center">No reviews available</div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
