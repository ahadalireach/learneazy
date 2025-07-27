import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";
import Invoices from "./order/Invoices";
import styles from "../../styles/styles";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import UserAnalytics from "./analytics/UsersAnalytics";
import React, { FC, useEffect, useState } from "react";
import OrdersAnalytics from "./analytics/OrdersAnalytics";

type Props = {
  isDashboard?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const CircularProgressWithLabel: FC<{ open?: boolean; value?: number }> = ({
  open,
  value,
}) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
    </Box>
  );
};

const AdminDashboardHero = ({ isDashboard, open, setOpen }: Props) => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setUserComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const usersLastTwoMonths = data.users.last12Months.slice(-2);
        const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

        if (
          usersLastTwoMonths.length === 2 &&
          ordersLastTwoMonths.length === 2
        ) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;

          const usersPercentChange =
            usersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100;

          const ordersPercentChange =
            ordersPreviousMonth !== 0
              ? ((ordersCurrentMonth - ordersPreviousMonth) /
                  ordersPreviousMonth) *
                100
              : 100;

          setUserComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });

          setOrdersComparePercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  if (!isDashboard) return null;

  return (
    <div
      className={styles.combineStyles(
        styles.cardStyles.base,
        "p-6 space-y-6 min-h-screen"
      )}
    >
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your e-learning platform efficiently
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div
          className={styles.combineStyles(
            styles.cardStyles.base,
            styles.cardStyles.paddingMedium
          )}
        >
          <h3 className="text-sm lg:text-base font-semibold text-slate-900 dark:text-white mb-2">
            Total Users
          </h3>
          <p className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400">
            {userComparePercentage?.currentMonth || 0}
          </p>
        </div>

        <div
          className={styles.combineStyles(
            styles.cardStyles.base,
            styles.cardStyles.paddingMedium
          )}
        >
          <h3 className="text-sm lg:text-base font-semibold text-slate-900 dark:text-white mb-2">
            Total Orders
          </h3>
          <p className="text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">
            {ordersComparePercentage?.currentMonth || 0}
          </p>
        </div>

        <div
          className={styles.combineStyles(
            styles.cardStyles.base,
            styles.cardStyles.paddingMedium
          )}
        >
          <h3 className="text-sm lg:text-base font-semibold text-slate-900 dark:text-white mb-2">
            User Growth
          </h3>
          <p
            className={`text-2xl lg:text-3xl font-bold ${
              userComparePercentage?.percentChange >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {userComparePercentage?.percentChange >= 0 ? "+" : ""}
            {userComparePercentage?.percentChange?.toFixed(1) || 0}%
          </p>
        </div>

        <div
          className={styles.combineStyles(
            styles.cardStyles.base,
            styles.cardStyles.paddingMedium
          )}
        >
          <h3 className="text-sm lg:text-base font-semibold text-slate-900 dark:text-white mb-2">
            Sales Growth
          </h3>
          <p
            className={`text-2xl lg:text-3xl font-bold ${
              ordersComparePercentage?.percentChange >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {ordersComparePercentage?.percentChange >= 0 ? "+" : ""}
            {ordersComparePercentage?.percentChange?.toFixed(1) || 0}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Analytics Chart - Takes 3 columns */}
        <div className="xl:col-span-3">
          <div
            className={styles.combineStyles(
              styles.cardStyles.base,
              styles.cardStyles.paddingMedium
            )}
          >
            <UserAnalytics isDashboard={true} />
          </div>
        </div>

        <div className="space-y-6">
          <div
            className={styles.combineStyles(
              styles.cardStyles.base,
              styles.cardStyles.paddingMedium
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <BiBorderLeft className="text-green-600 dark:text-green-400 text-3xl mb-2" />
                <h5 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {ordersComparePercentage?.currentMonth || 0}
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Sales Obtained
                </p>
              </div>
              <div className="text-center">
                <CircularProgressWithLabel
                  value={ordersComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <p
                  className={`text-sm font-semibold mt-2 ${
                    ordersComparePercentage?.percentChange >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {ordersComparePercentage?.percentChange >= 0 ? "+" : ""}
                  {ordersComparePercentage?.percentChange?.toFixed(2) || 0}%
                </p>
              </div>
            </div>
          </div>

          <div
            className={styles.combineStyles(
              styles.cardStyles.base,
              styles.cardStyles.paddingMedium
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <PiUsersFourLight className="text-blue-600 dark:text-blue-400 text-3xl mb-2" />
                <h5 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {userComparePercentage?.currentMonth || 0}
                </h5>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  New Users
                </p>
              </div>
              <div className="text-center">
                <CircularProgressWithLabel
                  value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <p
                  className={`text-sm font-semibold mt-2 ${
                    userComparePercentage?.percentChange >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {userComparePercentage?.percentChange >= 0 ? "+" : ""}
                  {userComparePercentage?.percentChange?.toFixed(2) || 0}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div
            className={styles.combineStyles(
              styles.cardStyles.base,
              styles.cardStyles.paddingMedium
            )}
          >
            <OrdersAnalytics isDashboard={true} />
          </div>
        </div>

        <div
          className={styles.combineStyles(
            styles.cardStyles.base,
            styles.cardStyles.paddingMedium
          )}
        >
          <h3 className={styles.titleStyles.h5}>Recent Transactions</h3>
          <div className="mt-4">
            <Invoices isDashboard={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHero;
