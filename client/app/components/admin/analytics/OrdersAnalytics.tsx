import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Loader } from "../../common";
import styles from "@/app/styles/styles";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

type Props = {
  isDashboard?: boolean;
};

const OrdersAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  const analyticsData: any = [];

  // Fixed data mapping - ensure we're getting the correct field names
  data &&
    data.orders.last12Months.forEach((item: any) => {
      analyticsData.push({
        name: item.name || item.month,
        Count: item.count,
      });
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
          <p className="text-green-600 dark:text-green-400 font-semibold">
            Orders: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return <Loader />;
  }

  // Dashboard view (compact)
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
          <h3 className={styles.titleStyles.h5}>Orders Analytics</h3>
        </div>

        <div className="w-full h-full">
          {analyticsData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analyticsData}
                margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
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
                  height={60}
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fontSize: 10, fill: "#64748b" }}
                  domain={[0, "dataMax + 1"]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="Count"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#10b981" }}
                  connectNulls={false}
                />
              </LineChart>
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
        <h1 className={styles.titleStyles.h3}>Orders Analytics</h1>
        <p className={styles.titleStyles.subtitle}>
          Track your order trends and performance over the last 12 months
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
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
              {analyticsData.reduce(
                (total: number, item: any) => total + (item.Count || 0),
                0
              )}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
              Total Orders
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
                ? Math.max(...analyticsData.map((item: any) => item.Count || 0))
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
                      (total: number, item: any) => total + (item.Count || 0),
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
          <h3 className={styles.titleStyles.h5}>Monthly Order Trends</h3>
          <p className={styles.titleStyles.subtitleSmall}>
            Number of orders received each month
          </p>
        </div>

        {analyticsData.length > 0 ? (
          <div className="w-full h-[500px] bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
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
                  height={60}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis
                  stroke="#64748b"
                  className="text-sm font-medium"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  domain={[0, "dataMax + 1"]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{
                    paddingTop: "20px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#64748b",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="Count"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  activeDot={{
                    r: 6,
                    fill: "#10b981",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                  name="Orders"
                  connectNulls={false}
                />
              </LineChart>
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              No orders data available
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Data will appear here once orders are placed
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
                  styles.badgeStyles.success,
                  styles.badgeStyles.medium,
                  "justify-start"
                )}
              >
                <span className="mr-2">🛒</span>
                Total orders in last 12 months:{" "}
                {analyticsData.reduce(
                  (total: number, item: any) => total + (item.Count || 0),
                  0
                )}
              </div>
              <div
                className={styles.combineStyles(
                  styles.badgeStyles.base,
                  styles.badgeStyles.primary,
                  styles.badgeStyles.medium,
                  "justify-start"
                )}
              >
                <span className="mr-2">📈</span>
                Best performing month:{" "}
                {analyticsData.length > 0 &&
                  analyticsData.reduce(
                    (max: any, item: any) =>
                      (item.Count || 0) > (max.Count || 0) ? item : max,
                    analyticsData[0]
                  )?.name}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersAnalytics;
