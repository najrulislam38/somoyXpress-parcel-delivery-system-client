import { baseApi } from "@/redux/baseApi";
import type { IUser } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["USER"],
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
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

    allUsers: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUserInfoQuery,
  useSingleUserInfoQuery,
  useAllUsersQuery,
  useLogoutMutation,
  useUpdateUserInfoMutation,
  useDeleteUserMutation,
} = authApi;
