import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./base-query";
import { ApiResponse } from "@/interfaces/response";
import { GetDonationsParams, DonationsResponse } from "@/interfaces/donations";
export const donationsApi = createApi({
  reducerPath: "donationsApi",
  baseQuery: baseQueryWithToast,
  tagTypes: ["Donations"],
  endpoints: (builder) => ({
    getAllDonations: builder.query<
      ApiResponse<DonationsResponse>,
      GetDonationsParams
    >({
      query: (params) => ({
        url: `/donations`,
        params,
      }),
      providesTags: ["Donations"],
    }),
    createDonation: builder.mutation<ApiResponse<void>, FormData>({
      query: (body) => ({
        url: `/donations`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Donations"],
    }),
    toggleDonationStatus: builder.mutation<
      ApiResponse<void>,
      { association_id: number }
    >({
      query: (association_id) => ({
        url: `/donations/${association_id}/status`,
        method: "PUT",
      }),
    }),
    //delete
    deleteDonation: builder.mutation<
      ApiResponse<void>,
      { association_id: number }
    >({
      query: (association_id) => ({
        url: `/donations/${association_id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Donations"],
    }),
  }),
});
export const {
  useGetAllDonationsQuery,
  useCreateDonationMutation,
  useToggleDonationStatusMutation,
  useDeleteDonationMutation,
} = donationsApi;
