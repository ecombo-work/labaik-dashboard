import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./base-query";
import { ApiResponse } from "@/interfaces/response";
import {
  CurrentUmrahRequestParams,
  CurrentUmrahRequestResponse,
  UmrahDetailsResponse,
} from "@/interfaces/umrah";

export const umrahApi = createApi({
  reducerPath: "umrahApi",
  baseQuery: baseQueryWithToast,
  tagTypes: ["umrah"],
  endpoints: (builder) => ({
    getCurrentRequests: builder.query<
      ApiResponse<CurrentUmrahRequestResponse>,
      CurrentUmrahRequestParams
    >({
      query: (params) => ({
        url: `/umrah/current-requests`,
        params,
      }),
      providesTags: (result) => [{ type: "umrah", id: "LIST" }],
    }),
    // umrah details
    getUmrahDetails: builder.query<
      ApiResponse<UmrahDetailsResponse>,
      { umrah_id: string }
    >({
      query: ({ umrah_id }) => ({
        url: `/umrah/details/${umrah_id}`,
      }),
      providesTags: (result) => [{ type: "umrah", id: "LIST" }],
    }),
    lostRequests: builder.query<
      ApiResponse<CurrentUmrahRequestResponse>,
      CurrentUmrahRequestParams
    >({
      query: (params) => ({
        url: `/umrah/lost-requests`,
        params,
      }),
      providesTags: (result) => [{ type: "umrah", id: "LIST" }],
    }),
    reassignUmrah: builder.mutation<
      ApiResponse<any>,
      { umrah_id: string; user_id: number }
    >({
      query: ({ umrah_id, user_id }) => ({
        url: `/umrah/${umrah_id}/reassign`,
        method: "PUT",
        body: { user_id },
      }),
      invalidatesTags: (result) => [{ type: "umrah", id: "LIST" }],
    }),
  }),
});
export const {
  useGetCurrentRequestsQuery,
  useGetUmrahDetailsQuery,
  useLostRequestsQuery,
  useReassignUmrahMutation,
} = umrahApi;
