"use client";
import {
  useGetAllCoursesQuery,
  useUpdateCourseMutation,
} from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import CourseData from "./CourseData";
import { redirect } from "next/navigation";
import CourseOptions from "./CourseOptions";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import styles from "../../../styles/styles";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";

type Props = {
  id: string;
};

const UpdateCourse = ({ id }: Props) => {
  const [updateCourse, { isSuccess, error }] = useUpdateCourseMutation();
  const { data } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const editCourseData = data && data.courses.find((i: any) => i._id === id);

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        estimatedPrice: editCourseData?.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        categories: editCourseData.categories,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData?.thumbnail?.url,
      });

      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    categories: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully");
      redirect("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoLength: courseContent.videoLength,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories: courseInfo.categories,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };
    setCourseData(data);
  };

  const handleCourseUpdate = async (e: any) => {
    const data = courseData;
    await updateCourse({ id: editCourseData?._id, data });
  };

  return (
    <div className="w-full flex flex-col 1000px:flex-row gap-6">
      <div className="w-full 1000px:w-[25%] 1000px:sticky 1000px:top-[100px] 1000px:h-fit">
        <div
          className={styles.combineStyles(
            styles.cardStyles.base,
            styles.cardStyles.paddingMedium
          )}
        >
          <CourseOptions
            active={active}
            setActive={setActive}
            isCreate={false}
          />
        </div>
      </div>

      <div className="w-full 1000px:w-[75%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseUpdate}
            isCreate={false}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateCourse;
