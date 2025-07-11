import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { FormEvent } from "react";

type MessageInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  disabled?: boolean;
};

export function MessageInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
}: MessageInputProps) {
  return (
    <form onSubmit={onSubmit} className="border-t p-4 flex-shrink-0">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Type a message..."
          className="flex-1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
        <Button
          type="submit"
          size="icon"
          className="h-10 w-10"
          disabled={!value.trim() || disabled}
        >
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
