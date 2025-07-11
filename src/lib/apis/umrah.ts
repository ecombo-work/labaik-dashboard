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
  endpoints: (builder) => ({
    getCurrentRequests: builder.query<
      ApiResponse<CurrentUmrahRequestResponse>,
      CurrentUmrahRequestParams
    >({
      query: (params) => ({
        url: `/umrah/current-requests`,
        params,
      }),
    }),
    // umrah details
    getUmrahDetails: builder.query<
      ApiResponse<UmrahDetailsResponse>,
      { umrah_id: string }
    >({
      query: ({ umrah_id }) => ({
        url: `/umrah/details/${umrah_id}`,
  
      }),
    }),
  }),
});
export const { useGetCurrentRequestsQuery, useGetUmrahDetailsQuery } = umrahApi;
