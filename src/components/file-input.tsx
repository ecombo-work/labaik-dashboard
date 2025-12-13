"use client";

import { cn } from "@/lib/utils";
import { FileIcon, Trash2, Upload, X } from "lucide-react";
import * as React from "react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
interface FileInputProps {
  className?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  disabled?: boolean;
  accept?: string;
  dimensions?: string;
  image_class?: string;
  default_value?: string;
}

const FileInput = ({
  className,
  value,
  onChange,
  disabled,
  accept,
  dimensions,
  image_class,
  default_value,
}: FileInputProps) => {
  const t = useTranslations("file_input");
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelection = (file: File | null) => {
    if (!disabled) onChange?.(file);
  };

  const handleDragEvents = (
    e: React.DragEvent<HTMLDivElement>,
    isOver: boolean
  ) => {
    e.preventDefault();
    if (!disabled) setIsDragging(isOver);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (!disabled) {
      const file = e.dataTransfer.files?.[0] ?? null;
      handleFileSelection(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelection(e.target.files?.[0] ?? null);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleFileSelection(null);
    if (inputRef.current) inputRef.current.value = "";
  };
 
  const fileUrl = default_value
    ? default_value
    : value
    ? URL.createObjectURL(value)
    : "";
 
  return (
    <div className={cn("space-y-2", className)}>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDrop={handleDrop}
        className={cn(
          "relative cursor-pointer rounded-lg border border-dashed border-primary p-1 text-center transition-colors hover:bg-muted/50",
          isDragging && "border-muted-foreground/50 bg-muted/50",
          disabled && "cursor-not-allowed opacity-60",
          "flex items-center justify-center ",
          className 
        )}
        role="button"
        tabIndex={0}
        aria-disabled={disabled}
      >
        {/* src={URL.createObjectURL(value)} */}
        {value && !default_value && (
          <div className="relative">
            {!default_value && (
              <span
                onClick={handleRemove}
                className="absolute top-2 ltr:right-2 rtl:left-2 cursor-pointer bg-primary rounded-full p-2 z-50"
              >
                <Trash2 className="text-white size-5" />
              </span>
            )}
            <Image
              src={fileUrl}
              width={350}
              height={500}
              alt=""
              className={`w-full h-full object-contain rounded-lg ${image_class}`}
            />
          </div>
        )}
        {default_value && (
          <Image
            src={fileUrl}
            width={350}
            height={500}
            alt=""
            className={`w-full h-full object-contain rounded-lg ${image_class}`}
          />
        )}
        {!value && !default_value && (
          <span>
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              disabled={disabled}
              onChange={handleChange}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center gap-1">
              <Upload className="h-8 w-8" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">
                  {t("click_to_upload")}
                </span>{" "}
                {t("or_drag_and_drop")}
              </p>
            </div>
          </span>
        )}
      </div>
    </div>
  );
};

export { FileInput };
