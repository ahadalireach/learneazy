"use client";
import {
  Users,
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
        title="Learneazy - Manage Users | Admin Dashboard"
        description="View users and their accounts info on Learneazy platform. "
        keywords="Manage Users, User Management, Ahad Ali LMS, Ahad Ali Project, User Administration, Learneazy Admin"
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
              <Users />
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
