/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Heading from "../components/common/PageHead";
import Header from "../components/common/Header";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtectedRoute";
import { useSelector } from "react-redux";
import Profile from "../components/profile/ProfileDashboard";

type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [activeItem, setActiveItem] = useState(5);
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`${user?.name} Profile - Elearning`}
          description="ELearning is a platform for students to learn and get help from teachers"
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
          <Profile user={user} />
        </div>
      </Protected>
    </div>
  );
};

export default page;
