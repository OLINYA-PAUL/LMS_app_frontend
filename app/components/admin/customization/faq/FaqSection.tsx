"use client";

import {
  useEditQuestionAndAnswerDataMutation,
  useGetHeroDataQuery,
} from "@/radux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

// Define interfaces outside the component for better code organization
interface Question {
  _id: string;
  question: string;
  answer: string;
  active?: boolean;
}

const FaqSection = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery(
    { type: "FAQ" },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [
    editQuestionAndAnswerData,
    { data: editData, error, isSuccess, isLoading: editloading },
  ] = useEditQuestionAndAnswerDataMutation();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  useEffect(() => {
    if (data?.layout?.faq) {
      // Deep clone to avoid reference issues
      setQuestions(JSON.parse(JSON.stringify(data.layout.faq)));
      setIsEdited(false);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(" Questions and answer updated");
    }
    if (error) {
      toast.error("Fail to updated Questions and answer");
    }
  }, [isSuccess, error]);

  const toggleQuestion = (id: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleAnswerChange = (id: string, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
    setIsEdited(true);
  };

  const handleQuestionChange = (id: string, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
    setIsEdited(true);
  };

  const newFaqHandler = () => {
    const newFaq: Question = {
      _id: Math.random().toString(36).substring(2, 9),
      question: "",
      answer: "",
      active: true, // Open the new question for immediate editing
    };
    setQuestions((prevQuestions) => [...prevQuestions, newFaq]);
    setIsEdited(true);
  };

  const handleDelete = (id: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((item) => item._id !== id)
    );
    setIsEdited(true);
  };

  const areQuestionsUnchanged = () => {
    if (!data?.layout?.faq) return false;

    // Compare only relevant properties
    const origQuestions = data.layout.faq.map(
      ({ _id, question, answer }: Question) => ({
        _id,
        question,
        answer,
      })
    );

    const currentQuestions = questions.map(({ _id, question, answer }) => ({
      _id,
      question,
      answer,
    }));

    return JSON.stringify(origQuestions) === JSON.stringify(currentQuestions);
  };

  const isAnyQuestionEmpty = () => {
    return questions.some((q) => !q.question.trim() || !q.answer.trim());
  };

  const isSaveDisabled =
    areQuestionsUnchanged() || isAnyQuestionEmpty() || !isEdited;

  if (isLoading) {
    return (
      <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px] flex justify-center items-center h-64">
        <p className="text-lg dark:text-white text-black">
          Loading FAQ data...
        </p>
      </div>
    );
  }

  const handleEdit = async () => {
    if (!areQuestionsUnchanged() && !isAnyQuestionEmpty() && isEdited) {
      const type = "FAQ";

      // Format the data to match the expected structure
      const formattedFaqs = questions.map(({ question, answer }) => ({
        question,
        answer,
      }));

      // Send the entire array of FAQs at once
      await editQuestionAndAnswerData({
        type,
        faq: formattedFaqs,
      });
    }

    setIsEdited(false);
  };

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px] pb-20 relative">
      <h2 className="text-2xl font-bold mb-6 dark:text-white text-black">
        Frequently Asked Questions
      </h2>

      <div className="mt-8">
        <div className="space-y-6">
          {questions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 italic">
              No FAQs available. Add a new one to get started.
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
                    {q.active ? (
                      <input
                        className="w-full p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-500 dark:text-white text-black"
                        value={q.question}
                        onChange={(e) =>
                          handleQuestionChange(q._id, e.target.value)
                        }
                        placeholder="Enter your question..."
                      />
                    ) : (
                      <span
                        className="dark:text-white text-black cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                        onClick={() => toggleQuestion(q._id)}
                      >
                        {q.question || "Untitled Question"}
                      </span>
                    )}
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
                  <dd className="mt-4 pr-12 relative">
                    <textarea
                      className="border border-gray-300 rounded p-3 w-full min-h-[100px] bg-transparent text-black dark:text-white focus:outline-none focus:border-gray-500 resize-y"
                      value={q.answer}
                      onChange={(e) =>
                        handleAnswerChange(q._id, e.target.value)
                      }
                      placeholder="Add your answer..."
                    />
                    <button
                      className="absolute top-2 right-14 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => handleDelete(q._id)}
                      aria-label="Delete question"
                    >
                      <AiOutlineDelete className="text-xl" />
                    </button>
                  </dd>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-6 flex items-center">
          <button
            className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors dark:text-white text-black"
            onClick={newFaqHandler}
            aria-label="Add new FAQ"
          >
            <IoMdAddCircleOutline className="text-xl" />
            <span>Add New Question</span>
          </button>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            className={`px-6 py-2 rounded-md transition-colors ${
              isSaveDisabled
                ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-[#2d3838] text-white hover:bg-[#3a4747] cursor-pointer"
            }`}
            onClick={isSaveDisabled ? undefined : handleEdit}
            disabled={isSaveDisabled}
          >
            {editloading ? "Updating..." : " Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
