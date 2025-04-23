import { styles } from "@/app/styles/style";
import { useAddCourseQuestionMutation } from "@/radux/features/course/course";
import CoursePlayer from "@/utils/CoursePlayer";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineStar,
} from "react-icons/ai";
import { format } from "timeago.js";

const CourseContentMedia = ({
  data,
  user,
  id,
  activeVideo,
  refetch,
  setActiveVideo,
}: {
  data: any;
  user: any;
  id: string;
  activeVideo: number;
  refetch: () => void;
  setActiveVideo: (index: number) => void;
}) => {
  const [activeBar, setActiveBar] = React.useState(0);
  const [question, setQuestion] = useState("");
  const [comment, setComment] = useState("");
  const [isQuestion, setIsQuestion] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerId, setAnswerId] = useState("");
  const [isAnswer, setIsAnswer] = useState(false);

  const courseData = data?.courses?.courseData ?? data?.courseData;

  const [rating, setRating] = useState<number[]>([1, 2, 3, 4, 5]);

  // Safe access to current video data
  const currentVideo = courseData[activeVideo] || courseData[0];

  const isCourseReview = data?.reviews.find(
    (review: any) => review?.user._id === user?._id || review
  );

  const [addCourseQuestion, { data: questioData, isLoading, error }] =
    useAddCourseQuestionMutation();

  useEffect(() => {
    if (questioData) {
      refetch();
      setQuestion("");
      setIsQuestion(false);
      toast.success("Question added successfully");
    }
    if (error) {
      if ("data" in error) {
        const message = error as any;
        toast.error(message.data.error || "Something went wrong");
      }
    }
  }, [questioData, error]);

  // Handle prev video
  const handlePrevVideo = () => {
    if (activeVideo > 0) {
      setActiveVideo(activeVideo - 1);
    }
  };

  const handleSubmitQuestion = async () => {
    if (question.length === 0) {
      toast.error("question is required");

      return;
    }

    await addCourseQuestion({
      question,
      courseId: data?._id,
      contentId: courseData[activeVideo]._id,
    });
  };

  const handleAnswerSubmit = () => {};

  // Handle next video
  const handleNextVideo = () => {
    if (activeVideo < courseData.length - 1) {
      setActiveVideo(activeVideo + 1);
    }
  };

  return (
    <div className="w-full 800px:w-[85%] p-5 mx-auto">
      <CoursePlayer
        title={currentVideo.title}
        videoID={
          currentVideo.videoUrl ||
          (currentVideo.link && currentVideo.link[0]?.url)
        }
        isCoursePlayer={true}
      />
      <div className="w-full flex items-center justify-between mt-10">
        {/* Prev Lesson Button */}
        <div
          className={`${
            styles.button
          } !min-h-[40px] text-sm py-[unset] !w-[unset] !rounded-full dark:text-white opacity-[.8] flex justify-center items-center ${
            activeVideo === 0
              ? "!bg-red-600 cursor-not-allowed opacity-70"
              : "!bg-blue-700 cursor-pointer"
          }`}
          onClick={handlePrevVideo}
        >
          <AiOutlineLeft size={15} className="mr-3" />
          Prev Lesson
        </div>

        {/* Next Lesson Button */}
        <div
          className={`${
            styles.button
          } !min-h-[40px] text-sm py-[unset] !w-[unset] !rounded-full dark:text-white opacity-[.8] flex justify-center items-center ${
            activeVideo === courseData.length - 1
              ? "!bg-red-600 cursor-not-allowed opacity-70"
              : "!bg-blue-700 cursor-pointer"
          }`}
          onClick={handleNextVideo}
        >
          Next Lesson
          <AiOutlineRight size={15} className="ml-3" />
        </div>
      </div>
      <h1 className="text-2xl text-black dark:text-white mt-5 font-[800]">
        {currentVideo.title}
      </h1>
      <div className="w-full mt-[50px] p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`text-sm cursor-pointer ${
              activeBar === index && "text-red-500"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <div className="w-full">
        {activeBar === 0 && (
          <div className="w-full my-5 whitespace-pre-wrap text-sm">
            {" "}
            {currentVideo.description}
          </div>
        )}

        {activeBar === 1 && (
          <div className="w-full mt-5">
            {currentVideo.link?.map((items: any, index: number) => (
              <div key={index} className="flex items-center justify-start my-2">
                <a
                  href={items.url}
                  target="_blank"
                  className="text-sm text-blue-500 inline-block"
                >
                  Source Code: {items.url}
                </a>
              </div>
            )) || <p>No resources available for this lesson</p>}
          </div>
        )}
        {activeBar === 2 && (
          <div className="w-full">
            <div className="w-full mt-5 flex  gap-8">
              <img
                src={
                  user
                    ? user.avatar.url
                    : "https://img.freepik.com/premium-photo/memoji-african-american-man-white-background-emoji_826801-6860.jpg?w=740"
                }
                alt={user.name || "user avatar"}
                className="rounded-full w-[50px] h-[50px] object-cover max-sm:w-[30px] max-sm:h-[30px]"
              />

              <textarea
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  setIsQuestion(e.target.value.length > 0);
                }}
                cols={30}
                rows={5}
                placeholder="Write a comment... or question..."
                className={`border-0 outline-none rounded p-5 text-sm w-full mt-2 dark:bg-slate-900 bg-slate-700 ${
                  isQuestion ? "border-green-600 border-b-2" : "border-gray-300"
                }`}
              />
            </div>
            <div className="w-full flex items-center justify-end mt-1">
              <button
                className={`${
                  isLoading && "bg-red-800"
                } self-end py-1 px-4 bg-blue-800 rounded-full mt-5 text-sm text-white`}
                onClick={handleSubmitQuestion}
                type="button"
                disabled={isLoading}
              >
                {isLoading ? "Uploading..." : "Submit"}
              </button>
            </div>

            <div className="w-full mt-5">
              <CommentReply
                data={courseData}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                handleAnswerSubmit={handleAnswerSubmit}
                answer={answer}
                setAnswer={setAnswer}
                answerId={answerId}
                isAnswer={isAnswer}
                setIsAnswer={setIsAnswer}
                setAnswerId={setAnswerId}
              />
            </div>
          </div>
        )}

        {activeBar === 3 && (
          <div className="w-full mt-5">
            {isCourseReview && (
              <div className="w-full mt-5 flex items-center gap-4">
                <img
                  src={
                    user
                      ? user.avatar.url
                      : "https://img.freepik.com/premium-photo/memoji-african-american-man-white-background-emoji_826801-6860.jpg?w=740"
                  }
                  alt={user.name || "user avatar"}
                  className="rounded-full w-[50px] h-[50px] object-cover max-sm:w-[30px] max-sm:h-[30px]"
                />

                <div className="">
                  <h5 className="text-[15px] font-semibold dark:text-white text-black ">
                    {user.name}{" "}
                    <span className="text-red-600 font-bold text-[20px]">
                      *
                    </span>
                  </h5>
                  <div className="w-full flex cursor-pointer">
                    {[1, 2, 3, 4, 5].map((i: any) =>
                      rating >= i ? (
                        <AiFillStar
                          key={i}
                          width={20}
                          height={20}
                          className="inline-block"
                          color="rgb(246, 186, 0)"
                          onClick={() => setRating(i)}
                        />
                      ) : (
                        <AiOutlineStar
                          key={i}
                          width={20}
                          height={20}
                          color="rgb(246, 186, 0)"
                          className="inline-block"
                          onClick={() => setRating(i)}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="w-full mt-5">
              <textarea
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  setIsQuestion(e.target.value.length > 0);
                }}
                cols={30}
                rows={5}
                placeholder="Write a comment... or question..."
                className={`border-0 outline-none rounded p-5 text-sm w-full mt-2 dark:bg-slate-900 bg-slate-700 ${
                  isQuestion ? "border-green-600 border-b-2" : "border-gray-300"
                }`}
              />

              <div className="w-full flex items-center justify-end mt-1">
                <button
                  className={` self-end py-1 px-4 bg-blue-800 rounded-full mt-5 text-sm text-white `}
                  onClick={() => ""}
                >
                  Send Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface CommentReplyProps {
  data: any;
  activeVideo: number;
  setActiveVideo: (index: number) => void;
  user: any;
  handleAnswerSubmit: () => void;
  answer: string;
  setAnswer: (answer: string) => void;
  answerId: string;
  isAnswer: boolean;
  setIsAnswer: (isAnswer: boolean) => void;
  setAnswerId: (answerId: string) => void;
}

const CommentReply = ({
  data,
  activeVideo,
  setActiveVideo,
  answer,
  setAnswer,
  answerId,
  setIsAnswer,
  handleAnswerSubmit,
  user,
  isAnswer,
  setAnswerId,
}: CommentReplyProps) => {
  return (
    <div className="w-full">
      {data &&
        data[activeVideo]?.question?.map((items: any, index: number) => (
          <CommentItems
            key={index}
            items={items}
            data={data}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
            answer={answer}
            setAnswer={setAnswer}
            answerId={answerId}
            setIsAnswer={setIsAnswer}
            handleAnswerSubmit={handleAnswerSubmit}
            user={user}
            isAnswer={isAnswer}
            setAnswerId={setAnswerId}
          />
        ))}
    </div>
  );
};

interface CommentItems {
  data: any;
  items: any;
  activeVideo: number;
  setActiveVideo: (index: number) => void;
  user: any;
  handleAnswerSubmit: () => void;
  answer: string;
  setAnswer: (answer: string) => void;
  answerId: string;
  isAnswer: boolean;
  setIsAnswer: (isAnswer: boolean) => void;
  setAnswerId: (answerId: string) => void;
}
const CommentItems = ({
  data,
  items,
  activeVideo,
  setActiveVideo,
  user,
  handleAnswerSubmit,
  answer,
  setAnswer,
  answerId,
  isAnswer,
  setIsAnswer,
  setAnswerId,
}: CommentItems) => {
  console.log("items", items);
  return (
    <div className="w-full my-4">
      <div className="border-t  border-slate-900 ">
        <div className="flex items-center gap-3 justify-start">
          <div className="w-[50px] h-[50px] rounded-full bg-slate-900 p-3 text-center mt-4 dark:text-white text-black">
            {items.user.name.toString().slice(0, 2).toUpperCase()}
          </div>
          <div className="mt-4">
            <h1 className="font-bold font-Poppins text-[15px]">
              {items.user.name}
            </h1>
            <p className="dark:text-slate-300 text-white font-Poppins text-sm ">
              {" "}
              {items.question}
            </p>
            <small className="dark:text-slate-300 text-white font-Poppins text-sm ">
              {" "}
              {format(items.createdAt)}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseContentMedia;
