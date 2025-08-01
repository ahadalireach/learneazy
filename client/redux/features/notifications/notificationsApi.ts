import { apiSlice } from "../api/apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotificationsByAdmin: builder.query({
      query: () => ({
        url: "/notifications/admin/all-notifications",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateNotificationStatus: builder.mutation({
      query: (id) => ({
        url: `/notifications/admin/mark-read/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsByAdminQuery,
  useUpdateNotificationStatusMutation,
} = notificationsApi;
