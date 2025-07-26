import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Chat } from "@/lib/apis/chat";
import { format } from "date-fns";

export function ChatList({
  chats,
  activeChat,
  isLoading,
  error,
  onChatSelect,
}: {
  chats: any[];
  activeChat: any | null;
  isLoading: boolean;
  error: any;
  onChatSelect: (chat: Chat) => void;
}) {
  return (
    // <div className=" overflow-hidden ">
      <ScrollArea className="!h-[550px] bg-white rounded-lg drop-shadow-xl flex flex-col">
      
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p>Loading...</p>
            </div>
          ) : error ? (
            <div className="p-4 text-red-500">
              Error loading chats. Please try again later.
            </div>
          ) : chats.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No chats found</div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.conversation_id}
                onClick={() => onChatSelect(chat)}
                className={`relative p-3 hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-b border-gray-100 ${
                  activeChat?.conversation_id === chat.conversation_id
                    ? "bg-blue-50 border-r-2 border-r-blue-500"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="flex -space-x-4">
                      {chat.participants.slice(0, 2).map((participant: any) => (
                        <div key={participant.participant_id}>
                          <Avatar className="h-12 w-12 border-2 border-white bg-gray-100">
                            <AvatarImage
                              src={participant.user.profile_image || ""}
                              alt={participant.user.username}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-gray-200 text-gray-600">
                              {participant.user.username
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase()
                                .substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      ))}
                      {chat.participants.length > 2 && (
                        <div className="h-12 w-12 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-500">
                          +{chat.participants.length - 2}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {chat.participants
                          .map((p: any) => p.user.username)
                          .join(", ")}
                      </h3>
                      {chat.last_message && (
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                          {format(new Date(chat.last_message.created_at), "h:mm a")}
                        </span>
                      )}
                    </div>

                    {chat.last_message && (
                      <div className="mt-1">
                        <p className="text-sm text-gray-500 truncate">
                          <span className="font-medium text-gray-700">
                            {chat.last_message.sender.username.split(" ")[0]}:
                          </span>{" "}
                          {chat.last_message.content.length > 30
                            ? `${chat.last_message.content.substring(0, 30)}...`
                            : chat.last_message.content}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
       
      </ScrollArea>
    // </div>
  );
}
