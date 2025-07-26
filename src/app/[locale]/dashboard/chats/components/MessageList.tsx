import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { useRef, useEffect } from "react";
import { Message } from "@/lib/apis/chat";
import { UserType } from "@/lib/roles";


type MessageListProps = {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
};

export function MessageList({
  messages = [],
  isLoading,
  error,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({block: "end", inline: "end", behavior: "smooth" });
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Loading messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>No messages yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 !h-70 p-4 space-y-4">

        {messages.map((message) => (
          <MessageBubble
            key={message.message_id}
            message={message}
            is_performer={message.sender.user_type === UserType.PERFORMER}
          />
        ))}
        <div ref={messagesEndRef} />
    </ScrollArea>
  );
}
