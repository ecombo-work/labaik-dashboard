import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./card";
import { Badge } from "./badge";
import {
  IconUsersGroup,
  IconUsers,
  IconUser,
  IconUserShield,
  IconFileDescription,
  IconClockHour4,
  IconCircleCheck,
  IconClockCheck,
  IconStopwatch,
  IconProgressCheck,
  IconProgress,
  IconProgressX,
  IconDots,
  IconCurrencyDollar,
  IconTax,
  IconWorldDollar,
  IconUserDollar,
  IconCash,
  IconDatabaseDollar,
  IconRosetteDiscountCheck,
  IconOctagonMinus,
} from "@tabler/icons-react";
import { Users2 } from "lucide-react";
function OverviewCard() {
  const card_data = [
    {
      description: "Total Users",

      value: "2,250",
      icon: IconUsersGroup,
    },
    {
      description: "performers",

      value: "1,200",
      icon: IconUsers,
    },
    {
      description: "Seekers",
      value: "2,250",
      icon: IconUser,
    },
    {
      description: "Employees",

      value: "2,250",
      icon: IconUserShield,
    },
    {
      description: "Requests",

      value: "2,250",
      icon: IconFileDescription,
    },
    {
      description: "In Waiting",

      value: "2,250",
      icon: IconClockHour4,
    },
    {
      description: "Accepted",

      value: "2,250",
      icon: IconClockCheck,
    },
    {
      description: "In Progress",

      value: "2,250",
      icon: IconProgress,
    },
    {
      description: "Completed",

      value: "2,250",
      icon: IconProgressCheck,
    },
    {
      description: "Cancelled",

      value: "2,250",
      icon: IconProgressX,
    },
    {
      description: "other requests",

      value: "2,250",
      icon: IconDots,
    },
    {
      description: "Total Revenue",
      value: "2,250",
      icon: IconWorldDollar,
    },
    {
      description: "Umrah Revenues",
      value: "2,250",
      icon: IconCurrencyDollar,
    },
    {
      description: "Performers Revenues",
      value: "2,250",
      icon: IconUserDollar,
    },
    // {
    //   description: "Seekers Revenues",
    //   value: "2,250",
    //   icon: IconStopwatch,
    // },
    {
      description: "Company Revenues",
      value: "2,250",
      icon: IconCash,
    },
    {
      description: "VAT",
      value: "2,250",
      icon: IconTax,
    },
    {
      description: "Other Revenues",
      value: "2,250",
      icon: IconDatabaseDollar,
    },
    {
      description: "Using coupons",
      value: "2,250",
      icon: IconRosetteDiscountCheck,
    },
    {
      description: "Discounted Amount",
      value: "2,250",
      icon: IconOctagonMinus,
    }
  ];

  return (
    <div className="grid auto-rows-auto grid-cols-3 gap-5 md:grid-cols-5 lg:grid-cols-15">
      {card_data.map((card, idx) => (
        <Card
          key={idx}
          className="@container/card bg-card gap-4 shadow-sm col-span-3 lg:col-span-3 xl:col-span-3 !py-4"
        >
          <CardHeader className="flex items-center justify-between px-4">
            <CardDescription className="text-base">
              {card.description}
            </CardDescription>

            <CardAction className="size-9  rounded-full bg-secondary flex justify-center items-center">
              <card.icon className="!text-white" stroke={2} />
            </CardAction>
          </CardHeader>
          <CardContent className="px-4">
            <CardTitle className="text-3xl font-bold w-full">
              {card.value}
            </CardTitle>
            {/* <Tooltip>
              <TooltipTrigger>
                <CardTitle className="text-3xl font-bold w-full">
                  {card.value}
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent className="TooltipContent">
                <p>{card.tooltip}</p>
              </TooltipContent>
            </Tooltip> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default OverviewCard;
