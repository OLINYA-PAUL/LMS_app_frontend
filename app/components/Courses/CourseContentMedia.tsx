import { styles } from "@/app/styles/style";
import {
  useAddAnswerToQuestionMutation,
  useAddCourseQuestionMutation,
  useAddReviewCommentReplyMutation,
  useAddReviewMutation,
  useDeleteUserReviewMutation,
} from "@/radux/features/course/course";
import CoursePlayer from "@/utils/CoursePlayer";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";

import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiSolidMessage } from "react-icons/bi";
import { format } from "timeago.js";
import { MdDeleteForever } from "react-icons/md";
import Ratings from "@/utils/Rating";

import { io } from "socket.io-client";
const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";
export const socket = io(SOCKET_URL, {
  // autoConnect: false,
  transports: ["websocket"],
});

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
  const [answer, setAnswer] = useState<{ [key: string]: string }>({});
  const [questionId, setQuestionId] = useState("");
  const [isAnswer, setIsAnswer] = useState(false);
  const [reviewReply, setReviewReply] = useState<{ [key: string]: string }>({});
  const [reviewActive, setReviewActive] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [deleteUserReviewLoading, setdeleteUserReviewLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const [reviewLoading, setReviewLoading] = useState<{
    [key: string]: boolean;
  }>({});
  const [reviewId, setReviewId] = useState("");
  const courseData = data?.courses?.courseData ?? data?.courseData;

  const courses = data.reviews ?? data;

  const [rating, setRating] = useState<number | null>(0);

  // Safe access to current video data
  const currentVideo = courseData[activeVideo] || courseData[0];

  const isCourseReview = data?.reviews.find(
    (review: any) => review?.user._id === user?._id || review
  );

  const [addCourseQuestion, { data: questioData, isLoading, error }] =
    useAddCourseQuestionMutation();
  const [
    addAnswerToQuestion,
    { data: answerData, isLoading: answerisLoading, error: answerError },
  ] = useAddAnswerToQuestionMutation();

  const [
    addReview,
    { data: reviewData, isLoading: reviewisLoading, error: reviewError },
  ] = useAddReviewMutation();

  const [
    addReviewCommentReply,
    { data: reviewreplyData, error: reviewreplyError },
  ] = useAddReviewCommentReplyMutation();

  const [
    deleteUserReview,
    { data: reviewDataDelete, error: reviewErrorDelete },
  ] = useDeleteUserReviewMutation();

  useEffect(() => {
    if (reviewDataDelete) {
      refetch();
      toast.success("Review delted successfully");
    }
    if (reviewErrorDelete) {
      if ("data" in reviewErrorDelete) {
        const message = reviewErrorDelete as any;
        toast.error(message.data.error || "deleting error");
      }
    }

    if (reviewreplyData) {
      refetch();
      setReviewLoading({ [reviewId]: false });
      toast.success("Review added successfully");
    }
    if (reviewreplyError) {
      if ("data" in reviewreplyError) {
        const message = reviewreplyError as any;
        toast.error(message.data.error || "Something went wrong");
      }
    }

    if (questioData) {
      refetch();
      setQuestion("");
      setIsQuestion(false);
      toast.success("Question added successfully");
      socket.emit("notification", {
        title: "New Question added",
        message: `${user.name} added a Question in ${data?.[activeVideo]?.title}`,
        userId: user?._id,
      });
    }
    if (error) {
      if ("data" in error) {
        const message = error as any;
        toast.error(message.data.error || "Something went wrong");
      }
    }

    if (answerData) {
      refetch();
      setAnswer({ key: "" });
      setIsAnswer(false);
      toast.success("Answer added successfully");

      if (user.role === "admin") {
        socket.emit("notification", {
          title: "New reply added",
          message: `${user.name} added a new reply in ${data?.[activeVideo]?.title}`,
          userId: user?._id,
        });
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const message = answerError as any;
        toast.error(message?.data?.error || "Something went wrong");
      }
    }

    if (reviewData) {
      refetch();
      toast.success("review added successfully");
      socket.emit("notification", {
        title: "New Review",
        message: `${user.name} added a Question in ${data?.[activeVideo]?.title}`,
        userId: user?._id,
      });
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const message = answerError as any;
        toast.error(message?.data?.error || "Something went wrong");
      }
    }
  }, [
    questioData,
    error,
    answerData,
    answerError,
    reviewData,
    reviewData,
    reviewreplyData,
    reviewreplyError,
    reviewDataDelete,
    reviewErrorDelete,
  ]);

  // Handle prev video
  const handlePrevVideo = () => {
    if (activeVideo > 0) {
      setActiveVideo(activeVideo - 1);
    }
  };

  const handleSubmitQuestion = async () => {
    if (question.length === 0) {
      toast.error("Question is required");
      return;
    }

    await addCourseQuestion({
      question,
      courseId: data?._id,
      contentId: courseData[activeVideo]._id,
    });
  };

  const handleAnswerSubmit = async () => {
    if (!answer[questionId] || answer[questionId].trim() === "") {
      toast.error("Answer is required");
      return;
    }

    await addAnswerToQuestion({
      answer: answer[questionId],
      questionId,
      courseId: data?._id,
      contentId: courseData[activeVideo]._id,
    });

    // Clear the input for the current question
    setAnswer((prev) => ({
      ...prev,
      [questionId]: "",
    }));
    setIsAnswer(false);
  };

  // Handle next video
  const handleNextVideo = () => {
    if (activeVideo < courseData.length - 1) {
      setActiveVideo(activeVideo + 1);
    }
  };

  const handleDeleteUserReview = async (reviewID: string) => {
    setdeleteUserReviewLoading((prev) => ({
      ...prev,
      [reviewID]: !prev[reviewID],
    }));

    await deleteUserReview({ reviewId: reviewID, courseId: id });
  };

  const handleReviewSubmit = async () => {
    if (comment.length === 0) {
      toast.error("Comment  are required");
      return;
    }

    if (rating === 0 || rating === null) {
      toast.error("Rating is required");
      setReviewLoading({ [reviewId]: false });
      return;
    }

    await addReview({
      reviews: comment,
      ratings: rating,
      courseId: id,
      userCourseList: user.courses,
    });

    setComment("");
    setRating(0);
  };

  const toggleReviewActive = (reviewId: string) => {
    setReviewActive((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const handleReviewReplyChange = (reviewId: string, value: string) => {
    setReviewReply((prev) => ({
      ...prev,
      [reviewId]: value,
    }));
  };

  const handleReviewReplySubmit = async () => {
    setReviewLoading({ [reviewId]: true });

    if (!reviewReply[reviewId] || reviewReply[reviewId].trim() === "") {
      toast.error("Review reply is required");
      setReviewLoading({ [reviewId]: false });
      return;
    }

    await addReviewCommentReply({
      comment: reviewReply[reviewId], // Dynamically access the reply for the specific review
      courseId: id, // Pass the course ID
      reviewId: reviewId, // Use the current reviewId
    });

    // Clear the reply input for the specific review
    setReviewReply((prev) => ({
      ...prev,
      [reviewId]: "",
    }));
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

      {/* Navigation buttons */}
      <div className="w-full flex items-center justify-between mt-6">
        {/* Prev Lesson Button */}
        <button
          className={`${
            styles.button
          } !min-h-[40px] text-sm py-2 px-4 !rounded-full dark:text-white flex items-center justify-center ${
            activeVideo === 0
              ? "!bg-red-500 cursor-not-allowed opacity-70"
              : "!bg-blue-600 hover:!bg-blue-700 cursor-pointer"
          }`}
          onClick={handlePrevVideo}
          disabled={activeVideo === 0}
        >
          <AiOutlineLeft size={15} className="mr-2" />
          Prev Lesson
        </button>

        {/* Next Lesson Button */}
        <button
          className={`${
            styles.button
          } !min-h-[40px] text-sm py-2 px-4 !rounded-full dark:text-white flex items-center justify-center ${
            activeVideo === courseData.length - 1
              ? "!bg-red-500 cursor-not-allowed opacity-70"
              : "!bg-blue-600 hover:!bg-blue-700 cursor-pointer"
          }`}
          onClick={handleNextVideo}
          disabled={activeVideo === courseData.length - 1}
        >
          Next Lesson
          <AiOutlineRight size={15} className="ml-2" />
        </button>
      </div>

      {/* Course title */}
      <h1 className="text-2xl text-black dark:text-white mt-5 font-[800]">
        {currentVideo.title}
      </h1>

      {/* Tab navigation */}
      <div className="w-full mt-[50px] p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`text-sm cursor-pointer transition-colors hover:text-blue-500 ${
              activeBar === index
                ? "text-red-500 font-medium"
                : "text-black dark:text-white"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>

      {/* Tab content */}
      <div className="w-full">
        {/* Overview tab */}
        {activeBar === 0 && (
          <div className="w-full my-5 whitespace-pre-wrap text-sm dark:text-gray-200">
            {currentVideo.description}
          </div>
        )}

        {/* Resources tab */}
        {activeBar === 1 && (
          <div className="w-full mt-5 space-y-2">
            {currentVideo.link?.map((items: any, index: number) => (
              <div key={index} className="flex items-center">
                <a
                  href={items.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline inline-block"
                >
                  Source Code: {items.url}
                </a>
              </div>
            )) || (
              <p className="text-sm dark:text-gray-300">
                No resources available for this lesson
              </p>
            )}
          </div>
        )}

        {/* Q&A tab */}
        {activeBar === 2 && (
          <div className="w-full">
            <div className="w-full mt-5 flex gap-4">
              <img
                src={
                  user?.avatar?.url ||
                  "https://img.freepik.com/premium-photo/memoji-african-american-man-white-background-emoji_826801-6860.jpg?w=740"
                }
                alt={user?.name || "user avatar"}
                className="rounded-full w-[50px] h-[50px] object-cover max-sm:w-[30px] max-sm:h-[30px]"
              />

              <div className="flex-grow">
                <textarea
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    setIsQuestion(e.target.value.length > 0);
                  }}
                  cols={30}
                  rows={5}
                  placeholder="Write a comment... or question..."
                  className={`border-0 outline-none rounded p-4 text-sm w-full resize-none dark:bg-slate-900 bg-slate-100 dark:text-white text-black ${
                    isQuestion
                      ? "border-green-600 border-b-2"
                      : "border-gray-300"
                  }`}
                />
                <div className="w-full flex items-center justify-end mt-2">
                  <button
                    className={`py-2 px-4 rounded-full text-sm text-white transition-colors ${
                      isLoading
                        ? "bg-gray-500"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    onClick={handleSubmitQuestion}
                    type="button"
                    disabled={isLoading}
                  >
                    {isLoading ? "Uploading..." : "Submit Question"}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full mt-6">
              <CommentReply
                data={courseData}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                handleAnswerSubmit={handleAnswerSubmit}
                answer={answer}
                setAnswer={setAnswer}
                questionId={questionId}
                isAnswer={isAnswer}
                setIsAnswer={setIsAnswer}
                setQuestionId={setQuestionId}
                answerisLoading={answerisLoading}
              />
            </div>
          </div>
        )}

        {/* Reviews tab */}
        {activeBar === 3 && (
          <div className="w-full mt-5">
            {isCourseReview && (
              <div className="w-full mt-5 flex items-start gap-4">
                <img
                  src={
                    user?.avatar?.url ||
                    "https://img.freepik.com/premium-photo/memoji-african-american-man-white-background-emoji_826801-6860.jpg?w=740"
                  }
                  alt={user?.name || "user avatar"}
                  className="rounded-full w-[50px] h-[50px] object-cover max-sm:w-[30px] max-sm:h-[30px]"
                />

                <div>
                  <h5 className="text-[15px] font-semibold dark:text-white text-black">
                    {user?.name}{" "}
                    <span className="text-red-600 font-bold text-[20px]">
                      *
                    </span>
                  </h5>
                  <div className="w-full flex cursor-pointer mt-1">
                    {[1, 2, 3, 4, 5].map((i: any) =>
                      rating! >= i ? (
                        <AiFillStar
                          key={i}
                          size={20}
                          className="text-yellow-400"
                          onClick={() => setRating(i)}
                        />
                      ) : (
                        <AiOutlineStar
                          key={i}
                          size={20}
                          className="text-yellow-400"
                          onClick={() => setRating(i)}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className={`w-full mt-5  ${isCourseReview ? "" : ""}`}>
              <textarea
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  setIsQuestion(e.target.value.length > 0);
                }}
                cols={30}
                rows={5}
                placeholder="Write a comment... or question..."
                className={`border-0 outline-none rounded p-4 text-sm w-full resize-none dark:bg-slate-900 bg-slate-100 dark:text-white text-black ${
                  isQuestion ? "border-green-600 border-b-2" : "border-gray-300"
                }`}
              />

              <div className="w-full flex items-center justify-end mt-2">
                <button
                  className={`py-2 px-4 bg-blue-600 rounded-full mt-2 text-sm text-white transition-colors ${
                    rating === 0 || rating === null
                      ? "bg-slate-400 cursor-no-drop"
                      : ""
                  } `}
                  onClick={handleReviewSubmit}
                  disabled={reviewisLoading || rating === 0 || rating === null}
                >
                  {reviewisLoading ? "Submit ..." : "Submit Review"}
                </button>
              </div>
            </div>
            <div className="w-full mt-5 border-t border-slate-700">
              <div className="w-full">
                {courses &&
                  [...courses].reverse().map((reviews: any, index: any) => {
                    return (
                      <div className="w-full mt-5" key={reviews._id || index}>
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
                            <div className="w-full gap-5 flex items-center">
                              <h1 className="font-bold font-Poppins text-[15px] text-black dark:text-white">
                                {reviews.user.name}
                              </h1>

                              {deleteUserReviewLoading[reviews._id] ? (
                                "deleting..."
                              ) : (
                                <>
                                  {user.role === "admin" && (
                                    <MdDeleteForever
                                      size={15}
                                      className="dark:text-white text-black cursor-pointer"
                                      onClick={() =>
                                        handleDeleteUserReview(reviews._id)
                                      }
                                    />
                                  )}
                                </>
                              )}
                            </div>
                            <Ratings rating={reviews.ratings} />
                            <p className="dark:text-slate-300 text-black font-Poppins text-sm break-words">
                              {reviews.comment}
                            </p>
                            <small className="dark:text-slate-400 text-gray-500 font-Poppins text-xs">
                              {format(reviews.createdAt)}
                            </small>

                            <>
                              <span
                                className="text-[15px] mt-5 text-black dark:text-white font-Poppins cursor-pointer items-center flex gap-2"
                                onClick={() => {
                                  toggleReviewActive(reviews._id);
                                  setReviewId(reviews._id);
                                }}
                              >
                                {user.role !== "admin"
                                  ? "  See Replies "
                                  : "  Reply Now"}
                                <BiSolidMessage
                                  size={15}
                                  className="text-blue-500"
                                />
                              </span>
                            </>
                          </div>
                        </div>

                        {reviewActive[reviews._id] && (
                          <div className="w-full mt-5 ml-10 max-sm:ml-2">
                            {[...reviews.commentReplies]
                              .reverse()
                              .map((review: any, index: number) => (
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
                                      <p className="dark:text-slate-300 text-black font-Poppins text-sm break-words">
                                        {!review.comment
                                          ? "No Replies yet dude"
                                          : review.comment}
                                      </p>
                                      <small className="dark:text-slate-400 text-gray-500 font-Poppins text-xs">
                                        {format(review.createdAt)}
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {user.role === "admin" && (
                              <div className="w-full mt-5 flex items-center gap-3  max-sm:ml-0">
                                <input
                                  value={reviewReply[reviews._id] || ""}
                                  onChange={(e) =>
                                    handleReviewReplyChange(
                                      reviews._id,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Reply to this comment..."
                                  className={`border-0 outline-none  rounded p-3 text-sm w-[80%] max-sm:w-[80%] dark:bg-slate-800 bg-slate-100 dark:text-white text-black ${
                                    reviewReply[reviews._id]?.trim()
                                      ? "border-green-600 border-b-2"
                                      : "border-gray-300"
                                  }`}
                                />
                                <button
                                  className={`${
                                    !reviewReply[reviews._id]?.trim()
                                      ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                                      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                  } py-2 px-4 rounded-full text-sm text-white transition-colors mt-3`}
                                  onClick={handleReviewReplySubmit}
                                  disabled={!reviewReply[reviews._id]?.trim()}
                                >
                                  {reviewLoading[reviews._id]
                                    ? "Replying..."
                                    : "Reply "}
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
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
  answer: { [key: string]: string };
  setAnswer: (answer: { [key: string]: string }) => void;
  questionId: string;
  isAnswer: boolean;
  setIsAnswer: (questionId: boolean) => void;
  setQuestionId: (questionId: string) => void;
  answerisLoading: boolean;
}

const CommentReply = ({
  data,
  activeVideo,
  setActiveVideo,
  answer,
  setAnswer,
  questionId,
  setQuestionId,
  handleAnswerSubmit,
  user,
  isAnswer,
  answerisLoading,
  setIsAnswer,
}: CommentReplyProps) => {
  return (
    <div className="w-full">
      {data &&
        [...data[activeVideo]?.question]
          .reverse()
          ?.map((items: any, index: number) => (
            <CommentItems
              key={index}
              items={items}
              data={data}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              answer={answer}
              setAnswer={setAnswer}
              questionId={questionId}
              setQuestionId={setQuestionId}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              isAnswer={isAnswer}
              answerisLoading={answerisLoading}
              setIsAnswer={setIsAnswer}
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
  answer: { [key: string]: string };
  setAnswer: (answer: { [key: string]: string }) => void;
  questionId: string;
  isAnswer: boolean;
  setIsAnswer: (isAnswer: boolean) => void;
  answerisLoading: boolean;
  setQuestionId: (questionId: string) => void;
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
  questionId,
  setQuestionId,
  isAnswer,
  answerisLoading,
  setIsAnswer,
}: CommentItems) => {
  const [replyActive, setReplyActive] = useState(false);

  const handleInputChange = (questionId: string, value: string) => {
    //@ts-ignore
    setAnswer((prev: { [key: string]: string }) => ({
      ...prev,
      [questionId]: value,
    }));
    setIsAnswer(value.trim().length > 0);
  };

  return (
    <div className="w-full my-4">
      <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
        {/* User and comment section */}
        <div className="flex items-start gap-3">
          <img
            src={
              items.user?.avatar?.url ||
              "https://img.freepik.com/premium-photo/memoji-african-american-man-white-background-emoji_826801-6860.jpg?w=740"
            }
            alt={items.user?.name || "user avatar"}
            className="rounded-full w-[50px] h-[50px] object-cover max-sm:w-[30px] max-sm:h-[30px] flex-shrink-0"
          />
          <div className="flex flex-col">
            <h1 className="font-bold font-Poppins text-[15px] text-black dark:text-white">
              {items.user.name}
            </h1>
            <p className="dark:text-slate-300 text-black font-Poppins text-sm break-words">
              {items.question}
            </p>
            <small className="dark:text-slate-400 text-gray-500 font-Poppins text-xs">
              {format(items.createdAt)}
            </small>
          </div>
        </div>

        {/* Reply toggle section */}
        <div className="w-full mt-3 ml-12 max-sm:ml-8">
          <div className="flex items-center gap-2">
            <span
              className="dark:text-blue-400 text-blue-600 font-Poppins text-sm cursor-pointer hover:underline"
              onClick={() => {
                setReplyActive(!replyActive);
                setQuestionId(items._id);
              }}
            >
              {!replyActive
                ? items.questionReplies.length > 0
                  ? "All replies"
                  : "Add a reply"
                : "Hide replies"}
            </span>
            <div className="flex items-center gap-1">
              <BiSolidMessage
                size={16}
                className={`${
                  replyActive ? "hidden" : ""
                } dark:text-slate-300 text-black cursor-pointer`}
              />
              <span
                className={`${
                  replyActive ? "hidden" : ""
                } dark:text-slate-300 text-black font-Poppins text-sm`}
              >
                {items.questionReplies.length}{" "}
                {items.questionReplies.length === 1 ? "reply" : "replies"}
              </span>
            </div>
          </div>

          {/* Replies section */}
          {replyActive && (
            <div className="w-full mt-3 space-y-4 pl-2 border-l-2 border-gray-100 dark:border-slate-800">
              {/* Existing replies */}
              {items.questionReplies.map((reply: any, index: number) => (
                <div
                  className="w-full font-Poppins text-black dark:text-white"
                  key={reply._id || index}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={
                        reply.user?.avatar?.url ||
                        "https://img.freepik.com/premium-photo/memoji-african-american-man-white-background-emoji_826801-6860.jpg?w=740"
                      }
                      alt={reply.user?.name || "user avatar"}
                      className="rounded-full w-[40px] h-[40px] object-cover max-sm:w-[30px] max-sm:h-[30px] flex-shrink-0"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-bold font-Poppins text-[15px] text-black dark:text-white flex items-center gap-2">
                        {reply.user.name}
                        {reply.user.role === "admin" && (
                          <MdVerified size={15} className="text-blue-500" />
                        )}
                      </h1>
                      <p className="dark:text-slate-300 text-black font-Poppins text-sm break-words">
                        {reply.answer || reply.content}
                      </p>
                      <small className="dark:text-slate-400 text-gray-500 font-Poppins text-xs">
                        {format(reply.createdAt)}
                      </small>
                    </div>
                  </div>
                </div>
              ))}

              {/* Reply input field */}
              <div className="flex flex-col md:flex-row md:items-end gap-2 mt-4 w-full">
                {user?.role === "admin" && (
                  <>
                    <input
                      value={answer[items._id] || ""}
                      onChange={(e) => {
                        handleInputChange(items._id, e.target.value);
                      }}
                      placeholder="Reply to this comment..."
                      className={`border-0 outline-none rounded p-3 text-sm flex-grow max-sm:w-[85%] dark:bg-slate-800 bg-slate-100 dark:text-white text-black ${
                        isAnswer
                          ? "border-green-600 border-b-2"
                          : "border-gray-300"
                      }`}
                    />
                    <button
                      className={`${
                        !answer[items._id] || answer[items._id].trim() === ""
                          ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      } py-2 px-4 rounded-full text-sm text-white transition-colors md:self-auto self-end max-sm:self-end max-sm:mr-12 max-sm:mt-3 whitespace-nowrap`}
                      onClick={handleAnswerSubmit}
                      type="button"
                      disabled={
                        !answer[items._id] || answer[items._id].trim() === ""
                      }
                    >
                      {answerisLoading ? "Replying..." : "Reply"}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContentMedia;
