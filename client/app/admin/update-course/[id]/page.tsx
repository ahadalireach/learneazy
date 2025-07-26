/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import {
  UpdateCourse,
  AdminDashboardSidebar,
  AdminDashboardHeader,
  PageHead,
} from "../../../components";
import React, { useState } from "react";
import styles from "../../../styles/styles";
import { AdminProtected } from "../../../hooks";
import { useParams } from "next/navigation";

type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const params = useParams();
  const courseId = params.id as string;

  return (
    <AdminProtected>
      <PageHead
        title="Learneazy - Update Course"
        description="Update and manage courses on Learneazy platform"
        keywords="Create,Course,Learneazy,Admin"
      />
      <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminDashboardHeader
          open={open}
          setOpen={setOpen}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className={styles.sectionStyles.container}>
          <div className="flex gap-8 py-[120px]">
            <div
              className={styles.combineStyles(
                "w-[80px] 800px:w-[320px] transition-all duration-200 sticky h-fit",
                styles.cardStyles.base
              )}
            >
              <AdminDashboardSidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
              />
            </div>
            <div className="flex-1">
              <UpdateCourse id={courseId} />
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default page;
