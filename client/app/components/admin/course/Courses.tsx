import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import { format } from "timeago.js";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Loader } from "../../common";
import {
  buttonStyles,
  cardStyles,
  combineStyles,
  titleStyles,
} from "@/app/styles/styles";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      minWidth: 80,
      hide: true, // Hide on mobile
    },
    {
      field: "title",
      headerName: "Course Title",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <div className="font-medium text-slate-900 dark:text-white truncate">
          {params.value}
        </div>
      ),
    },
    {
      field: "ratings",
      headerName: "Rating",
      width: 100,
      minWidth: 80,
      renderCell: (params: any) => (
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 font-medium text-slate-900 dark:text-white">
            {params.value || "0"}
          </span>
        </div>
      ),
    },
    {
      field: "purchased",
      headerName: "Sales",
      width: 100,
      minWidth: 80,
      renderCell: (params: any) => (
        <span className="font-medium text-green-600 dark:text-green-400">
          {params.value || 0}
        </span>
      ),
    },
    {
      field: "created_at",
      headerName: "Created",
      width: 120,
      minWidth: 100,
      renderCell: (params: any) => (
        <span className="text-sm text-slate-600 dark:text-slate-300">
          {params.value}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      minWidth: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/update-course/${params.row.id}`}>
            <button className="p-2 rounded-lg text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <FiEdit2 size={16} />
            </button>
          </Link>
          <button
            onClick={() => {
              setOpen(!open);
              setCourseId(params.row.id);
            }}
            className="p-2 rounded-lg text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/20"
          >
            <AiOutlineDelete size={16} />
          </button>
        </div>
      ),
    },
  ];

  const rows: any = [];

  {
    data &&
      data.courses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          ratings: item.ratings,
          purchased: item.purchased,
          created_at: format(item.createdAt),
        });
      });
  }

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-16 sm:pt-20 pb-8">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader />
          </div>
        ) : (
          <>
            <div className="mb-6 sm:mb-8">
              <h1 className={combineStyles(titleStyles.h3, "mb-2")}>
                Course Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                Manage all your courses, view statistics, and perform actions
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div
                className={combineStyles(
                  cardStyles.base,
                  cardStyles.paddingMedium
                )}
              >
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <span className="text-blue-600 dark:text-blue-400 text-lg font-bold">
                      📚
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Total Courses
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {data?.courses?.length || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={combineStyles(
                  cardStyles.base,
                  cardStyles.paddingMedium
                )}
              >
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <span className="text-green-600 dark:text-green-400 text-lg font-bold">
                      💰
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Total Sales
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {data?.courses?.reduce(
                        (acc: number, course: any) =>
                          acc + (course.purchased || 0),
                        0
                      ) || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={combineStyles(
                  cardStyles.base,
                  cardStyles.paddingMedium
                )}
              >
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <span className="text-yellow-600 dark:text-yellow-400 text-lg font-bold">
                      ⭐
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Avg Rating
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {data?.courses?.length
                        ? (
                            data.courses.reduce(
                              (acc: number, course: any) =>
                                acc + (course.ratings || 0),
                              0
                            ) / data.courses.length
                          ).toFixed(1)
                        : "0.0"}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={combineStyles(
                  cardStyles.base,
                  cardStyles.paddingMedium
                )}
              >
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <span className="text-purple-600 dark:text-purple-400 text-lg font-bold">
                      📈
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Active
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {data?.courses?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={combineStyles(cardStyles.base, "overflow-hidden")}>
              <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
                  All Courses
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  View and manage all your courses
                </p>
              </div>

              <div className="overflow-x-auto">
                <Box
                  sx={{
                    height: {
                      xs: "calc(100vh - 500px)",
                      sm: "calc(100vh - 450px)",
                      lg: "calc(100vh - 400px)",
                    },
                    minHeight: { xs: "400px", sm: "500px" },
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
                      fontSize: { xs: "12px", sm: "14px" },
                      fontWeight: "700",
                      minHeight: { xs: "52px", sm: "60px" },
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
                        },
                      },
                      "& .MuiDataGrid-sortIcon": {
                        color: theme === "dark" ? "#ffffff" : "#1e293b",
                        opacity: 1,
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
                      fontSize: { xs: "12px", sm: "14px" },
                      padding: { xs: "12px 8px", sm: "16px" },
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
                      minHeight: { xs: "52px", sm: "60px" },
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
                    },
                    "& .MuiTablePagination-root": {
                      color: theme === "dark" ? "#ffffff" : "#374151",
                    },
                    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                      {
                        color: theme === "dark" ? "#ffffff" : "#374151",
                        fontSize: { xs: "12px", sm: "14px" },
                      },
                    "& .MuiTablePagination-select": {
                      color: theme === "dark" ? "#ffffff" : "#374151",
                    },
                    "& .MuiTablePagination-actions": {
                      "& .MuiIconButton-root": {
                        color: theme === "dark" ? "#ffffff" : "#374151",
                      },
                    },
                    "& .MuiCheckbox-root": {
                      color: theme === "dark" ? "#60a5fa" : "#3b82f6",
                      "&.Mui-checked": {
                        color: theme === "dark" ? "#60a5fa" : "#3b82f6",
                      },
                    },
                  }}
                >
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    disableRowSelectionOnClick
                    pageSizeOptions={[5, 10, 25, 50]}
                    initialState={{
                      pagination: {
                        paginationModel: { pageSize: 10 },
                      },
                    }}
                    density="comfortable"
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

        {open && (
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
          >
            <Box
              className={combineStyles(
                cardStyles.base,
                "absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[400px] max-w-[400px] mx-4 outline-none"
              )}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full mr-4">
                    <AiOutlineDelete
                      className="text-red-600 dark:text-red-400"
                      size={24}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Delete Course
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      This action cannot be undone
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Are you sure you want to delete this course? All associated
                  data will be permanently removed.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <button
                    className={combineStyles(
                      buttonStyles.base,
                      buttonStyles.secondary,
                      buttonStyles.medium,
                      "w-full sm:w-auto"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={combineStyles(
                      buttonStyles.base,
                      buttonStyles.danger,
                      buttonStyles.medium,
                      "w-full sm:w-auto"
                    )}
                    onClick={handleDelete}
                  >
                    Delete Course
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

export default AllCourses;
