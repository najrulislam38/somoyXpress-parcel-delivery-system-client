import { baseApi } from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // singleUserInfo: builder.query({
    //   query: (userId) => ({
    //     url: `/users/${userId}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["USER"],
    // }),

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

export const { useGetAllParcelQuery, useGetParcelDetailsQuery } = parcelApi;
