import { UserType } from "@/lib/roles";
import {
  Bell,
  BringToFront,
  ChartSpline,
  HandCoins,
  Home,
  Landmark,
  Mail,
  MessageCircle,
  TicketPercent,
  UserRoundCog,
  UsersRound,
} from "lucide-react";
import { IMenuItem } from "./app-sidebar";
import { OverviewStatisticsResponse } from "@/lib/apis/overview";
export function MenuItems({
  overviewStatistics,
}: {
  overviewStatistics: OverviewStatisticsResponse;
}) {
  const menu_items: IMenuItem[] = [
    {
      title_key: "dashboard",
      url: "overview",
      icon: Home,
      active: true,
      roles: [UserType.ADMIN, UserType.SUPER_ADMIN],
    },
    {
      title_key: "umrah_management",
      url: "#",
      icon: BringToFront,
      roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.CALL_SERVICE],
      items: [
        {
          title_key: "current_requests",
          url: "umrah/requests/current",
          segment: "umrah/requests/current",
          roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.CALL_SERVICE],
        },
        {
          title_key: "lost_requests",
          url: "umrah/requests/lost",
          segment: "umrah/requests/lost",
          roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.CALL_SERVICE],
        },
      ],
    },
    {
      title_key: "users_management",
      url: "#",
      icon: UsersRound,
      roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.CALL_SERVICE],
      items: [
        {
          title_key: "seekers",
          url: "users/seekers",
          segment: "users",
          roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.CALL_SERVICE],
        },
        {
          title_key: "performers",
          url: "users/performers",
          segment: "users",
          roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.CALL_SERVICE],
        },
        {
          title_key: "review_needed",
          url: "users/review",
          segment: "users",
          count: overviewStatistics?.data?.pending_performer_verifications,
          roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.CALL_SERVICE],
        },
      ],
    },
    {
      title_key: "finance_management",
      url: "#",
      icon: Landmark,
      roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.ACCOUNTANT],
      items: [
        {
          title_key: "accounts",
          url: "finance/accounts",
          segment: "accounts",
          roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.ACCOUNTANT],
        },
        {
          title_key: "incoming",
          url: "finance/incoming",
          segment: "incoming",
          roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.ACCOUNTANT],
        },
        {
          title_key: "outgoing",
          url: "finance/outgoing",
          segment: "outgoing",
          roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.ACCOUNTANT],
        },
        {
          title_key: "withdrawal",
          url: "finance/withdrawals",
          segment: "withdrawals",
          count: overviewStatistics?.data?.pending_withdrawals,
          roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.ACCOUNTANT],
        },
      ],
    },
    {
      title_key: "reports",
      url: "#",
      icon: ChartSpline,
      roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.ACCOUNTANT],
      items: [
        {
          title_key: "seekers",
          url: "reports/seekers",
          segment: "reports/seekers",
          roles: [UserType.ADMIN, UserType.SUPER_ADMIN],
        },
        {
          title_key: "performers",
          url: "reports/performers",
          segment: "reports/performers",
          roles: [UserType.ADMIN, UserType.SUPER_ADMIN],
        },
        {
          title_key: "umrah",
          url: "reports/umrah",
          segment: "reports/umrah",
          roles: [UserType.ADMIN, UserType.SUPER_ADMIN],
        },
        {
          title_key: "countries",
          url: "reports/countries",
          segment: "reports/countries",
          roles: [UserType.ADMIN, UserType.SUPER_ADMIN],
        },

        {
          title_key: "incomes",
          url: "reports/incomes",
          segment: "reports/incomes",
          roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.ACCOUNTANT],
        },
        {
          title_key: "expenses",
          url: "reports/expenses",
          segment: "reports/expenses",
          roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.ACCOUNTANT],
        },
      ],
    },
    {
      title_key: "employees_management",
      url: "employees",
      icon: UserRoundCog,
      segment: "employees",
      roles: [UserType.ADMIN, UserType.SUPER_ADMIN],
    },
    {
      title_key: "coupons_management",
      url: "coupons",
      icon: TicketPercent,
      segment: "coupons",
      roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.CALL_SERVICE],
    },
    {
      title_key: "chats",
      url: "chats",
      icon: MessageCircle,
      segment: "chats",
      roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.CALL_SERVICE],
    },
    {
      title_key: "notifications_management",
      url: "notifications",
      icon: Bell,
      roles: [UserType.ADMIN, UserType.SUPER_ADMIN],
    },
    {
      title_key: "contact_us_messages",
      url: "contact-messages",
      icon: Mail,
      count: overviewStatistics?.data?.in_progress_contacts,
      roles: [UserType.ADMIN, UserType.SUPER_ADMIN, UserType.CALL_SERVICE],
    },
    {
      title_key: "donations",
      url: "donations",
      icon: HandCoins,
      roles: [UserType.ADMIN, UserType.SUPER_ADMIN],
    },
  ];

  return menu_items;
}
