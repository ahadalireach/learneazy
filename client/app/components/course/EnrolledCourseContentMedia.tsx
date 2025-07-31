import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import Image from "next/image";
import React, { useState } from "react";
import { CoursePlayer } from "../common";
import styles from "@/app/styles/styles";

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

  const isReviewExists = data?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

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
        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            className={styles.combineStyles(
              styles.buttonStyles.base,
              styles.buttonStyles.secondary,
              styles.buttonStyles.medium,
              "flex items-center gap-2",
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
              "flex items-center gap-2",
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
              "flex-1 text-center py-2 font-Poppins font-medium transition-colors text-sm",
              activeBar === index
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-4 border-l-4 border-blue-600 dark:border-blue-400 shadow"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
            )}
            style={{
              borderRight:
                activeBar === index
                  ? "4px solid var(--tw-prose-invert-borders, #2563eb)"
                  : "none",
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
                    : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
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

        {activeBar === 3 && !isReviewExists && (
          <>
            <div className="flex w-full items-start mb-4">
              <Image
                src={
                  user.avatar
                    ? user.avatar.url
                    : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
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

export default EnrolledCourseContentMedia;
