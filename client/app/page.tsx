"use client";
import React, { FC, useState } from "react";
import { PageHead, Header, Hero, HomeCourses, Reviews, Faqs, Footer } from "./components";

type Props = object;

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <PageHead
        title="Learneazy - Online Learning Platform"
        description="Learneazy is an interactive e-learning platform for students to learn, connect with teachers, and access educational resources. Discover courses, get academic help, and enhance your skills online."
        keywords="Online Learning, Ahad Ali LMS, Ahad Ali Project, Student Help, Educational Resources, E-learning Platform, Learneazy Admin"
      />
      <div>
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <div className="pt-[80px]">
          <Hero />
          <HomeCourses />
          <Reviews />
          <Faqs />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Page;
