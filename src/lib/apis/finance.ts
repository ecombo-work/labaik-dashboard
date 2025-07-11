import { baseQueryWithToast } from "./base-query";
import {
  GetTransactionsParams,
  TransactionResponse,
} from "@/interfaces/finance";
import { ApiResponse } from "@/interfaces/response";
import { createApi } from "@reduxjs/toolkit/query/react";

export const financeApi = createApi({
  reducerPath: "financeApi",
  baseQuery: baseQueryWithToast,
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    getTransactions: builder.query<
      ApiResponse<TransactionResponse>,
      GetTransactionsParams
    >({
      query: (params) => ({
        url: "/transactions",
        method: "GET",
        params,
      }),
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetTransactionsQuery } = financeApi;
