import { Loader } from "../common";
import React, { useState } from "react";
import styles from "@/app/styles/styles";
import CourseContentSections from "./CourseContentSections";
import EnrolledCourseContentMedia from "./EnrolledCourseContentMedia";
import { useGetEnrolledCourseContentQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  id: string;
  user: any;
};

const CourseContent = ({ id, user }: Props) => {
  const [activeVideo, setActiveVideo] = useState(0);

  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetEnrolledCourseContentQuery(id, { refetchOnMountOrArgChange: true });
  const data = contentData?.content;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={
            styles.sectionStyles.container +
            " flex flex-col lg:flex-row gap-y-8 lg:gap-x-12"
          }
        >
          <div className="w-full lg:flex-1">
            <EnrolledCourseContentMedia
              data={data}
              id={id}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              user={user}
              refetch={refetch}
            />
          </div>
          <div className="w-full lg:max-w-xs hidden lg:block">
            <CourseContentSections
              setActiveVideo={setActiveVideo}
              data={data}
              activeVideo={activeVideo}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CourseContent;
