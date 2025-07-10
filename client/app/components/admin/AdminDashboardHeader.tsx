"use client";
import Link from "next/link";
import Image from "next/image";
import { format } from "timeago.js";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import { avatar as avatarIcon } from "@/public";
import ThemeToggle from "../common/ThemeToggle";
import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdMarkAsUnread, MdDelete } from "react-icons/md";
import { HiOutlineUserCircle, HiOutlineX } from "react-icons/hi";

type Props = {
  open?: boolean;
  setOpen?: any;
  sidebarOpen?: boolean;
  setSidebarOpen?: any;
};

const dummyNotifications = [
  {
    id: 1,
    title: "New User Registration",
    message:
      "John Doe has registered as a new student. Please review their profile.",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    type: "user",
    read: false,
  },
  {
    id: 2,
    title: "Course Enrollment",
    message: "25 new students enrolled in 'React Masterclass' course today.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    type: "course",
    read: false,
  },
  {
    id: 3,
    title: "Payment Received",
    message:
      "$299 payment received for Premium Course Package from Sarah Wilson.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    type: "payment",
    read: true,
  },
  {
    id: 4,
    title: "New Review Posted",
    message:
      "Alice Johnson posted a 5-star review for 'JavaScript Fundamentals'.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    type: "review",
    read: false,
  },
  {
    id: 5,
    title: "Server Maintenance",
    message:
      "Scheduled server maintenance completed successfully. All systems are running normally.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    type: "system",
    read: true,
  },
];

const AdminDashboardHeader: FC<Props> = ({
  open,
  setOpen,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { user } = useSelector((state: any) => state.auth);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [unreadCount, setUnreadCount] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const unread = notifications.filter((notif) => !notif.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    const icons = {
      user: "👤",
      course: "📚",
      payment: "💰",
      review: "⭐",
      system: "⚙️",
      achievement: "🏆",
    };
    return icons[type as keyof typeof icons] || "📢";
  };

  const getNotificationColor = (type: string) => {
    const colors = {
      user: "border-l-blue-500",
      course: "border-l-green-500",
      payment: "border-l-yellow-500",
      review: "border-l-purple-500",
      system: "border-l-red-500",
      achievement: "border-l-indigo-500",
    };
    return colors[type as keyof typeof colors] || "border-l-gray-500";
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  return (
    <div className="w-full relative">
      <div
        className={`fixed top-0 left-0 w-full h-[80px] z-[80] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 transition duration-300 ${
          active ? "shadow-lg backdrop-blur-md" : ""
        }`}
      >
        <div className={styles.sectionStyles.container}>
          <div className="w-full h-[80px] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className={styles.navStyles.brand}>
                Learneazy
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                >
                  <IoMdNotificationsOutline className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 text-xs flex items-center justify-center text-white font-medium">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {open && (
                  <div className="absolute top-12 right-0 w-[90vw] max-w-md sm:w-80 lg:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-[1000] overflow-hidden">
                    <div className="flex items-center justify-between p-3 lg:p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                      <div className="flex items-center gap-2 lg:gap-3">
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm lg:text-base">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded-full font-medium">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 lg:gap-2">
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium px-2 py-1"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="max-h-[50vh] lg:max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-6 lg:p-8 text-center">
                          <div className="text-3xl lg:text-4xl mb-2">🔔</div>
                          <p className="text-slate-500 dark:text-slate-400 text-sm">
                            No notifications yet
                          </p>
                        </div>
                      ) : (
                        notifications.map((item) => (
                          <div
                            key={item.id}
                            className={`border-l-4 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800 ${getNotificationColor(
                              item.type
                            )} ${
                              !item.read
                                ? "bg-blue-50/30 dark:bg-blue-900/10"
                                : ""
                            }`}
                          >
                            <div className="p-3 lg:p-4 border-b border-slate-100 dark:border-slate-800">
                              <div className="flex items-start gap-2 lg:gap-3">
                                <span className="text-base lg:text-lg flex-shrink-0 mt-0.5">
                                  {getNotificationIcon(item.type)}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4
                                      className={`font-medium text-xs lg:text-sm ${
                                        !item.read
                                          ? "text-slate-900 dark:text-white"
                                          : "text-slate-600 dark:text-slate-400"
                                      }`}
                                    >
                                      {item.title}
                                    </h4>
                                    {!item.read && (
                                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                    )}
                                  </div>
                                  <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-1 lg:mb-2 line-clamp-2">
                                    {item.message}
                                  </p>
                                  <p className="text-xs text-slate-500 dark:text-slate-500">
                                    {format(item.createdAt)}
                                  </p>
                                </div>
                                <div className="flex items-center gap-0.5 lg:gap-1 flex-shrink-0">
                                  {!item.read && (
                                    <button
                                      onClick={() => markAsRead(item.id)}
                                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                      title="Mark as read"
                                    >
                                      <MdMarkAsUnread className="w-3 h-3 lg:w-4 lg:h-4 text-slate-400 hover:text-blue-500" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => deleteNotification(item.id)}
                                    className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                    title="Delete"
                                  >
                                    <MdDelete className="w-3 h-3 lg:w-4 lg:h-4 text-slate-400 hover:text-red-500" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {notifications.length > 0 && (
                      <div className="p-2 lg:p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                        <button className="w-full text-center text-xs lg:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium py-1.5 lg:py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                          View All Notifications
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {user ? (
                <Link href={"/profile"}>
                  <Image
                    src={user.avatar ? user.avatar.url : avatarIcon}
                    alt="User Avatar"
                    width={25}
                    height={25}
                    className="w-[25px] h-[25px] rounded-full cursor-pointer"
                  />
                </Link>
              ) : (
                <button
                  className="hidden 800px:block cursor-pointer text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setOpen(true)}
                >
                  <HiOutlineUserCircle size={25} />
                </button>
              )}
            </div>
          </div>
        </div>

        {sidebarOpen && (
          <div className="fixed w-full h-screen top-0 left-0 z-[99999] bg-black/50 dark:bg-black/70 800px:hidden">
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 top-0 right-0 shadow-2xl">
              <div
                className="p-4 flex justify-end cursor-pointer text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setSidebarOpen(false)}
              >
                <HiOutlineX size={25} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
