"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <>
      <Skeleton className="w-44 h-5 my-3 bg-white" />
      <Skeleton className="w-22 h-9 mb-4 bg-white" />
      <div className="grid gap-4 md:grid-cols-6 lg:grid-cols-12">
        {Array.from({ length: 18 }).map((_, idx) => (
          <Card
            key={idx}
            className="!py-4 rtl:space-x-reverse md:col-span-3 lg:col-span-3 xl:col-span-3"
          >
            <CardHeader className="flex items-center justify-between px-4 rtl:space-x-reverse">
              <CardDescription className="text-base font-medium tracking-tight truncate">
                <Skeleton className="w-36 h-6" />
              </CardDescription>

              <CardAction className="icon-container">
                <Skeleton className="w-10 h-10 rounded-full" />
              </CardAction>
            </CardHeader>
            <CardContent className="px-4 py-2">
              <CardTitle className="text-3xl font-bold w-full">
                <Skeleton className="w-18 h-10" />
              </CardTitle>
            </CardContent>
            <div className="absolute top-0  w-1 h-full rtl:right-0 ltr:left-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Card>
        ))}
      </div>
    </>
  );
}
