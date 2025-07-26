import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./base-query";
import { ApiResponse } from "@/interfaces/response";
import {
  GetWithdrawalsParams,
  Withdrawal,
  WithdrawalResponse,
} from "@/interfaces/withdrawal";
import { WithdrawalMethod, WithdrawalStatus } from "@/constants/withdrawal";
interface UpdateWithdrawalProps {
  withdrawal_id: string;
  status: WithdrawalStatus;
  confirm_image: File | null;
  account_id?: string | undefined;
}
export const withdrawalApi = createApi({
  reducerPath: "withdrawalApi",
  baseQuery: baseQueryWithToast,
  tagTypes: ["Withdrawals"],
  endpoints: (builder) => ({
    getWithdrawals: builder.query<
      ApiResponse<WithdrawalResponse>,
      GetWithdrawalsParams
    >({
      query: (params) => ({
        url: "/withdrawals",
        method: "GET",
        params,
      }),
      providesTags: ["Withdrawals"],
    }),
    getWithdrawalDetails: builder.query<
      ApiResponse<Withdrawal>,
      { withdrawal_id: string; method: string }
    >({
      query: ({ withdrawal_id, method }) => ({
        url: `/withdrawals/${withdrawal_id}?method=${method}`,
        method: "GET",
      }),
      providesTags: ["Withdrawals"],
    }),
    updateWithdrawal: builder.mutation<
      ApiResponse<Withdrawal>,
      UpdateWithdrawalProps
    >({
      query:({ withdrawal_id, status, account_id, confirm_image }) => {
        const formData = new FormData();
        formData.append("status", status);
        if (account_id) {
          formData.append("account_id", account_id.toString());
        }
        if (confirm_image) {
          formData.append("confirm_image", confirm_image);
        }
        return {
          url: `/withdrawals/${withdrawal_id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Withdrawals"],
    }),
  }),
});

export const {
  useGetWithdrawalsQuery,
  useGetWithdrawalDetailsQuery,
  useUpdateWithdrawalMutation,
} = withdrawalApi;
