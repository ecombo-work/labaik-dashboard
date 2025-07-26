import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ChatHeader({ chat }: { chat: any }) {
  return (
    <div className="border-b p-4 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center space-x-3">
        <div className="flex -space-x-2">
          {chat.participants.slice(0, 2).map((participant: any) => (
            <Avatar
              key={participant.participant_id}
              className="h-10 w-10 border-2 border-white"
            >
              <AvatarImage
                src={participant.user.profile_image || ""}
                alt={participant.user.username}
              />
              <AvatarFallback className="bg-gray-200">
                {participant.user.username
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()
                  .substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div>
          <h3 className="font-medium">
            {chat.participants.map((p: any) => p.user.username).join(", ")}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            <span>{chat.participants.length} participants</span>
            <span className="mx-2">•</span>
            <span>{chat.participants[0]?.user.country || "Unknown"}</span>
            <span className="mx-2">•</span>
            <span>{chat.participants[0]?.user.user_type || "User"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
