"use client";

import Image from "next/image";
import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export const ImageZoom = ({ src }: { src: string }) => {
  return (
    <div className="relative flex h-[360px] max-w-[320px] flex-col items-start rounded-xl ">
      <DefaultImageZoom>
        <Image
          src={src === "" ? "/placeholder.jpg" : src}
          alt="Profile Image"
          height={700}
          width={700}
          className="h-[360px] object-cover w-[320px] rounded-xl drop-shadow"
        />
      </DefaultImageZoom>
    </div>
  );
};

type ImageZoomProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof Zoom>;

const DefaultImageZoom = (props: ImageZoomProps) => {
  const { children, ...rest } = props;

  return (
    <Zoom zoomMargin={10} {...rest}>
      {children}
    </Zoom>
  );
};

export { DefaultImageZoom };
