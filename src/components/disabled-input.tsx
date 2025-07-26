"use client";
import { useCopyToClipboard } from "@/hooks/use-copy-clipboard";
import { useState } from "react";
import { Copy, CopyCheck } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const DisabledInput = ({
  label,
  value,
  with_copy = false,
}: {
  label: string;
  value: string;
  with_copy?: boolean;
}) => {
  const [copiedText, copy] = useCopyToClipboard();
  const [lastCopiedId, setLastCopiedId] = useState<number | null>(null);
  async function handleCopy(value: string) {
    const success = await copy(value);
    setLastCopiedId(Date.now());
    if (success) {
      setTimeout(() => {
        setLastCopiedId(null);
      }, 2000);
    }
  }
  return (
    <div className="w-full">
      <Label className="mb-1">{label}:</Label>
      <div className="flex gap-2 items-center justify-start w-full">
        <Input readOnly disabled value={value} className="w-full" />
        {with_copy && (
          <Button
            variant={"icon"}
            className="!w-10 !h-10"
            onClick={() => handleCopy(value)}
          >
            {lastCopiedId ? (
              <CopyCheck className=" text-white" />
            ) : (
              <Copy className=" text-white" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
export default DisabledInput;
