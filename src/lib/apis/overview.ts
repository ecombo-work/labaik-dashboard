import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./base-query";
import { ApiResponse } from "@/interfaces/response";

export interface OverviewData {
  accepted: string;
  cancelled: string;
  company_revenues: string;
  completed: string;
  discounted_amount: string;
  employees: string;
  in_progress: string;
  in_waiting: string;
  other_requests: string;
  other_revenues: string;
  performers: string;
  performers_revenues: string;
  requests: string;
  seekers: string;
  total_revenue: string;
  total_users: string;
  umrah_revenues: string;
  using_coupons: string;
  vat: string;
}

export type OverviewResponse = ApiResponse<OverviewData>;
export type OverviewStatisticsResponse = ApiResponse<{
  pending_withdrawals: number;
  pending_performer_verifications: number;
  in_progress_contacts: number;
}>;
export const overviewApi = createApi({
  reducerPath: "overviewApi",
  baseQuery: baseQueryWithToast,
  endpoints: (builder) => ({
    getOverview: builder.query<OverviewResponse, void>({
      query: () => ({
        url: "/overview",
        method: "GET",
      }),
    }),
    getOverviewStatistics: builder.query<OverviewStatisticsResponse, void>({
      query: () => ({
        url: "/overview/statistics",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOverviewQuery , useGetOverviewStatisticsQuery } = overviewApi;
