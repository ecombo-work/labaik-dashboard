import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./base-query";
import { ApiResponse } from "@/interfaces/response";
import { ScheduleNotifications } from "@/interfaces/notification";

export type NotificationResponse = ApiResponse<ScheduleNotifications[]>;
export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: baseQueryWithToast,
  endpoints: (builder) => ({
    getScheduleNotifications: builder.query<
      NotificationResponse,
      {
        year: number;
        month: number;
      }
    >({
      query: (params) => ({
        url: "/notifications/schedule",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetScheduleNotificationsQuery } = notificationApi;
