/* eslint-disable react-hooks/exhaustive-deps */
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import Image from "next/image";
import toast from "react-hot-toast";
import styles from "@/app/styles/styles";
import { CoursePlayer } from "../common";
import React, { useEffect, useState } from "react";
import {
  useAddNewQuestionMutation,
  useAddQuestionAnswerMutation,
} from "@/redux/features/courses/coursesApi";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const tabList = ["Overview", "Resources", "Q&A", "Reviews"];

const EnrolledCourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [
    addNewQuestion,
    {
      isSuccess: addQuestionSuccess,
      error: addQuestionError,
      isLoading: questionCreationLoading,
    },
  ] = useAddNewQuestionMutation();
  const [
    addQuestionAnswer,
    {
      isSuccess: addQuestionAnswerSuccess,
      error: addQuestionAnswerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddQuestionAnswerMutation();

  const isReviewExists = data?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestionSubmit = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty!");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  const handleAnswerSubmit = () => {
    addQuestionAnswer({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  useEffect(() => {
    if (addQuestionSuccess) {
      setQuestion("");
      refetch();
    }
    if (addQuestionError) {
      if ("data" in addQuestionError) {
        const errorMessage = addQuestionError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (addQuestionAnswerSuccess) {
      setAnswer("");
      refetch();
    }
    if (addQuestionAnswerError) {
      if ("data" in addQuestionAnswerError) {
        const errorMessage = addQuestionAnswerError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    addQuestionSuccess,
    addQuestionError,
    addQuestionAnswerSuccess,
    addQuestionAnswerError,
  ]);

  return (
    <div className="py-4">
      <div
        className={
          styles.cardStyles.base +
          " " +
          styles.cardStyles.paddingMedium +
          " mb-6"
        }
      >
        <CoursePlayer
          title={data[activeVideo]?.title}
          videoUrl={data[activeVideo]?.videoUrl}
        />
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-4 gap-3">
          <button
            type="button"
            className={styles.combineStyles(
              styles.buttonStyles.base,
              styles.buttonStyles.secondary,
              styles.buttonStyles.medium,
              "flex items-center gap-2 w-full sm:w-auto",
              activeVideo === 0 ? "opacity-60 cursor-not-allowed" : ""
            )}
            onClick={() =>
              setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
            }
            disabled={activeVideo === 0}
          >
            <AiOutlineArrowLeft className="mr-2" />
            Prev Lesson
          </button>
          <button
            type="button"
            className={styles.combineStyles(
              styles.buttonStyles.base,
              styles.buttonStyles.primary,
              styles.buttonStyles.medium,
              "flex items-center gap-2 w-full sm:w-auto",
              data.length - 1 === activeVideo
                ? "opacity-60 cursor-not-allowed"
                : ""
            )}
            onClick={() =>
              setActiveVideo(
                data && data.length - 1 === activeVideo
                  ? activeVideo
                  : activeVideo + 1
              )
            }
            disabled={data.length - 1 === activeVideo}
          >
            Next Lesson
            <AiOutlineArrowRight className="ml-2" />
          </button>
        </div>
      </div>

      <h1 className={styles.titleStyles.h4 + " mb-4"}>
        {data[activeVideo]?.title}
      </h1>

      <div
        className={
          styles.cardStyles.base +
          " " +
          styles.cardStyles.paddingSmall +
          " flex items-center justify-between mb-6 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
        }
      >
        {tabList.map((text, index) => (
          <button
            key={index}
            className={styles.combineStyles(
              "flex-1 text-center py-2 font-Poppins font-medium transition-colors text-sm border-0 border-b-2",
              activeBar === index
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-b-4 border-blue-600 dark:border-blue-400 shadow"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700"
            )}
            style={{
              borderRight: "none",
            }}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </button>
        ))}
      </div>

      <div
        className={
          styles.cardStyles.base + " " + styles.cardStyles.paddingMedium
        }
      >
        {activeBar === 0 && (
          <p className="text-base whitespace-pre-line mb-3 dark:text-white text-black">
            {data[activeVideo]?.description}
          </p>
        )}

        {activeBar === 1 && (
          <div>
            {data[activeVideo]?.links?.length ? (
              data[activeVideo]?.links.map((item: any, index: number) => (
                <div className="mb-5" key={index}>
                  <h2 className="text-base font-semibold dark:text-white text-black inline-block">
                    {item.title && item.title + " :"}
                  </h2>
                  <a
                    className="inline-block text-blue-600 dark:text-blue-400 pl-2 break-all"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.url}
                  </a>
                </div>
              ))
            ) : (
              <p className="text-slate-500 dark:text-slate-400">
                No resources for this lesson.
              </p>
            )}
          </div>
        )}

        {activeBar === 2 && (
          <>
            <div className="flex w-full items-start mb-4">
              <Image
                src={
                  user.avatar
                    ? user.avatar.url
                    : "https://res.cloudinary.com/dnrxdohf7/image/upload/v1753601987/layout/q4ifxx7kefbglwvpk0ch.png"
                }
                width={50}
                height={50}
                alt="User avatar"
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Write your question..."
                className={styles.combineStyles(
                  styles.inputStyles.base,
                  styles.inputStyles.default,
                  styles.inputStyles.medium,
                  "ml-3 min-h-[80px] resize-y"
                )}
              />
            </div>
            <div className="w-full flex justify-end">
              <button
                className={`${styles.combineStyles(
                  styles.buttonStyles.base,
                  styles.buttonStyles.primary,
                  styles.buttonStyles.medium,
                  "w-[120px] h-[40px] text-base"
                )} ${questionCreationLoading && "cursor-not-allowed"}`}
                onClick={
                  questionCreationLoading ? () => {} : handleQuestionSubmit
                }
              >
                {questionCreationLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              questionId={questionId}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </>
        )}

        {activeBar === 3 && !isReviewExists && (
          <>
            <div className="flex w-full items-start mb-4">
              <Image
                src={
                  user.avatar
                    ? user.avatar.url
                    : "https://res.cloudinary.com/dnrxdohf7/image/upload/v1753601987/layout/q4ifxx7kefbglwvpk0ch.png"
                }
                width={50}
                height={50}
                alt="User avatar"
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <div className="w-full ml-3">
                <h5 className="text-base font-semibold dark:text-white text-black mb-2">
                  Give a Rating <span className="text-red-500">*</span>
                </h5>
                <div className="flex items-center mb-3">
                  {[1, 2, 3, 4, 5].map((i) =>
                    rating >= i ? (
                      <AiFillStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    )
                  )}
                </div>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your comment..."
                  className={styles.combineStyles(
                    styles.inputStyles.base,
                    styles.inputStyles.default,
                    styles.inputStyles.medium,
                    "min-h-[80px] resize-y"
                  )}
                />
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
                className={styles.combineStyles(
                  styles.buttonStyles.base,
                  styles.buttonStyles.primary,
                  styles.buttonStyles.medium,
                  "w-[120px] h-[40px] text-base"
                )}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  questionId,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            questionId={questionId}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  questionId,
  setQuestionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [activeReply, setActiveReply] = useState(false);

  return (
    <div
      className={styles.combineStyles(
        styles.cardStyles.base,
        styles.cardStyles.paddingSmall,
        "my-4"
      )}
    >
      <div className="flex items-center gap-3 mb-2">
        <Image
          src={
            item.user.avatar
              ? item.user.avatar.url
              : "https://res.cloudinary.com/dnrxdohf7/image/upload/v1753601987/layout/q4ifxx7kefbglwvpk0ch.png"
          }
          width={40}
          height={40}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base dark:text-white text-black">
              {item?.user.name}
            </span>
            <small className="text-xs text-slate-500 dark:text-slate-400">
              {item.createdAt ? format(item.createdAt) : ""}
            </small>
          </div>
          <p className="text-sm mt-1 dark:text-white text-black">
            {item?.question}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 pl-12 mb-2">
        <button
          className={styles.combineStyles(
            styles.buttonStyles.base,
            styles.buttonStyles.tertiary,
            styles.buttonStyles.small,
            "px-2 py-1 text-xs"
          )}
          onClick={() => {
            setActiveReply(!activeReply);
            setQuestionId(item._id);
          }}
        >
          {!activeReply
            ? item.questionReplies.length !== 0
              ? "All Replies"
              : "Add Reply"
            : "Hide Replies"}
        </button>
        <BiMessage size={16} className="text-slate-500 dark:text-slate-400" />
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {item.questionReplies.length}
        </span>
      </div>

      {activeReply && questionId === item._id && (
        <>
          <div className="space-y-3 pl-12">
            {item.questionReplies.map((reply: any) => (
              <div
                key={reply._id}
                className={styles.combineStyles(
                  styles.cardStyles.base,
                  styles.cardStyles.paddingSmall,
                  "flex items-start gap-2 bg-slate-50 dark:bg-slate-900"
                )}
              >
                <Image
                  src={
                    reply.user.avatar
                      ? reply.user.avatar.url
                      : "https://res.cloudinary.com/dnrxdohf7/image/upload/v1753601987/layout/q4ifxx7kefbglwvpk0ch.png"
                  }
                  width={32}
                  height={32}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm dark:text-white text-black">
                      {reply.user.name}
                    </span>
                    {reply.user.role === "admin" && (
                      <VscVerifiedFilled className="text-blue-500" size={16} />
                    )}
                    <small className="text-xs text-slate-400">
                      {format(reply.createdAt)}
                    </small>
                  </div>
                  <p className="text-xs mt-1 dark:text-white text-black">
                    {reply.answer}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                placeholder="Enter your answer..."
                value={answer}
                onChange={(e: any) => setAnswer(e.target.value)}
                className={styles.combineStyles(
                  styles.inputStyles.base,
                  styles.inputStyles.default,
                  styles.inputStyles.small,
                  "flex-1"
                )}
                disabled={answerCreationLoading}
              />
              <button
                type="submit"
                className={styles.combineStyles(
                  styles.buttonStyles.base,
                  styles.buttonStyles.primary,
                  styles.buttonStyles.small
                )}
                onClick={handleAnswerSubmit}
                disabled={answer === "" || answerCreationLoading}
              >
                {answerCreationLoading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EnrolledCourseContentMedia;
