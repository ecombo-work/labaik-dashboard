import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./base-query";
import { ApiResponse } from "@/interfaces/response";
import {
  CreateCouponRequest,
  GetAllCouponsParams,
  GetAllCouponsResponse,
} from "@/interfaces/coupon";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: baseQueryWithToast,
  tagTypes: ["Coupons"],
  endpoints: (builder) => ({
    getAllCoupons: builder.query<
      ApiResponse<GetAllCouponsResponse>,
      GetAllCouponsParams
    >({
      query: (params) => ({
        url: `/coupons/get-all`,
        params,
      }),
      providesTags: ['Coupons']
    }),
    createCoupon: builder.mutation<ApiResponse<void>, CreateCouponRequest>({
      query: (body) => ({
        url: `/coupons/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ['Coupons']
    }),
    toggleCouponStatus: builder.mutation<ApiResponse<void>, { coupon_id: number }>({
      query: (coupon_id) => ({
        url: `/coupons/${coupon_id}/toggle-status`,
        method: "PUT",
      }),
    }),
  }),
});
export const { useGetAllCouponsQuery, useCreateCouponMutation, useToggleCouponStatusMutation } = couponApi;
