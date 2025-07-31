import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/admin/create",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "/courses/admin/all-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/admin/delete/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/admin/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllPublicCoursePreviews: builder.query({
      query: () => ({
        url: "/courses/public/all-previews",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getPublicCoursePreview: builder.query({
      query: (id: any) => ({
        url: `/courses/public/preview/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getEnrolledCourseContent: builder.query({
      query: (id) => ({
        url: `/courses/enrolled/content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: `/courses/enrolled/question`,
        method: "PUT",
        body: { question, courseId, contentId },
        credentials: "include" as const,
      }),
    }),
    addQuestionAnswer: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: `/courses/enrolled/answer`,
        method: "PUT",
        body: { answer, courseId, contentId, questionId },
        credentials: "include" as const,
      }),
    }),
    addReviewInCourse: builder.mutation({
      query: ({ review, rating, courseId }) => ({
        url: `/courses/enrolled/review/${courseId}`,
        method: "PUT",
        body: { review, rating },
        credentials: "include" as const,
      }),
    }),
    addReviewReply: builder.mutation({
      query: ({ comment, courseId, reviewId }: any) => ({
        url: `/courses/enrolled/review-reply`,
        method: "PUT",
        body: {
          comment,
          courseId,
          reviewId,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useGetPublicCoursePreviewQuery,
  useGetAllPublicCoursePreviewsQuery,
  useGetEnrolledCourseContentQuery,
  useAddNewQuestionMutation,
  useAddQuestionAnswerMutation,
  useAddReviewInCourseMutation,
  useAddReviewReplyMutation,
} = coursesApi;
