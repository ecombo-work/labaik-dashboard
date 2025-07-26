"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export default function WaveBg() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-svh -z-50 bg-primary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-full h-full fill-current"
        viewBox="0 0 6440 620"
        preserveAspectRatio="none"
      >
        <path
          className={cn(
            "!transform-[scale(5000%,200%)] md:!transform-[scale(775%,194%)]",
            theme === "dark" ? "fill-[#0D0D0D]" : "fill-[#FAFAFA]"
          )}
          fillOpacity="1"
          d="M0,192L34.3,208C68.6,224,137,256,206,245.3C274.3,235,343,181,411,170.7C480,160,549,192,617,192C685.7,192,754,160,823,144C891.4,128,960,128,1029,144C1097.1,160,1166,192,1234,208C1302.9,224,1371,224,1406,224L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        />
      </svg>
    </div>
  );
}

    // fill={}theme === "dark" ? "#0D0D0D" : "#FAFAFA"