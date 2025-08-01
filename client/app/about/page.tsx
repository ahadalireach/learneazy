"use client";
import React, { useState } from "react";
import { About, Footer, Header, PageHead } from "../components";

type Props = {};

const Page = (props: Props) => {
  const [activeItem] = useState(2);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <PageHead
        title="About Us | Learneazy"
        description="Learn more about Learneazy, a modern learning management system designed to empower programmers with high-quality courses, resources, and community support."
        keywords="Learneazy, about, Empowering Programmers, Ahad Ali LMS, learning management system, programming, courses, education, developers"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <div className="pt-[80px]">
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
