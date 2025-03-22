"use client";

import { useGetHeroDataQuery } from "@/radux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

interface Question {
  _id: string;
  question: string;
  answer: string;
  active?: boolean;
}

const FAQ = () => {
  const { data, isLoading } = useGetHeroDataQuery(
    { type: "FAQ" },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (data?.layout?.faq) {
      setQuestions(data?.layout?.faq);
    }
  }, [data]);

  const toggleQuestion = (id: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  if (isLoading) {
    return (
      <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px] flex justify-center items-center h-64">
        <p className="text-lg dark:text-white text-black">
          Loading FAQ data...
        </p>
      </div>
    );
  }

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px] pb-20 relative">
      <h2 className="text-2xl font-bold mb-6 dark:text-white text-black">
        Frequently Asked Questions
      </h2>

      <div className="mt-8">
        <div className="space-y-6">
          {questions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 italic">
              No FAQs available.
            </p>
          ) : (
            questions.map((q, index) => (
              <div
                key={q._id}
                className={`border-b ${
                  index === 0 ? "border-t" : ""
                } border-gray-200 py-4 transition-all duration-200`}
              >
                <dt className="text-lg">
                  <div className="flex items-start justify-between w-full">
                    <span
                      className="dark:text-white text-black cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                      onClick={() => toggleQuestion(q._id)}
                    >
                      {q.question || "Untitled Question"}
                    </span>
                    <button
                      className="ml-6 flex-shrink-0 focus:outline-none p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => toggleQuestion(q._id)}
                      aria-label={
                        q.active ? "Collapse question" : "Expand question"
                      }
                    >
                      {q.active ? (
                        <HiMinus className="h-5 w-5 dark:text-white text-black" />
                      ) : (
                        <HiPlus className="h-5 w-5 dark:text-white text-black" />
                      )}
                    </button>
                  </div>
                </dt>

                {q.active && (
                  <dd className="mt-4 pr-12 relative text-black dark:text-white">
                    {q.answer}
                  </dd>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
