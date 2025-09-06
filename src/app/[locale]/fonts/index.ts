import { Almarai } from "next/font/google";
import localFont from "next/font/local";

export const dinArabic = localFont({
  src: [
    { path: "./DIN-LIGHT.ttf", weight: "300", style: "normal" },
    { path: "./DIN-Regular.ttf", weight: "400", style: "normal" },
    { path: "./DIN-Medium.ttf", weight: "500", style: "normal" },
    { path: "./DIN-Bold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-din",
  display: "swap",
});
export const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
  display: "swap",
  preload: true,
});