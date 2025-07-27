import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLayoutData: builder.query({
      query: (type) => ({
        url: `/layouts/public/layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: `/layouts/admin/update-layout`,
        body: {
          type,
          image,
          title,
          subTitle,
          faq,
          categories,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetLayoutDataQuery, useUpdateLayoutMutation } = layoutApi;
