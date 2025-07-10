import React, { FC } from "react";
import styles from "../../../styles/styles";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className={styles.titleStyles.h5}>Course Creation Steps</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Complete each step to create your course
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 lg:gap-6">
        {options.map((option: any, index: number) => (
          <div key={index} className="flex-1">
            <div className="flex items-center gap-3 sm:flex-col sm:gap-2">
              <div className="flex items-center gap-2 sm:flex-col sm:gap-1">
                <div
                  className={styles.combineStyles(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 flex-shrink-0",
                    active >= index
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-400"
                  )}
                >
                  {active > index ? (
                    <IoMdCheckmark className="text-sm sm:text-lg" />
                  ) : (
                    <span className="text-xs sm:text-sm font-medium">
                      {index + 1}
                    </span>
                  )}
                </div>

                {index !== options.length - 1 && (
                  <div
                    className={styles.combineStyles(
                      "flex-1 h-0.5 sm:h-6 sm:w-0.5 transition-all duration-200 sm:hidden lg:block lg:h-0.5 lg:w-full",
                      active > index
                        ? "bg-blue-600"
                        : "bg-slate-300 dark:bg-slate-600"
                    )}
                  />
                )}
              </div>

              <div className="flex-1 sm:text-center">
                <h4
                  className={styles.combineStyles(
                    "font-medium text-sm sm:text-xs lg:text-sm transition-all duration-200",
                    active >= index
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400"
                  )}
                >
                  {option}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 hidden sm:block">
                  {index === 0 && "Basic details"}
                  {index === 1 && "Benefits & prerequisites"}
                  {index === 2 && "Videos & materials"}
                  {index === 3 && "Review & publish"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseOptions;
