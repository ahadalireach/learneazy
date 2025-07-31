import { format } from "timeago.js";
import styles from "@/app/styles/styles";
import { Loader } from "@/app/components";
import { AiOutlineMail } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  isDashboard?: boolean;
};

const Invoices = ({ isDashboard }: Props) => {
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});
  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user._id === item.userId
        );
        const course = coursesData?.courses.find(
          (course: any) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  if (isLoading) {
    return <Loader />;
  }

  if (isDashboard) {
    return (
      <div className="space-y-4">
        {orderData && orderData.length > 0 ? (
          <div className="space-y-3">
            {orderData.slice(0, 5).map((order: any, index: number) => (
              <div
                key={order._id}
                className={styles.combineStyles(
                  "flex items-center justify-between p-3 rounded-lg",
                  "bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50",
                  "border border-slate-200 dark:border-slate-700 transition-colors"
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {order.userName?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">
                      {order.userName || "Unknown User"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {format(order.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600 dark:text-green-400">
                    ${order.price}
                  </p>
                </div>
              </div>
            ))}

            {orderData.length > 5 && (
              <div className="text-center pt-2">
                <button
                  className={styles.combineStyles(
                    styles.buttonStyles.base,
                    styles.buttonStyles.secondary,
                    styles.buttonStyles.small
                  )}
                >
                  View All Transactions
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No transactions yet
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={styles.combineStyles(
        styles.cardStyles.base,
        styles.cardStyles.paddingLarge,
        "min-h-screen"
      )}
    >
      <div className="mb-8">
        <h1 className={styles.titleStyles.h3}>Orders & Invoices</h1>
        <p className={styles.titleStyles.subtitle}>
          Manage all customer orders and transactions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div
          className={styles.combineStyles(
            styles.cardStyles.base,
            styles.cardStyles.paddingMedium,
            "text-center bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
          )}
        >
          <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {orderData.length}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
            Total Orders
          </p>
        </div>

        <div
          className={styles.combineStyles(
            styles.cardStyles.base,
            styles.cardStyles.paddingMedium,
            "text-center bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
          )}
        >
          <div className="w-12 h-12 mx-auto mb-3 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
            $
            {orderData.reduce(
              (total: number, order: any) => total + (order.price || 0),
              0
            )}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
            Total Revenue
          </p>
        </div>

        <div
          className={styles.combineStyles(
            styles.cardStyles.base,
            styles.cardStyles.paddingMedium,
            "text-center bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800"
          )}
        >
          <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
            $
            {orderData.length > 0
              ? (
                  orderData.reduce(
                    (total: number, order: any) => total + (order.price || 0),
                    0
                  ) / orderData.length
                ).toFixed(0)
              : 0}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
            Avg. Order Value
          </p>
        </div>

        <div
          className={styles.combineStyles(
            styles.cardStyles.base,
            styles.cardStyles.paddingMedium,
            "text-center bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800"
          )}
        >
          <div className="w-12 h-12 mx-auto mb-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-orange-600 dark:text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
            {new Set(orderData.map((order: any) => order.userId)).size}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
            Unique Customers
          </p>
        </div>
      </div>

      <div
        className={styles.combineStyles(
          styles.cardStyles.base,
          styles.cardStyles.paddingLarge
        )}
      >
        <div className="mb-6">
          <h3 className={styles.titleStyles.h5}>Recent Orders</h3>
          <p className={styles.titleStyles.subtitleSmall}>
            Latest customer transactions and order details
          </p>
        </div>

        {orderData && orderData.length > 0 ? (
          <div className="space-y-4">
            <div className="block md:hidden space-y-3">
              {orderData.map((order: any) => (
                <div
                  key={order._id}
                  className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {order.userName?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {order.userName || "Unknown User"}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {order.userEmail || "N/A"}
                        </p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      ${order.price || 0}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-medium">Course:</span>{" "}
                      {order.title || "Unknown Course"}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-medium">Date:</span>{" "}
                      {format(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center justify-end mt-3 space-x-2">
                    <a
                      href={`mailto:${order.userEmail}`}
                      className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="Send Email"
                    >
                      <AiOutlineMail size={18} />
                    </a>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white text-sm">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white text-sm">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white text-sm">
                      Course
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white text-sm">
                      Price
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white text-sm">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {orderData.map((order: any) => (
                    <tr
                      key={order._id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                              {order.userName?.charAt(0).toUpperCase() || "U"}
                            </span>
                          </div>
                          <span className="font-medium text-slate-900 dark:text-white text-sm">
                            {order.userName || "Unknown User"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300 text-sm">
                        {order.userEmail || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-slate-900 dark:text-white text-sm font-medium">
                        {order.title || "Unknown Course"}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          ${order.price || 0}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-sm">
                        {format(order.createdAt)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <a
                            href={`mailto:${order.userEmail}`}
                            className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            title="Send Email"
                          >
                            <AiOutlineMail size={16} />
                          </a>
                          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Showing {orderData.length} of {orderData.length} orders
              </p>
              <div className="flex space-x-2">
                <button
                  className={styles.combineStyles(
                    styles.buttonStyles.base,
                    styles.buttonStyles.secondary,
                    styles.buttonStyles.small
                  )}
                >
                  Previous
                </button>
                <button
                  className={styles.combineStyles(
                    styles.buttonStyles.base,
                    styles.buttonStyles.primary,
                    styles.buttonStyles.small
                  )}
                >
                  1
                </button>
                <button
                  className={styles.combineStyles(
                    styles.buttonStyles.base,
                    styles.buttonStyles.secondary,
                    styles.buttonStyles.small
                  )}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              No orders found
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Orders will appear here once customers start purchasing courses
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;
