import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./base-query";
import { ApiResponse } from "@/interfaces/response";
import {
  ExpenseReportResponse,
  ReportQueryParams,
  UmrahReportResponse,
  UsersReportResponse,
} from "@/interfaces/reports";

export const reportsApi = createApi({
  reducerPath: "reportsApi",
  baseQuery: baseQueryWithToast,
  endpoints: (builder) => ({

    seekersReport: builder.query<
      ApiResponse<UsersReportResponse>,
      ReportQueryParams
    >({
      query: (params) => ({
        url: "/reports/seekers",
        method: "GET",
        params,
      }),
    }),
    performersReport: builder.query<
      ApiResponse<UsersReportResponse>,
      ReportQueryParams
    >({
      query: (params) => ({
        url: "/reports/performers",
        method: "GET",
        params,
      }),
    }),
    umrahReport: builder.query<
      ApiResponse<UmrahReportResponse>,
      ReportQueryParams
    >({
      query: (params) => ({
        url: "/reports/umrah",
        method: "GET",
        params,
      }),
    }),
    incomeReport: builder.query<ApiResponse<any>, ReportQueryParams>({
      query: (params) => ({
        url: "/reports/income",
        method: "GET",
        params,
      }),
    }),
    expenseReport: builder.query<
      ApiResponse<ExpenseReportResponse[]>,
      ReportQueryParams
    >({
      query: (params) => ({
        url: "/reports/expense",
        method: "GET",
        params,
      }),
    }),
  }),
});
export const {
  useSeekersReportQuery,
  useUmrahReportQuery,
  usePerformersReportQuery,
  useIncomeReportQuery,
  useExpenseReportQuery,
} = reportsApi;
