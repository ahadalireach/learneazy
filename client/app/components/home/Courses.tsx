import Link from "next/link";
import { Loader } from "../common";
import { HiArrowRight } from "react-icons/hi";
import CourseCard from "../course/CourseCard";
import React, { useEffect, useState } from "react";
import styles, { combineStyles } from "@/app/styles/styles";
import { useGetAllPublicCoursePreviewsQuery } from "@/redux/features/courses/coursesApi";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetAllPublicCoursePreviewsQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <section
      className={combineStyles(
        styles.sectionStyles.backgroundDefault,
        "py-16 lg:py-20"
      )}
    >
      <div className={styles.sectionStyles.container}>
        <div className="text-center mb-12 lg:mb-16">
          <h1
            className={combineStyles(
              styles.titleStyles.h2,
              "text-center font-Poppins mb-4"
            )}
          >
            <span>
              Expand Your Career{" "}
              <span className={combineStyles(styles.utilityStyles.textAccent)}>
                Opportunity
              </span>
            </span>
            <br />
            <span>With Our Courses</span>
          </h1>
          <p
            className={combineStyles(
              styles.titleStyles.subtitle,
              "max-w-2xl mx-auto"
            )}
          >
            Discover world-class courses designed to help you learn new skills
            and advance your career with expert instructors.
          </p>
        </div>

        {isLoading ? (
          <Loader />
        ) : courses && courses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-12">
              {courses.slice(0, 6).map((item: any, index: number) => (
                <CourseCard item={item} key={index} />
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/courses"
                className={combineStyles(
                  styles.buttonStyles.base,
                  styles.buttonStyles.primary,
                  styles.buttonStyles.large,
                  "group inline-flex items-center gap-3"
                )}
              >
                View All Courses
                <HiArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="mb-6">
              <svg
                className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <h3 className={combineStyles(styles.titleStyles.h4, "mb-3")}>
              No courses available
            </h3>
            <p className={styles.titleStyles.subtitle}>
              Check back soon for new courses and learning opportunities.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;
