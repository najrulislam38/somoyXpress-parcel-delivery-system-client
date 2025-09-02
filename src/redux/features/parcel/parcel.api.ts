import { baseApi } from "@/redux/baseApi";
import type { IParcel } from "@/types";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // singleUserInfo: builder.query({
    //   query: (userId) => ({
    //     url: `/users/${userId}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["USER"],
    // }),

    createParcel: builder.mutation({
      query: (parcelInfo: Partial<IParcel>) => ({
        url: "/parcels/create",
        method: "POST",
        data: parcelInfo,
      }),
      invalidatesTags: ["PARCEL"],
    }),
    getAllParcel: builder.query({
      query: (params) => ({
        url: "/parcels",
        method: "GET",
        params,
      }),
      providesTags: ["PARCEL"],
    }),
    getParcelDetails: builder.query({
      query: (id: string) => ({
        url: `/parcels/${id}`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useGetAllParcelQuery,
  useGetParcelDetailsQuery,
} = parcelApi;
