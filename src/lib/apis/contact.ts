import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./base-query";
import { ApiResponse } from "@/interfaces/response";
import { PaginationMeta } from "./user";
export enum ContactType {
  IN_PROGRESS = "0",
  RESOLVED = "1",
  CANCELLED = "2",
}
export interface ContactMessage {
  contact_id: number;
  username: string;
  email: string;
  message: string;
  status: ContactType;
  user: {
    user_id: number;
    username: string;
    phone_number: string;
    country: string;
  };
  created_at: string;
}
export interface ContactMessageResponse {
  items: ContactMessage[];
  meta: PaginationMeta;
}
export interface ContactMessageParams {
  page?: string;
  limit?: string;
  // search?: string;
  // status?: string;
}
export const contactApi = createApi({
  baseQuery: baseQueryWithToast,
  endpoints: (builder) => ({
    getContactMessages: builder.query<
      ApiResponse<ContactMessageResponse>,
      ContactMessageParams
    >({
      query: (params) => ({
        url: "/contact/get-all",
        method: "GET",
        params,
      }),
    }),
    getContactMessage: builder.query<
      ApiResponse<ContactMessage>,
      { contact_id: number }
    >({
      query: ({ contact_id }) => ({
        url: `/contact/${contact_id}`,
        method: "GET",
      }),
    }),
    updateContactMessage: builder.mutation<
      ApiResponse<void>,
      { contact_id: number; status: ContactType }
    >({
      query: ({ contact_id, status }) => ({
        url: `/contact/${contact_id}`,
        method: "PUT",
        body: { status },
      }),
    }),
  }),
});
export const { useGetContactMessagesQuery, useUpdateContactMessageMutation, useGetContactMessageQuery } =
  contactApi;
