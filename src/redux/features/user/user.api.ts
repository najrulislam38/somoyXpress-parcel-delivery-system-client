import { baseApi } from "@/redux/baseApi";
import type { IUser } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    singleUserInfo: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    updateUserInfo: builder.mutation({
      query: ({ id, userInfo }: { id: string; userInfo: Partial<IUser> }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),
    deleteUser: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/users/${id}/delete`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    getAllUsers: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),

    getAllReceiver: builder.query({
      query: (params) => ({
        url: "/users/all-receiver",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useUserInfoQuery,
  useSingleUserInfoQuery,
  useGetAllUsersQuery,
  useGetAllReceiverQuery,
  useUpdateUserInfoMutation,
  useDeleteUserMutation,
} = userApi;
