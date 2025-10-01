import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, baseQueryWithToast } from "./base-query";
import { ApiResponse } from "@/interfaces/response";
import { UserVerificationStatus } from "@/constants/user.constants";
import { CountryCode } from "libphonenumber-js";
import { UserType } from "../roles";
import { LoginResponse } from "@/interfaces/auth";
export interface PaginationMeta {
  current_page: number;
  total_pages: number;
  total_count: number;
  limit: number;
}
export interface Seeker {
  user_id: number;
  username: string;
  email: string;
  phone_number: string;
  is_active: boolean;
  country: CountryCode;
  created_at: string;
}
export interface Performer extends Seeker {
  user_details: {
    verification_status: string;
    total_ratings: number;
    rate: number;
  };
}
interface AllSeekersResponse {
  items: Seeker[];
  meta: PaginationMeta;
}
interface AllPerformersResponse {
  items: Performer[];
  meta: PaginationMeta;
}

interface GetUsersParams {
  page?: string;
  limit?: string;
  // search?: string;
  // Add other filter parameters as needed
}
export interface UserReviewResponse {
  user_id: number;
  username: string;
  email: string;
  phone_number: string;
  profile_image: string;
  country: CountryCode;
  is_active: boolean;
  user_type: number;
  created_at: string;
  updated_at: string;
  user_details: {
    details_id: number;
    front_national_id: string;
    back_national_id: string;
    face_with_national_id: string;
    rate: string;
    total_ratings: number;
    verification_status: UserVerificationStatus;
    verified_at: string;
  };
}
export interface Employee {
  user_id: number;
  username: string;
  email: string;
  phone_number: string;
  is_active: boolean;
  country: CountryCode;
  user_type: UserType;
  created_at: string;
}
interface AllEmployeesResponse {
  items: Employee[];
  meta: PaginationMeta;
}
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithToast,
  tagTypes: ["Users", "Employees"],
  endpoints: (builder) => ({
    getSeekers: builder.query<ApiResponse<AllSeekersResponse>, GetUsersParams>({
      query: (params) => ({
        url: "/user/all-seekers",
        params,
      }),
    }),
    getPerformers: builder.query<
      ApiResponse<AllPerformersResponse>,
      GetUsersParams
    >({
      query: (params) => ({
        url: "/user/all-performers",
        params,
      }),
    }),
    getNeedReviewPerformers: builder.query<
      ApiResponse<AllPerformersResponse>,
      GetUsersParams
    >({
      query: (params) => ({
        url: "/user/all-need-review-performers",
        params,
      }),
    }),
    toggleUserStatus: builder.mutation<ApiResponse<void>, { user_id: number }>({
      query: (user_id) => ({
        url: `/user/${user_id}/toggle-status`,
        method: "PUT",
      }),
    }),
    changeVerificationStatus: builder.mutation<
      ApiResponse<void>,
      { user_id: number; status: UserVerificationStatus }
    >({
      query: (body) => ({
        url: `/user/change-verification-status`,
        method: "PUT",
        body,
      }),
    }),
    getUserReview: builder.query<
      ApiResponse<UserReviewResponse>,
      { user_id: string }
    >({
      query: ({ user_id }) => ({
        url: `/user/${user_id}/review`,
      }),
    }),
    getAllEmployees: builder.query<
      ApiResponse<AllEmployeesResponse>,
      GetUsersParams
    >({
      query: (params) => ({
        url: "/user/all-employees",
        params,
      }),
      providesTags: ["Employees"],
    }),
    createEmployee: builder.mutation<
      ApiResponse<void>,
      {
        username: string;
        email: string;
        phone_number: string;
        password: string;
        user_type: string;
      }
    >({
      query: (body) => ({
        url: `/user/create-employee`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employees"],
    }),
    searchUsers: builder.query<ApiResponse<any[]>, string | undefined>({
      query: (q) => `user/search?q=${encodeURIComponent(q || "")}`,
    }),
    loginAs: builder.mutation<ApiResponse<LoginResponse>, { user_id: number }>({
      query: (user_id) => ({
        url: `/auth/${user_id}/login-as`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetSeekersQuery,
  useToggleUserStatusMutation,
  useGetPerformersQuery,
  useGetNeedReviewPerformersQuery,
  useChangeVerificationStatusMutation,
  useGetUserReviewQuery,
  useGetAllEmployeesQuery,
  useCreateEmployeeMutation,
  useSearchUsersQuery,
  useLoginAsMutation,
} = userApi;
