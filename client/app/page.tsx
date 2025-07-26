"use client";
import React, { FC, useState } from "react";
import { PageHead, Header, HeroSection } from "./components";

type Props = object;

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <PageHead
        title="Learneazy Platform"
        description="Learneazy is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux"
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
          <HeroSection />
        </div>
      </div>
    </>
  );
};

export default Page;
