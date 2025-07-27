import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Loader } from "../../common";
import styles from "@/app/styles/styles";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.courses.last12Months.forEach((item: any) => {
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
          <p className="text-blue-600 dark:text-blue-400 font-semibold">
            Courses: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return <Loader />;
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
        <h1 className={styles.titleStyles.h3}>Course Analytics</h1>
        <p className={styles.titleStyles.subtitle}>
          Track your course creation and performance over the last 12 months
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
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {analyticsData.reduce(
                (total: number, item: any) => total + item.count,
                0
              )}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
              Total Courses
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
            <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
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
          <h3 className={styles.titleStyles.h5}>
            Monthly Course Creation Trend
          </h3>
          <p className={styles.titleStyles.subtitleSmall}>
            Number of courses created each month
          </p>
        </div>

        {analyticsData.length > 0 ? (
          <div className="w-full h-[500px] bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
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
                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  className="hover:opacity-80 transition-opacity"
                >
                  <LabelList
                    dataKey="count"
                    position="top"
                    style={{
                      fontSize: "12px",
                      fill: "#64748b",
                      fontWeight: "500",
                    }}
                  />
                </Bar>
              </BarChart>
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              No analytics data available
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Data will appear here once courses are created
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
                <span className="mr-2">📊</span>
                Total courses in last 12 months:{" "}
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
                Most productive month:{" "}
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

export default CourseAnalytics;
