import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./base-query";
import { ApiResponse } from "@/interfaces/response";
import { ScheduleNotifications } from "@/interfaces/notification";

export type NotificationResponse = ApiResponse<ScheduleNotifications[]>;
export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: baseQueryWithToast,
  endpoints: (builder) => ({
    createNotification: builder.mutation<
      NotificationResponse,
      {
        title_ar: string;
        title_en: string;
        message_ar: string;
        message_en: string;
        receiver: "performers" | "seekers" | "employees" | "all";
        scheduled_at: string;
      }
    >({
      query: (body) => ({
        url: "/notifications/add-schedule",
        method: "POST",
        body,
      }),
    }),

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

export const {
  useGetScheduleNotificationsQuery,
  useCreateNotificationMutation,
} = notificationApi;
