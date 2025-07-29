/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import {
  CourseDetails,
  Footer,
  Header,
  Loader,
  PageHead,
} from "@/app/components";
import { useGetPublicCoursePreviewQuery } from "@/redux/features/courses/coursesApi";

const Page = () => {
  const params = useParams();
  const courseId = params.id as string;
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { data, isLoading } = useGetPublicCoursePreviewQuery(courseId);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PageHead
            title={`Learneazy - ${data?.title} | Course Details`}
            description={data?.description}
            keywords={`${data?.title}, Course Details, Ahad Ali LMS, Ahad Ali Project`}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="pt-[80px]">
            <CourseDetails
              data={data?.course}
              setRoute={setRoute}
              setOpen={setOpen}
            />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Page;
