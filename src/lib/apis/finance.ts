import { baseQueryWithToast } from "./base-query";
import {
  CreateTransaction,
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
    createTransaction: builder.mutation<ApiResponse<void>, CreateTransaction>({
      query: (body) => ({
        url: "/transactions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});

export const { useGetTransactionsQuery, useCreateTransactionMutation } = financeApi;
