import {
  AiOutlineDelete,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai";
import {
  buttonStyles,
  cardStyles,
  combineStyles,
  titleStyles,
  inputStyles,
  labelStyles,
  badgeStyles,
} from "@/app/styles/styles";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { format } from "timeago.js";
import { Loader } from "../../common";
import { useTheme } from "next-themes";
import { toast } from "react-hot-toast";
import { FiUsers } from "react-icons/fi";
import { Box, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { FC, useEffect, useState } from "react";

type Props = {
  isTeam?: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [windowWidth, setWindowWidth] = useState(0);

  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();

  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully!");
      setActive(false);
    }
    if (deleteSuccess) {
      refetch();
      toast.success("Delete user successfully!");
      setOpen(false);
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError, refetch]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      minWidth: 60,
      hide: isMobile,
    },
    {
      field: "name",
      headerName: isMobile ? "User" : "Name",
      flex: isMobile ? 2 : 1,
      minWidth: isMobile ? 150 : 180,
      renderCell: (params: any) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
            <AiOutlineUser
              className="text-blue-600 dark:text-blue-400"
              size={16}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-slate-900 dark:text-white truncate">
              {params.value}
            </div>
            {isMobile && (
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {params.row.email}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
      hide: isMobile,
      renderCell: (params: any) => (
        <div className="font-medium text-slate-700 dark:text-slate-300 truncate">
          {params.value}
        </div>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: isMobile ? 80 : 120,
      minWidth: isMobile ? 70 : 100,
      renderCell: (params: any) => (
        <span
          className={combineStyles(
            badgeStyles.base,
            params.value === "admin"
              ? badgeStyles.primary
              : badgeStyles.secondary,
            isMobile ? badgeStyles.small : badgeStyles.medium
          )}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "courses",
      headerName: isTablet ? "Courses" : "Purchased Courses",
      width: isTablet ? 90 : 140,
      minWidth: isTablet ? 80 : 120,
      renderCell: (params: any) => (
        <div className="flex items-center space-x-2">
          <span className="font-medium text-green-600 dark:text-green-400">
            {params.value}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {params.value === 1 ? "course" : "courses"}
          </span>
        </div>
      ),
    },
    {
      field: "created_at",
      headerName: "Joined",
      width: isTablet ? 0 : 120,
      minWidth: isTablet ? 0 : 100,
      hide: isTablet,
      renderCell: (params: any) => (
        <span className="text-sm text-slate-600 dark:text-slate-300">
          {params.value}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: isMobile ? 100 : 120,
      minWidth: isMobile ? 80 : 100,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <div className={`flex items-center ${isMobile ? "gap-1" : "gap-2"}`}>
          <button
            onClick={() => {
              setOpen(!open);
              setUserId(params.row.id);
            }}
            className={`${
              isMobile ? "p-1.5" : "p-2"
            } rounded-lg text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/20`}
            title="Delete user"
          >
            <AiOutlineDelete size={isMobile ? 14 : 16} />
          </button>
          <a
            href={`mailto:${params.row.email}`}
            className={`${
              isMobile ? "p-1.5" : "p-2"
            } rounded-lg text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            title="Send email"
          >
            <AiOutlineMail size={isMobile ? 14 : 16} />
          </a>
        </div>
      ),
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");

    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 w-full">
      <div className="px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 max-w-full">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader />
          </div>
        ) : (
          <>
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1
                    className={combineStyles(
                      titleStyles.h3,
                      "mb-2 text-xl sm:text-2xl lg:text-3xl"
                    )}
                  >
                    {isTeam ? "Team Management" : "User Management"}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-base">
                    {isTeam
                      ? "Manage your team members and their roles"
                      : "View and manage all platform users"}
                  </p>
                </div>

                {isTeam && (
                  <button
                    onClick={() => setActive(!active)}
                    className={combineStyles(
                      buttonStyles.base,
                      buttonStyles.primary,
                      isMobile ? buttonStyles.small : buttonStyles.medium,
                      "flex items-center gap-2"
                    )}
                  >
                    <AiOutlineUserAdd size={isMobile ? 16 : 18} />
                    {isMobile ? "Add" : "Add New Member"}
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
              <div
                className={combineStyles(cardStyles.base, "p-3 sm:p-4 lg:p-6")}
              >
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                    <FiUsers
                      className="text-blue-600 dark:text-blue-400"
                      size={isMobile ? 16 : 20}
                    />
                  </div>
                  <div className="ml-2 sm:ml-4 min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 truncate">
                      {isMobile ? "Total" : "Total Users"}
                    </p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
                      {isTeam
                        ? data?.users?.filter(
                            (user: any) => user.role === "admin"
                          ).length || 0
                        : data?.users?.length || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={combineStyles(cardStyles.base, "p-3 sm:p-4 lg:p-6")}
              >
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/30 rounded-lg flex-shrink-0">
                    <AiOutlineUser
                      className="text-green-600 dark:text-green-400"
                      size={isMobile ? 16 : 20}
                    />
                  </div>
                  <div className="ml-2 sm:ml-4 min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 truncate">
                      {isMobile ? "Admins" : "Admin Users"}
                    </p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
                      {data?.users?.filter((user: any) => user.role === "admin")
                        .length || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={combineStyles(cardStyles.base, "p-3 sm:p-4 lg:p-6")}
              >
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
                    <AiOutlineUser
                      className="text-purple-600 dark:text-purple-400"
                      size={isMobile ? 16 : 20}
                    />
                  </div>
                  <div className="ml-2 sm:ml-4 min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 truncate">
                      {isMobile ? "Regular" : "Regular Users"}
                    </p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
                      {data?.users?.filter((user: any) => user.role === "user")
                        .length || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={combineStyles(cardStyles.base, "p-3 sm:p-4 lg:p-6")}
              >
                <div className="flex items-center">
                  <div className="p-2 sm:p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex-shrink-0">
                    <span className="text-yellow-600 dark:text-yellow-400 text-sm sm:text-lg font-bold">
                      📚
                    </span>
                  </div>
                  <div className="ml-2 sm:ml-4 min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 truncate">
                      {isMobile ? "Courses" : "Total Enrollments"}
                    </p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
                      {data?.users?.reduce(
                        (acc: number, user: any) =>
                          acc + (user.courses?.length || 0),
                        0
                      ) || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={combineStyles(cardStyles.base, "overflow-hidden")}>
              <div className="p-3 sm:p-4 lg:p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-slate-900 dark:text-white">
                  {isTeam ? "Team Members" : "All Users"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {isTeam
                    ? "Manage your team members and their permissions"
                    : "View and manage all registered users"}
                </p>
              </div>

              <div className="overflow-x-auto">
                <Box
                  sx={{
                    height: {
                      xs: "calc(100vh - 450px)",
                      sm: "calc(100vh - 400px)",
                      md: "calc(100vh - 380px)",
                      lg: "calc(100vh - 350px)",
                    },
                    minHeight: { xs: "300px", sm: "400px", md: "500px" },
                    width: "100%",
                    "& .MuiDataGrid-root": {
                      border: "none",
                      fontFamily: "Poppins, sans-serif",
                      backgroundColor: "transparent",
                    },
                    "& .MuiDataGrid-main": {
                      backgroundColor: "transparent",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: theme === "dark" ? "#475569" : "#f1f5f9",
                      borderBottom:
                        theme === "dark"
                          ? "2px solid #64748b"
                          : "2px solid #cbd5e1",
                      color: theme === "dark" ? "#ffffff" : "#1e293b",
                      fontSize: { xs: "11px", sm: "12px", md: "14px" },
                      fontWeight: "700",
                      minHeight: { xs: "48px", sm: "52px", md: "60px" },
                      "& .MuiDataGrid-columnHeaderTitle": {
                        fontWeight: "700",
                        color: theme === "dark" ? "#ffffff" : "#1e293b",
                        fontSize: "inherit",
                        display: "flex",
                        alignItems: "center",
                      },
                      "& .MuiDataGrid-columnHeader": {
                        display: "flex",
                        alignItems: "center",
                        "&:focus": {
                          outline: "none",
                        },
                        "&:focus-within": {
                          outline: "none",
                        },
                      },
                      "& .MuiDataGrid-iconButtonContainer": {
                        "& .MuiIconButton-root": {
                          color: theme === "dark" ? "#ffffff" : "#1e293b",
                          padding: { xs: "4px", sm: "8px" },
                        },
                      },
                      "& .MuiDataGrid-sortIcon": {
                        color: theme === "dark" ? "#ffffff" : "#1e293b",
                        opacity: 1,
                        fontSize: { xs: "16px", sm: "20px" },
                      },
                      "& .MuiDataGrid-menuIcon": {
                        color: theme === "dark" ? "#ffffff" : "#1e293b",
                        opacity: 1,
                      },
                      "& .MuiDataGrid-columnSeparator": {
                        color: theme === "dark" ? "#94a3b8" : "#cbd5e1",
                        opacity: 1,
                      },
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom:
                        theme === "dark"
                          ? "1px solid #374151"
                          : "1px solid #f3f4f6",
                      fontSize: { xs: "11px", sm: "12px", md: "14px" },
                      padding: { xs: "8px 4px", sm: "12px 8px", md: "16px" },
                      color: theme === "dark" ? "#ffffff" : "#374151",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      "&:focus": {
                        outline: "none",
                      },
                    },
                    "& .MuiDataGrid-row": {
                      backgroundColor: "transparent",
                      minHeight: { xs: "48px", sm: "52px", md: "60px" },
                      "&:nth-of-type(odd)": {
                        backgroundColor:
                          theme === "dark" ? "#1e293b" : "#fafafa",
                      },
                      "&:nth-of-type(even)": {
                        backgroundColor:
                          theme === "dark" ? "#0f172a" : "#ffffff",
                      },
                      "&:hover": {
                        backgroundColor:
                          theme === "dark"
                            ? "#475569 !important"
                            : "#e2e8f0 !important",
                      },
                      "&.Mui-selected": {
                        backgroundColor:
                          theme === "dark"
                            ? "#1e40af40 !important"
                            : "#dbeafe !important",
                        "&:hover": {
                          backgroundColor:
                            theme === "dark"
                              ? "#1e40af50 !important"
                              : "#bfdbfe !important",
                        },
                      },
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: "transparent",
                    },
                    "& .MuiDataGrid-footerContainer": {
                      backgroundColor: theme === "dark" ? "#475569" : "#f1f5f9",
                      borderTop:
                        theme === "dark"
                          ? "2px solid #64748b"
                          : "2px solid #cbd5e1",
                      color: theme === "dark" ? "#ffffff" : "#374151",
                      minHeight: { xs: "44px", sm: "52px" },
                    },
                    "& .MuiTablePagination-root": {
                      color: theme === "dark" ? "#ffffff" : "#374151",
                    },
                    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                      {
                        color: theme === "dark" ? "#ffffff" : "#374151",
                        fontSize: { xs: "11px", sm: "12px", md: "14px" },
                      },
                    "& .MuiTablePagination-select": {
                      color: theme === "dark" ? "#ffffff" : "#374151",
                      fontSize: { xs: "11px", sm: "12px", md: "14px" },
                    },
                    "& .MuiTablePagination-actions": {
                      "& .MuiIconButton-root": {
                        color: theme === "dark" ? "#ffffff" : "#374151",
                        padding: { xs: "4px", sm: "8px" },
                      },
                    },
                    "& .MuiCheckbox-root": {
                      color: theme === "dark" ? "#60a5fa" : "#3b82f6",
                      padding: { xs: "4px", sm: "9px" },
                      "&.Mui-checked": {
                        color: theme === "dark" ? "#60a5fa" : "#3b82f6",
                      },
                    },
                  }}
                >
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection={!isMobile}
                    disableRowSelectionOnClick
                    pageSizeOptions={isMobile ? [5, 10] : [5, 10, 25, 50]}
                    initialState={{
                      pagination: {
                        paginationModel: { pageSize: isMobile ? 5 : 10 },
                      },
                    }}
                    density={isMobile ? "compact" : "comfortable"}
                    sx={{
                      "& .MuiDataGrid-cell": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      },
                      "& .MuiDataGrid-row": {
                        display: "flex",
                        alignItems: "center",
                      },
                      "& .MuiDataGrid-columnHeader": {
                        display: "flex",
                        alignItems: "center",
                      },
                    }}
                  />
                </Box>
              </div>
            </div>
          </>
        )}

        {active && (
          <Modal
            open={active}
            onClose={() => setActive(!active)}
            aria-labelledby="add-member-modal-title"
            aria-describedby="add-member-modal-description"
          >
            <Box
              className={combineStyles(
                cardStyles.base,
                "absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:w-[90vw] md:w-[450px] max-w-[450px] mx-2 sm:mx-4 outline-none max-h-[90vh] overflow-y-auto"
              )}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                    <AiOutlineUserAdd
                      className="text-blue-600 dark:text-blue-400"
                      size={isMobile ? 20 : 24}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                      Add New Member
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      Invite a new team member
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      className={combineStyles(
                        labelStyles.base,
                        labelStyles.default
                      )}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address..."
                      className={combineStyles(
                        inputStyles.base,
                        inputStyles.default,
                        inputStyles.medium
                      )}
                    />
                  </div>

                  <div>
                    <label
                      className={combineStyles(
                        labelStyles.base,
                        labelStyles.default
                      )}
                    >
                      Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className={combineStyles(
                        inputStyles.base,
                        inputStyles.default,
                        inputStyles.medium
                      )}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end mt-6">
                  <button
                    className={combineStyles(
                      buttonStyles.base,
                      buttonStyles.secondary,
                      isMobile ? buttonStyles.small : buttonStyles.medium,
                      "w-full sm:w-auto order-2 sm:order-1"
                    )}
                    onClick={() => setActive(!active)}
                  >
                    Cancel
                  </button>
                  <button
                    className={combineStyles(
                      buttonStyles.base,
                      buttonStyles.primary,
                      isMobile ? buttonStyles.small : buttonStyles.medium,
                      "w-full sm:w-auto order-1 sm:order-2"
                    )}
                    onClick={handleSubmit}
                  >
                    Add Member
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        )}

        {open && (
          <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="delete-user-modal-title"
            aria-describedby="delete-user-modal-description"
          >
            <Box
              className={combineStyles(
                cardStyles.base,
                "absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:w-[90vw] md:w-[450px] max-w-[450px] mx-2 sm:mx-4 outline-none max-h-[90vh] overflow-y-auto"
              )}
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 sm:p-3 bg-red-100 dark:bg-red-900/30 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                    <AiOutlineDelete
                      className="text-red-600 dark:text-red-400"
                      size={isMobile ? 20 : 24}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                      Delete User
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      This action cannot be undone
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6">
                  Are you sure you want to delete this user? All associated data
                  will be permanently removed and cannot be recovered.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <button
                    className={combineStyles(
                      buttonStyles.base,
                      buttonStyles.secondary,
                      isMobile ? buttonStyles.small : buttonStyles.medium,
                      "w-full sm:w-auto order-2 sm:order-1"
                    )}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </button>
                  <button
                    className={combineStyles(
                      buttonStyles.base,
                      buttonStyles.danger,
                      isMobile ? buttonStyles.small : buttonStyles.medium,
                      "w-full sm:w-auto order-1 sm:order-2"
                    )}
                    onClick={handleDelete}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
