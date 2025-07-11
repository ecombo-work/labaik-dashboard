import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./base-query";
import {
  CreateTermRequest,
  GetTermsParams,
  TermResponse,
} from "@/interfaces/finance";
import { ApiResponse } from "@/interfaces/response";

export const termApi = createApi({
  reducerPath: "termApi",
  tagTypes: ["Terms"],
  baseQuery: baseQueryWithToast,
  endpoints: (builder) => ({
    getTerms: builder.query<ApiResponse<TermResponse>, GetTermsParams>({
      query: (params) => ({
        url: "/terms",
        method: "GET",
        params,
      }),
      providesTags: ["Terms"],
    }),
    createTerm: builder.mutation<ApiResponse<TermResponse>, CreateTermRequest>({
      query: (body) => ({
        url: "/terms",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Terms"],
    }),
  }),
});

export const { useGetTermsQuery, useCreateTermMutation } = termApi;
