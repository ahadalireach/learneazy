/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { CourseCard } from "../course";
import ProfileInfo from "./ProfileInfo";
import styles from "../../styles/styles";
import { signOut } from "next-auth/react";
import ProfileSidebar from "./ProfileSidebar";
import ChangePassword from "./ChangePassword";
import React, { FC, useEffect, useState } from "react";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { useGetAllPublicCoursePreviewsQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const ProfileDashboard: FC<Props> = ({ user }) => {
  const [avatar] = useState(null);
  const [active, setActive] = useState(1);
  const [courses, setCourses] = useState([]);
  const [logout, setLogout] = useState(false);

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const { data } = useGetAllPublicCoursePreviewsQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data]);

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  return (
    <div className={styles.sectionStyles.container}>
      <div className="flex gap-8">
        <div
          className={styles.combineStyles(
            "w-[80px] 800px:w-[320px] transition-all duration-200 sticky h-fit",
            styles.cardStyles.base
          )}
        >
          <ProfileSidebar
            user={user}
            active={active}
            avatar={avatar}
            setActive={setActive}
            logOutHandler={logOutHandler}
          />
        </div>

        <div className="flex-1">
          {active === 1 && (
            <div className={styles.cardStyles.base}>
              <ProfileInfo avatar={avatar} user={user} />
            </div>
          )}

          {active === 2 && (
            <div className={styles.cardStyles.base}>
              <ChangePassword />
            </div>
          )}

          {active === 3 && (
            <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8">
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                {courses &&
                  courses.map((item: any, index: number) => (
                    <CourseCard item={item} key={index} isProfile={true} />
                  ))}
              </div>
              {courses.length === 0 && (
                <div
                  className={styles.combineStyles(
                    styles.cardStyles.base,
                    styles.cardStyles.elevated,
                    styles.cardStyles.paddingLarge,
                    "flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 mb-8"
                  )}
                >
                  <svg
                    className="w-12 h-12 mb-4 text-blue-400 dark:text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0H7m5 0h5"
                    />
                  </svg>
                  <h2
                    className={styles.combineStyles(
                      styles.titleStyles.h5,
                      "mb-2 text-blue-600 dark:text-blue-400 font-Poppins"
                    )}
                  >
                    No Courses Yet
                  </h2>
                  <p
                    className={styles.combineStyles(
                      styles.titleStyles.subtitle,
                      "mb-2 text-slate-600 dark:text-slate-400"
                    )}
                  >
                    You haven&apos;t purchased any courses yet.
                  </p>
                  <a
                    href="/courses"
                    className={styles.combineStyles(
                      styles.buttonStyles.base,
                      styles.buttonStyles.primary,
                      styles.buttonStyles.medium,
                      "mt-4"
                    )}
                  >
                    Browse Courses
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
