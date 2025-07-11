import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./base-query";
import { ApiResponse } from "@/interfaces/response";
import {
  Account,
  AccountResponse,
  CreateAccountRequest,
  GetAccountsParams,
} from "@/interfaces/finance";

export const accountsApi = createApi({
  reducerPath: "accountsApi",
  baseQuery: baseQueryWithToast,
  tagTypes: ["Accounts"],
  endpoints: (builder) => ({
    getAccounts: builder.query<ApiResponse<AccountResponse>, GetAccountsParams>(
      {
        query: (params) => ({
          url: "/accounts",
          method: "GET",
          params,
        }),
        providesTags: ["Accounts"],
      }
    ),
    createAccount: builder.mutation<ApiResponse<Account>, CreateAccountRequest>(
      {
        query: (body) => ({
          url: "/accounts",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Accounts"],
      }
    ),
  }),
});

export const { useGetAccountsQuery, useCreateAccountMutation } = accountsApi;
