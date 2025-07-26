/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { UserProtected } from "../hooks";
import { useSelector } from "react-redux";
import React, { FC, useState } from "react";
import { Header, PageHead, ProfileDashboard } from "../components";

type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeItem, setActiveItem] = useState(5);
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="min-h-screen">
      <UserProtected>
        <PageHead
          title={`${user?.name} Profile - Learneazy`}
          description="Learneazy is a platform for students to learn and get help from teachers"
          keywords="Prograaming,MERN,Redux,Machine Learning"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <div className="py-[120px]">
          <ProfileDashboard user={user} />
        </div>
      </UserProtected>
    </div>
  );
};

export default page;
