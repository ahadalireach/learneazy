import styles from "../../styles/styles";

type Props = {
  isDashboard?: boolean;
};

const AdminDashboardHero = ({ isDashboard }: Props) => {
  if (!isDashboard) return null;

  return (
    <div
      className={styles.combineStyles(styles.cardStyles.base, "p-6 space-y-6")}
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
        <div className="bg-white dark:bg-slate-900 p-4 lg:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm lg:text-base font-semibold text-slate-900 dark:text-white mb-2">
            Total Users
          </h3>
          <p className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400">
            1,234
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 lg:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm lg:text-base font-semibold text-slate-900 dark:text-white mb-2">
            Total Courses
          </h3>
          <p className="text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">
            56
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 lg:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm lg:text-base font-semibold text-slate-900 dark:text-white mb-2">
            Total Revenue
          </h3>
          <p className="text-2xl lg:text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            $12,345
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 lg:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm lg:text-base font-semibold text-slate-900 dark:text-white mb-2">
            Active Orders
          </h3>
          <p className="text-2xl lg:text-3xl font-bold text-purple-600 dark:text-purple-400">
            89
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                New user registered: John Doe
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Course published: React Masterclass
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Payment received: $299
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">👥</div>
                <span className="text-sm font-medium">Add User</span>
              </div>
            </button>
            <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">📚</div>
                <span className="text-sm font-medium">New Course</span>
              </div>
            </button>
            <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">📊</div>
                <span className="text-sm font-medium">Analytics</span>
              </div>
            </button>
            <button className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">⚙️</div>
                <span className="text-sm font-medium">Settings</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHero;
