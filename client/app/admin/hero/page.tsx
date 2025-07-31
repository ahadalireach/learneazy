"use client";
import {
  UpdateHero,
  AdminDashboardSidebar,
  AdminDashboardHeader,
  PageHead,
} from "../../components";
import React, { useState } from "react";
import styles from "../../styles/styles";
import { AdminProtected } from "../../hooks";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminProtected>
      <PageHead
        title="Learneazy - Manage Hero Section | Admin Dashboard"
        description="Update and customize the hero section of Learneazy platform. Manage homepage banner and main text."
        keywords="Hero Section, Homepage Management, Banner Management, Learneazy Admin, Ahad Ali LMS, Ahad Ali Project"
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
              <UpdateHero />
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
