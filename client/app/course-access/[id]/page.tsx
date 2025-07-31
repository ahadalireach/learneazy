/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import {
  EnrolledCourseContent,
  Footer,
  Header,
  Loader,
  PageHead,
} from "@/app/components";

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const id = params.id;
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (item: any) => item._id === id
      );
      if (!isPurchased) {
        redirect("/");
      }
    }
    if (error) {
      redirect("/");
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PageHead
            title={`Course Access | Learneazy`}
            description={`Access your purchased course and continue learning on Learneazy.`}
            keywords={`course access, purchased course, online learning, Ahad Ali LMS, Learneazy`}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="pt-[80px]">
            <EnrolledCourseContent id={id} user={data.user} />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Page;
