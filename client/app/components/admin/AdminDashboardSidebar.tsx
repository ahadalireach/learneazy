"use client";
import {
  MdDashboard,
  MdPeople,
  MdCategory,
  MdAnalytics,
  MdPayment,
  MdLogout,
  MdGroups,
  MdVideoCall,
  MdOndemandVideo,
  MdWeb,
  MdQuiz,
  MdManageHistory,
  MdBarChart,
} from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { avatar as avatarIcon } from "@/public";

interface Props {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const AdminDashboardSidebar = ({ isOpen = false, setIsOpen }: Props) => {
  const pathname = usePathname();
  const { user } = useSelector((state: any) => state.auth);

  const menuSections = [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          icon: MdDashboard,
          path: "/admin",
        },
      ],
    },
    {
      title: "Data",
      items: [
        {
          title: "Users",
          icon: MdGroups,
          path: "/admin/users",
        },
        {
          title: "Invoices",
          icon: MdPayment,
          path: "/admin/invoices",
        },
      ],
    },
    {
      title: "Content",
      items: [
        {
          title: "Create Course",
          icon: MdVideoCall,
          path: "/admin/create-course",
        },
        {
          title: "Live Courses",
          icon: MdOndemandVideo,
          path: "/admin/courses",
        },
      ],
    },
    {
      title: "Customization",
      items: [
        {
          title: "Hero",
          icon: MdWeb,
          path: "/admin/hero",
        },
        {
          title: "FAQ",
          icon: MdQuiz,
          path: "/admin/faq",
        },
        {
          title: "Categories",
          icon: MdCategory,
          path: "/admin/categories",
        },
      ],
    },
    {
      title: "Controllers",
      items: [
        {
          title: "Manage Team",
          icon: MdPeople,
          path: "/admin/team",
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          title: "Courses Analytics",
          icon: MdBarChart,
          path: "/admin/courses-analytics",
        },
        {
          title: "Orders Analytics",
          icon: MdAnalytics,
          path: "/admin/orders-analytics",
        },
        {
          title: "Users Analytics",
          icon: MdManageHistory,
          path: "/admin/users-analytics",
        },
      ],
    },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center flex-col border-b dark:border-[#ffffff1d] border-[#00000014] pb-3 pt-3">
        <Image
          src={user?.avatar?.url || user?.avatar || avatarIcon}
          alt="Admin Profile"
          width={80}
          height={80}
          className="w-[40px] h-[40px] sm:w-[80px] sm:h-[80px] rounded-full border cursor-pointer mb-4"
        />
        <h5 className="text-[12px] sm:text-[18px] font-Poppins dark:text-white text-black">
          {user?.name || "Admin User"}
        </h5>
        <h6 className="text-[10px] sm:text-[12px] font-Poppins dark:text-white text-black">
          {user?.role || "Administrator"}
        </h6>
      </div>

      <div className="py-2 overflow-y-auto ">
        {menuSections.map((section, sectionIndex) => (
          <div key={section.title}>
            <div className="px-6 py-2">
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-Poppins 800px:block hidden">
                {section.title}
              </h3>
            </div>

            {section.items.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen?.(false)}
                className={styles.combineStyles(
                  styles.navStyles.menuItem,
                  isActive(item.path)
                    ? styles.navStyles.menuItemActive
                    : styles.navStyles.menuItemInactive
                )}
              >
                <item.icon
                  size={20}
                  className={
                    isActive(item.path)
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-slate-700 dark:text-slate-300"
                  }
                />
                <h5
                  className={styles.combineStyles(
                    "pl-3 800px:block hidden font-Poppins text-sm font-medium",
                    isActive(item.path)
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-slate-700 dark:text-slate-300"
                  )}
                >
                  {item.title}
                </h5>
              </Link>
            ))}
          </div>
        ))}

        <Link
          href="/"
          className={styles.combineStyles(
            styles.navStyles.menuItem,
            styles.navStyles.menuItemInactive,
            "mt-4 border-t border-slate-200 dark:border-slate-700"
          )}
        >
          <MdLogout size={20} className="text-slate-700 dark:text-slate-300" />
          <h5 className="pl-3 800px:block hidden font-Poppins text-sm font-medium text-slate-700 dark:text-slate-300">
            Back to Site
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardSidebar;
