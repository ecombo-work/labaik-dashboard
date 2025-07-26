"use client";

import { Title } from "@/components/ui/typography";
import {
  Chat,
  useGetChatsQuery,
  useGetChatMessagesQuery,
  MessageType,
  LastMessage,
} from "@/lib/apis/chat";
import { useUrlSearchParams } from "@/lib/utils/search-params";
import { socket } from "@/socket";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { ChatList } from "./components/ChatList";
import { ChatHeader } from "./components/ChatHeader";
import { MessageList } from "./components/MessageList";
import { UserType } from "@/lib/roles";
import { CountryCode } from "libphonenumber-js";

interface SocketMessage {
  message: LastMessage;
  sender: {
    user_id: number;
    username: string;
    profile_image: string;
    user_type: UserType;
    country: CountryCode;
  };
  conversation: {
    conversation_id: number;
  };
}

export default function Page() {
  const t = useTranslations("page_title");
  const { queryParams } = useUrlSearchParams();
  const [chats, setChats] = useState<Chat[]>();
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { data, isLoading, error } = useGetChatsQuery({
    page: queryParams.page ?? "1",
    limit: queryParams.limit ?? "25",
    ...queryParams,
  });
  useEffect(() => {
    if (data?.data?.items) {
      setChats(data.data.items);
    }
  }, [data?.data?.items]);

  function receiveMessage(data: SocketMessage) {
    console.log("receive_message", data);
  
    setChats((prevChats) => {
      console.log("prevChats", prevChats);
  
      if (!prevChats) return prevChats;
  
      return prevChats.map((chat) =>
        chat.conversation_id === data.conversation.conversation_id.toString()
          ? {
              ...chat,
              last_message: {
                message_id: data.message.message_id,
                message_type: data.message.message_type,
                content: data.message.content,
                created_at: data.message.created_at,
                sender: {
                  user_id: data.sender.user_id.toString(),
                  username: data.sender.username,
                  // Add any other required User fields here
                  profile_image: data.sender.profile_image,
                  user_type: data.sender.user_type,
                  country: data.sender.country
                },
              },
              updated_at: new Date().toISOString(),
            }
          : chat
      );
    });
  }
  

  // ✅ Socket connection handler
  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
      console.log("Socket connected");
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("receive_message", receiveMessage);

    if (socket.connected) handleConnect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("receive_message", receiveMessage);
    };
  }, []);

  // ✅ Chat message fetch for selected chat
  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    error: messagesError,
    refetch: refetchMessages,
  } = useGetChatMessagesQuery(
    {
      conversation_id: activeChat?.conversation_id ?? "",
      page: "1",
      limit: "100",
    },
    {
      skip: !activeChat?.conversation_id,
    }
  );

  // ✅ Sync messages into activeChat state (if they exist)
  useEffect(() => {
    if (activeChat?.conversation_id && messagesData?.data?.items) {
      setActiveChat((prev) =>
        prev && prev.conversation_id === activeChat.conversation_id
          ? { ...prev, messages: messagesData.data!.items }
          : prev
      );
    }
  }, [messagesData?.data?.items, activeChat?.conversation_id]);

  // ✅ Handle selecting a chat and fetch its messages
  const handleSelectChat = useCallback((chat: Chat) => {
    setActiveChat(chat);
  }, []);

  return (
    <div className="flex flex-col p-4">
      <div className="flex-shrink-0">
        <Title className="flex items-center justify-between mb-4">
          <p>{t("chats")}</p>
          <span
            className={`font-medium ${
              isConnected ? "text-green-600" : "text-red-600"
            }`}
          >
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </Title>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0 max-h-[550px]">
        <ChatList
          chats={chats || []}
          activeChat={activeChat}
          isLoading={isLoading}
          error={error}
          onChatSelect={handleSelectChat}
        />

        <div className="col-span-2 bg-white rounded-lg drop-shadow-xl flex flex-col max-h-[600px]">
          {activeChat ? (
            <>
              <ChatHeader chat={activeChat} />
              <MessageList
                messages={activeChat.messages || []}
                isLoading={isLoadingMessages}
                error={messagesError ? "Failed to load messages" : null}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
