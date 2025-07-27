import React, { FC } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader } from "../../common";
import styles from "@/app/styles/styles";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={styles.combineStyles(
            styles.cardStyles.base,
            styles.cardStyles.paddingSmall,
            "shadow-lg border-slate-300 dark:border-slate-600"
          )}
        >
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
            {label}
          </p>
          <p className="text-purple-600 dark:text-purple-400 font-semibold">
            Users: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isDashboard) {
    return (
      <div
        className={styles.combineStyles(
          styles.cardStyles.base,
          styles.cardStyles.paddingMedium,
          "h-[30vh]"
        )}
      >
        <div className="mb-4">
          <h3 className={styles.titleStyles.h5}>Users Analytics</h3>
        </div>

        <div className="w-full h-full">
          {analyticsData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analyticsData}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  className="dark:stroke-slate-600"
                />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  tick={{ fontSize: 10, fill: "#64748b" }}
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fontSize: 10, fill: "#64748b" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No data available
              </p>
            </div>
          )}
        </div>
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
        <h1 className={styles.titleStyles.h3}>Users Analytics</h1>
        <p className={styles.titleStyles.subtitle}>
          Track user growth and engagement over the last 12 months
        </p>
      </div>

      <div
        className={styles.combineStyles(
          styles.cardStyles.base,
          styles.cardStyles.paddingLarge,
          "bg-slate-50 dark:bg-slate-800/50"
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={styles.combineStyles(
              styles.cardStyles.base,
              styles.cardStyles.paddingMedium,
              "text-center"
            )}
          >
            <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {analyticsData.reduce(
                (total: number, item: any) => total + item.count,
                0
              )}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
              Total Users
            </p>
          </div>

          <div
            className={styles.combineStyles(
              styles.cardStyles.base,
              styles.cardStyles.paddingMedium,
              "text-center"
            )}
          >
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {analyticsData.length > 0
                ? Math.max(...analyticsData.map((item: any) => item.count))
                : 0}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
              Peak Month
            </p>
          </div>

          <div
            className={styles.combineStyles(
              styles.cardStyles.base,
              styles.cardStyles.paddingMedium,
              "text-center"
            )}
          >
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
              {analyticsData.length > 0
                ? (
                    analyticsData.reduce(
                      (total: number, item: any) => total + item.count,
                      0
                    ) / analyticsData.length
                  ).toFixed(1)
                : 0}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
              Monthly Average
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className={styles.titleStyles.h5}>Monthly User Growth</h3>
          <p className={styles.titleStyles.subtitleSmall}>
            Number of new users registered each month
          </p>
        </div>

        {analyticsData.length > 0 ? (
          <div className="w-full h-[500px] bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  className="dark:stroke-slate-600"
                />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  className="text-sm font-medium"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <YAxis
                  stroke="#64748b"
                  className="text-sm font-medium"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorUser)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              No user data available
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Data will appear here once users register
            </p>
          </div>
        )}

        {analyticsData.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <h4 className={styles.titleStyles.h6}>Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div
                className={styles.combineStyles(
                  styles.badgeStyles.base,
                  styles.badgeStyles.primary,
                  styles.badgeStyles.medium,
                  "justify-start"
                )}
              >
                <span className="mr-2">👥</span>
                Total users in last 12 months:{" "}
                {analyticsData.reduce(
                  (total: number, item: any) => total + item.count,
                  0
                )}
              </div>
              <div
                className={styles.combineStyles(
                  styles.badgeStyles.base,
                  styles.badgeStyles.success,
                  styles.badgeStyles.medium,
                  "justify-start"
                )}
              >
                <span className="mr-2">📈</span>
                Highest growth month:{" "}
                {
                  analyticsData.reduce(
                    (max: any, item: any) =>
                      item.count > max.count ? item : max,
                    analyticsData[0]
                  )?.name
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAnalytics;
