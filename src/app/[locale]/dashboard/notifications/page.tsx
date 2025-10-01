"use client";

import { FullScreenCalendar } from "@/components/calendar";
import { Title } from "@/components/ui/typography";
import { useGetScheduleNotificationsQuery } from "@/lib/apis/notifications";
import { useTranslations } from "next-intl";
const dummyEvents = [
  {
    day: new Date("2025-07-02"),
    notifications: [
      {
        id: 1,
        name: "Q1 Planning Session",
        time: "10:00 AM",
        datetime: "2025-07-02T00:00",
      },
      {
        id: 2,
        name: "Team Sync",
        time: "2:00 PM",
        datetime: "2025-07-02T00:00",
      },
    ],
  },
  {
    day: new Date("2025-07-07"),
    notifications: [
      {
        id: 3,
        name: "Product Launch Review",
        time: "2:00 PM",
        datetime: "2025-07-07T00:00",
      },
      {
        id: 4,
        name: "Marketing Sync",
        time: "11:00 AM",
        datetime: "2025-07-07T00:00",
      },
      {
        id: 5,
        name: "Vendor Meeting",
        time: "4:30 PM",
        datetime: "2025-07-07T00:00",
      },
    ],
  },
  {
    day: new Date("2025-07-10"),
    notifications: [
      {
        id: 6,
        name: "Team Building Workshop",
        time: "11:00 AM",
        datetime: "2025-07-10T00:00",
      },
    ],
  },
  {
    day: new Date("2025-07-13"),
    notifications: [
      {
        id: 7,
        name: "Budget Analysis Meeting",
        time: "3:30 PM",
        datetime: "2025-07-14T00:00",
      },
      {
        id: 8,
        name: "Sprint Planning",
        time: "9:00 AM",
        datetime: "2025-07-14T00:00",
      },
      {
        id: 9,
        name: "Design Review",
        time: "1:00 PM",
        datetime: "2025-07-14T00:00",
      },
    ],
  },
  {
    day: new Date("2025-07-16"),
    notifications: [
      {
        id: 10,
        name: "Client Presentation",
        time: "10:00 AM",
        datetime: "2025-07-16T00:00",
      },
      {
        id: 11,
        name: "Team Lunch",
        time: "12:30 PM",
        datetime: "2025-07-16T00:00",
      },
      {
        id: 12,
        name: "Project Status Update",
        time: "2:00 PM",
        datetime: "2025-07-16T00:00",
      },
    ],
  },
];
export default function Page() {
  const t = useTranslations("page_title"); 
  const { data:notifications, isLoading, refetch } = useGetScheduleNotificationsQuery({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  return (
    <div className="w-full h-full">
      <Title>{t("notifications")}</Title>
     
        <FullScreenCalendar data={notifications?.data || []}  />
    </div>
  );
}
