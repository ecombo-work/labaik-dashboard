import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./base-query";
import { ApiResponse } from "@/interfaces/response";
import { LoginRequest, LoginResponse } from "@/interfaces/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
