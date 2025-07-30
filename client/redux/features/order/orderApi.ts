import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (type) => ({
        url: `/orders/admin/all-orders`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getStripePublishablekey: builder.query({
      query: () => ({
        url: `/orders/stripe-publishable-key`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: "/orders/create-payment-intent",
        method: "POST",
        body: {
          amount,
        },
        credentials: "include" as const,
      }),
    }),
    processOrder: builder.mutation({
      query: ({ courseId, paymentInfo }) => ({
        url: "/orders/process-order",
        body: {
          courseId,
          paymentInfo,
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetStripePublishablekeyQuery,
  useCreatePaymentIntentMutation,
  useProcessOrderMutation,
} = ordersApi;
