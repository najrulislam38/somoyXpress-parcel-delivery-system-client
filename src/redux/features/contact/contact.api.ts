import { baseApi } from "@/redux/baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // singleUserInfo: builder.query({
    //   query: (userId) => ({
    //     url: `/users/${userId}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["USER"],
    // }),

    sendMail: builder.mutation({
      query: (messageInfo) => ({
        url: `/contact/send-mail`,
        method: "POST",
        data: messageInfo,
      }),
      invalidatesTags: ["CONTACT"],
    }),

    // getAllReceiver: builder.query({
    //   query: (params) => ({
    //     url: "/users/all-receiver",
    //     method: "GET",
    //     params,
    //   }),
    //   providesTags: ["USER"],
    // }),
  }),
});

export const { useSendMailMutation } = contactApi;
