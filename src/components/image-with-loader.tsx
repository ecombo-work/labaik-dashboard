"use client";

import * as React from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface ImageWithLoadingProps extends ImageProps {
  loaderClassName?: string;
  imageClassName?: string;
}

export default function ImageWithLoading({
  src,
  alt,
  loaderClassName,
  imageClassName,
  ...props
}: ImageWithLoadingProps) {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {loading && (
        <div
          className={cn(
            "absolute inset-0 animate-pulse bg-muted rounded-md",
            loaderClassName
          )}
        />
      )}

      <Image
        src={src}
        alt={alt}
        {...props}
        onLoadingComplete={() => setLoading(false)}
        className={cn(
          "duration-500 ease-in-out",
          loading ? "opacity-0" : "opacity-100",
          imageClassName
        )}
      />
    </div>
  );
}
