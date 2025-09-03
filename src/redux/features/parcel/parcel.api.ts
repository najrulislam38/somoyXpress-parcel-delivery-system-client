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
    cancelParcel: builder.mutation({
      query: (id: string) => ({
        url: `/parcels/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),
    updateParcelStatus: builder.mutation({
      query: ({
        id,
        statusInfo,
      }: {
        id: string;
        statusInfo: { status: string; note?: string };
      }) => ({
        url: `/parcels/${id}/update-status`,
        method: "PATCH",
        data: statusInfo,
      }),
      invalidatesTags: ["PARCEL"],
    }),
    deleteParcel: builder.mutation({
      query: (parcelId: string) => ({
        url: `/parcels/${parcelId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["PARCEL"],
    }),
    confirmParcel: builder.mutation({
      query: (parcelId: string) => ({
        url: `/parcels/${parcelId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useGetAllParcelQuery,
  useGetParcelDetailsQuery,
  useCancelParcelMutation,
  useUpdateParcelStatusMutation,
  useDeleteParcelMutation,
  useConfirmParcelMutation,
} = parcelApi;
