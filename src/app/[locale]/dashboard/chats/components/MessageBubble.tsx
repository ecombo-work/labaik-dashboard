import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message, MessageType } from "@/lib/apis/chat";
import { format, isToday } from "date-fns";
import Image from "next/image";

export function MessageBubble({
  message,
  is_performer,
}: {
  message: Message;
  is_performer: boolean;
}) {
  const messageDate = new Date(message.created_at);
  const formattedDate = isToday(messageDate)
    ? format(messageDate, "h:mm a")
    : format(messageDate, "MMM d, yyyy h:mm a");
  const renderMessageContent = () => {
    switch (message.message_type) {
      case MessageType.IMAGE:
        return (
          <div className="relative rounded-lg overflow-hidden max-w-[300px]">
            <Image
              src={message.content}
              alt="Sent image"
              width={300}
              height={200}
              className="object-cover"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
        );
      case MessageType.TEXT:
      default:
        return (
          <span className="whitespace-pre-wrap break-words">
            {message.content}
          </span>
        );
    }
  };

  return (
    <div
      className={`flex items-start gap-2 mb-4 ${
        is_performer ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage
          src={message.sender.profile_image}
          alt={message.sender.username}
        />
        <AvatarFallback className="bg-gray-200 text-xs">
          {message.sender.username
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div
        className={`flex flex-col ${
          message.message_type === MessageType.IMAGE
            ? "max-w-full"
            : "max-w-[80%]"
        }`}
      >
        <div
          className={`inline-block rounded-lg ${
            is_performer
              ? "ltr:text-right rtl:text-left bg-blue-500 text-white ltr:rounded-tr-none rtl:rounded-tl-none"
              : "ltr:text-left rtl:text-right bg-gray-100 text-gray-800 ltr:rounded-tl-none rtl:rounded-tr-none"
          } ${
            message.message_type === MessageType.IMAGE ? "p-0" : "px-3 py-2"
          }`}
        >
          {renderMessageContent()}
        </div>
        <span
          className={`text-xs opacity-80 mt-1 ${
            is_performer
              ? "ltr:text-right rtl:text-left"
              : "ltr:text-left rtl:text-right"
          }`}
        >
          {formattedDate}
        </span>
      </div>
    </div>
  );
}
