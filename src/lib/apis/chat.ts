import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./base-query";
import { PaginationMeta } from "./user";
import { ApiResponse } from "@/interfaces/response";
import { UserType } from "../roles";
import { CountryCode } from "libphonenumber-js";
export interface User {
  user_id: string;
  username: string;
  profile_image: string;
  country: CountryCode;
  user_type: UserType;
}

export interface Participant {
  participant_id: string;
  user: User;
}

export interface LastMessage {
  message_id: string;
  message_type: string;
  content: string;
  created_at: string;
  sender: User;
}

export interface Chat {
  conversation_id: string;
  is_active: boolean;
  created_at: string;
  participants: Participant[];
  last_message: LastMessage | null;
  messages?: Array<{
    message_id: string;
    content: string;
    message_type: MessageType;
    created_at: string;
    sender: User;
  }>;
}

export interface ChatResponse {
  items: Chat[];
  meta: PaginationMeta;
}

export interface GetChatsParams {
  page?: string;
  limit?: string;
}

export interface GetChatMessagesParams {
  conversation_id: string;
  page?: string;
  limit?: string;
}
export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  DOCUMENT = 'document',
  SYSTEM = 'system',
}
export interface Message {
  message_id: string;
  content: string;
  created_at: string;
  sender: User;
  message_type: MessageType;
 
}

export interface MessagesResponse {
  items: Message[];
  meta: PaginationMeta;
}

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithToast,
  endpoints: (builder) => ({
    getChats: builder.query<ApiResponse<ChatResponse>, GetChatsParams>({
      query: (params) => ({
        url: "/chat/get-all",
        params,
      }),
    }),
    getChatMessages: builder.query<
      ApiResponse<MessagesResponse>,
      GetChatMessagesParams
    >({
      query: ({ conversation_id, ...params }) => ({
        url: `/chat/${conversation_id}/messages`,
        params,
      }),
    }),
  }),
});

export const { useGetChatsQuery, useGetChatMessagesQuery } = chatApi;
