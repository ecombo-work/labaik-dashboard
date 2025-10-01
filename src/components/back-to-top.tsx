"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 250) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed cursor-pointer bottom-22 ltr:right-6 rtl:left-6 z-50 rounded-full !text-white shadow-lg transition-all duration-300">
      <button
        onClick={scrollToTop}
        className="bg-primary rounded-full p-2 cursor-pointer"
        aria-label="Back to top"
      >
        <ChevronUp className=" size-6 !text-white" />
      </button>
    </div>
  );
}
