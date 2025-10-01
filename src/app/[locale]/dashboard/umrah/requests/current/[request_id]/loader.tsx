import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card className="p-2 gap-2" key={index}>
            <CardHeader className="flex items-center justify-start gap-2 p-0">
              <div className="icon-container">
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>
              <Skeleton className="w-36 h-6" />
            </CardHeader>

            <CardContent className="px-0 py-2.5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="w-28 h-6" />
                <Skeleton className="w-16 h-6" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="w-28 h-6" />
                <Skeleton className="w-16 h-6" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="w-28 h-6" />
                <Skeleton className="w-16 h-6" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="w-28 h-6" />
                <Skeleton className="w-16 h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4 order-2 md:order-1">
          <Card className="p-2 gap-2 ">
            <CardHeader className="flex items-center justify-start gap-2 p-0">
              <div className="icon-container">
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>
              <Skeleton className="w-36 h-6" />
            </CardHeader>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <Skeleton className="w-full h-2.5 rounded-full" />
            </div>
            <CardContent className="h-full flex flex-col justify-center px-0 space-y-3 overflow-x-auto">
              <div className="flex items-center justify-between gap-2 ">
                <div className="flex items-start flex-col gap-3 min-w-36">
                  <h4 className="font-semibold">
                    <Skeleton className="w-20 h-6" />
                  </h4>
                  <Skeleton className="w-28 h-6" />
                  <Skeleton className="w-28 h-6" />
                  <Skeleton className="w-28 h-6" />
                </div>
                <div className="flex items-start flex-col gap-3 min-w-36">
                  <h4 className="font-semibold">
                    <Skeleton className="w-20 h-6" />
                  </h4>
                  <Skeleton className="w-28 h-6" />
                  <Skeleton className="w-28 h-6" />
                  <Skeleton className="w-28 h-6" />
                </div>
                <div className="flex items-start flex-col gap-3 min-w-36">
                  <h4 className="font-semibold">
                    <Skeleton className="w-20 h-6" />
                  </h4>
                  <Skeleton className="w-28 h-6" />
                  <Skeleton className="w-28 h-6" />
                  <Skeleton className="w-28 h-6" />
                </div>
                <div className="flex items-start flex-col gap-3 min-w-36">
                  <h4 className="font-semibold">
                    <Skeleton className="w-20 h-6" />
                  </h4>

                  <Skeleton className="w-28 h-6" />
                  <Skeleton className="w-28 h-6" />
                  <Skeleton className="w-28 h-6" />
                </div>
                <div className="flex items-start flex-col gap-3 min-w-36">
                  <h4 className="font-semibold">
                    <Skeleton className="w-20 h-6" />
                  </h4>
                  <Skeleton className="w-28 h-6" />
                  <Skeleton className="w-28 h-6" />
                  <Skeleton className="w-28 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-2 gap-2 overflow-x-auto">
            <CardHeader className="flex items-center justify-start gap-2 p-0">
              <div className="icon-container">
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>

              <Skeleton className="w-36 h-6" />
            </CardHeader>
            <CardContent className="h-full flex flex-col justify-center px-0 space-y-3 pt-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between gap-2 pb-2 ${
                    index !== 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <Skeleton className="w-20 h-6" />

                  <Skeleton className="w-20 h-6" />

                  <Skeleton className="w-20 h-6" />

                  <Skeleton className="w-20 h-6" />

                  <Skeleton className="w-20 h-6" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4 order-1 md:order-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <Card className="p-2 gap-2" key={index}>
              <CardHeader className="flex items-center justify-start gap-2 p-0">
                <div className="icon-container h-16 w-16">
                  <Skeleton className="w-16 h-16 rounded-full" />
                </div>

                <div className="w-full flex items-start justify-start flex-col gap-3">
                  <Skeleton className="w-36 h-6" />

                  <Skeleton className="w-28 h-6" />
                </div>
              </CardHeader>
              <CardContent className="h-full flex flex-col justify-center px-0 space-y-3">
                <div className="flex items-center justify-start gap-2">
                  <Skeleton className="size-6" />
                  <Skeleton className="w-28 h-6" />
                </div>
                <div className="flex items-center justify-start gap-2">
                  <Skeleton className="size-6" />
                  <Skeleton className="w-28 h-6" />
                </div>
                <div className="flex items-center justify-start gap-2">
                  <Skeleton className="size-6" />
                  <Skeleton className="w-28 h-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
