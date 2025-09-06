import { differenceInHours, differenceInMinutes, format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UmrahDetailsResponse } from "@/interfaces/umrah";
import {
  IconBuildingMosque,
  IconUser,
  IconFlag,
  IconTag,
  IconHistory,
  IconMail,
  IconPhone,
  IconMapPin,
} from "@tabler/icons-react";
import { formatDate } from "@/lib/utils/date-utils";
export const ProgressCard = ({
  progress,
  t,
  dir,
}: {
  progress: UmrahDetailsResponse["progress"];
  t: any;
  dir: string;
}) => {
  if (!progress) {
    return (
      <Card className="p-4 gap-2">
        <CardHeader className="flex items-center justify-start gap-2 p-0">
          <div className="icon-container">
            <IconFlag />
          </div>
          <CardTitle className="font-medium">{t("progress_details")}</CardTitle>
        </CardHeader>
        <CardContent className="py-6 text-center">
          <p className="text-muted-foreground text-sm">
            {t("no_progress_available")}
          </p>
          <p className="text-muted-foreground/50 text-xs mt-1">
            {t("progress_will_appear_here")}
          </p>
        </CardContent>
      </Card>
    );
  }
  const formatToHHMM = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  return (
    <Card className="p-2 gap-2 ">
      <CardHeader className="flex items-center justify-start gap-2 p-0">
        <div className="icon-container">
          <IconFlag />
        </div>
        <CardTitle className="font-medium">{t("progress_details")}</CardTitle>
      </CardHeader>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-500 w-full"
          style={{ width: `${progress.progress_percentage ?? 0}%` }}
        ></div>
      </div>
      <CardContent className="h-full flex flex-col justify-center px-0 space-y-3 overflow-x-auto">
        {/* pillar status start end */}
        <div className="flex items-center justify-between gap-2 ">
          <div className="flex items-start flex-col gap-3 min-w-36">
            <h4 className="font-semibold">{t("progress.pillars")}</h4>
            <p>{t("progress.ihram")}:</p>
            <p>{t("progress.tawaf")}:</p>
            <p>{t("progress.sai")}:</p>
          </div>
          <div className="flex items-start flex-col gap-3 min-w-36">
            <h4 className="font-semibold">{t("progress.started_at")}</h4>
            <p>
              {progress.ihram_started_at
                ? formatDate(progress.ihram_started_at)
                : "-"}
            </p>
            <p>
              {progress.tawaf_started_at
                ? formatDate(progress.tawaf_started_at)
                : "-"}
            </p>
            <p>
              {progress.sai_started_at
                ? formatDate(progress.sai_started_at)
                : "-"}
            </p>
          </div>
          <div className="flex items-start flex-col gap-3 min-w-36">
            <h4 className="font-semibold">{t("progress.ended_at")}</h4>
            <p>
              {progress.ihram_completed_at
                ? formatDate(progress.ihram_completed_at)
                : "-"}
            </p>
            <p>
              {progress.tawaf_completed_at
                ? formatDate(progress.tawaf_completed_at)
                : "-"}
            </p>
            <p>
              {progress.sai_completed_at
                ? formatDate(progress.sai_completed_at)
                : "-"}
            </p>
          </div>
          <div className="flex items-start flex-col gap-3 min-w-36">
            <h4 className="font-semibold">{t("progress.duration")}</h4>
            <p>
              {progress.ihram_completed_at && progress.ihram_started_at
                ? formatToHHMM(
                    differenceInMinutes(
                      progress.ihram_completed_at,
                      progress.ihram_started_at
                    )
                  )
                : "-"}
            </p>
            <p>
              {progress.tawaf_completed_at && progress.tawaf_started_at
                ? formatToHHMM(
                    differenceInMinutes(
                      progress.tawaf_completed_at,
                      progress.tawaf_started_at
                    )
                  )
                : "-"}
            </p>
            <p>
              {progress.sai_completed_at && progress.sai_started_at
                ? formatToHHMM(
                    differenceInMinutes(
                      progress.sai_completed_at,
                      progress.sai_started_at
                    )
                  )
                : "-"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
