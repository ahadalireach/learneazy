/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import {
  AdminDashboardHero,
  AdminDashboardSidebar,
  AdminDashboardHeader,
  PageHead,
} from "../components";
import styles from "../styles/styles";
import React, { useState } from "react";
import { AdminProtected } from "../hooks";

type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminProtected>
      <PageHead
        title="Learneazy - Admin Dashboard"
        description="Learneazy admin dashboard for managing courses, users, and analytics"
        keywords="Admin,Dashboard,Learneazy,Management"
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
              <AdminDashboardHero isDashboard={true} />
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default page;
