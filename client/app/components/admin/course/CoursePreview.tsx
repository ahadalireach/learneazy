import {
  MdDiscount,
  MdAccessTime,
  MdVerifiedUser,
  MdSupport,
} from "react-icons/md";
import React, { FC } from "react";
import { BsCode } from "react-icons/bs";
import styles from "../../../styles/styles";
import { CoursePlayer, Ratings } from "../../common";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isCreate?: boolean;
};

const CoursePreview: FC<Props> = ({
  courseData,
  handleCourseCreate,
  setActive,
  active,
  isCreate,
}) => {
  const discountPercentage =
    courseData?.estimatedPrice && courseData?.price
      ? ((courseData?.estimatedPrice - courseData?.price) /
          courseData?.estimatedPrice) *
        100
      : 0;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div
      className={styles.combineStyles(
        styles.cardStyles.base,
        styles.cardStyles.paddingLarge
      )}
    >
      <div className="mb-6">
        <h2 className={styles.titleStyles.h3}>Course Preview</h2>
        <p className={styles.titleStyles.subtitle}>
          Review your course before publishing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Course Preview Video
            </h3>
            <CoursePlayer
              videoUrl={courseData?.demoUrl}
              title={courseData?.name}
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
              {courseData?.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Ratings rating={0} />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  (0 Reviews)
                </span>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                0 Students
              </span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                {courseData?.level}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              What you&apos;ll learn
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {courseData?.benefits?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                >
                  <IoCheckmarkDoneOutline className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Prerequisites
            </h2>
            <div className="space-y-3">
              {courseData?.prerequisites?.map((item: any, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <IoCheckmarkDoneOutline className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-600 dark:text-slate-400">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Course Description
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                {courseData?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div
            className={styles.combineStyles(
              styles.cardStyles.base,
              styles.cardStyles.paddingMedium,
              "sticky top-8"
            )}
          >
            <div className="space-y-4 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                  {courseData?.price === 0 ? "Free" : `$${courseData?.price}`}
                </span>
                {courseData?.estimatedPrice > 0 &&
                  courseData?.estimatedPrice !== courseData?.price && (
                    <>
                      <span className="text-xl text-slate-500 line-through">
                        ${courseData?.estimatedPrice}
                      </span>
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium px-2 py-1 rounded">
                        {discountPercentagePrice}% OFF
                      </span>
                    </>
                  )}
              </div>

              <button
                disabled
                className={styles.combineStyles(
                  styles.buttonStyles.base,
                  "w-full bg-red-600 text-white cursor-not-allowed opacity-75",
                  styles.buttonStyles.large
                )}
              >
                Buy Now ${courseData?.price}
              </button>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Discount code..."
                  className={styles.combineStyles(
                    styles.inputStyles.base,
                    styles.inputStyles.default,
                    styles.inputStyles.small,
                    "flex-1"
                  )}
                />
                <button
                  className={styles.combineStyles(
                    styles.buttonStyles.base,
                    styles.buttonStyles.secondary,
                    styles.buttonStyles.small,
                    "px-6"
                  )}
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-slate-900 dark:text-white">
                This course includes:
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <BsCode className="w-4 h-4" />
                  <span>Source code included</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <MdAccessTime className="w-4 h-4" />
                  <span>Full lifetime access</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <AiTwotoneSafetyCertificate className="w-4 h-4" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <MdSupport className="w-4 h-4" />
                  <span>Premium support</span>
                </div>
              </div>
            </div>

            {/* Course Info */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Category:
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {courseData?.categories}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Level:
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {courseData?.level}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Language:
                </span>
                <span className="font-medium text-slate-900 dark:text-white">
                  English
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between pt-8 mt-8 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={prevButton}
          className={styles.combineStyles(
            styles.buttonStyles.base,
            styles.buttonStyles.secondary,
            styles.buttonStyles.medium,
            "w-full sm:w-auto min-w-[180px]"
          )}
        >
          Previous Step
        </button>
        <button
          onClick={createCourse}
          className={styles.combineStyles(
            styles.buttonStyles.base,
            styles.buttonStyles.primary,
            styles.buttonStyles.medium,
            "w-full sm:w-auto min-w-[180px]"
          )}
        >
          {isCreate ? "Create Course" : "Update Course"}
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;
