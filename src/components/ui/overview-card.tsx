"use client";
import React, {
  ForwardRefExoticComponent,
  JSX,
  ReactNode,
  RefAttributes,
} from "react";
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
import { Icon, IconProps } from "@tabler/icons-react";
import type { LucideIcon } from "lucide-react";

type OverviewCardProps = {
  name: string;
  value?: string | number | null | undefined | bigint | ReactNode;
  CardIcon:
    | LucideIcon
    | ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
};

const OverviewCard: React.FC<OverviewCardProps> = ({
  name,
  value,
  CardIcon,
}) => {
  return (
    <Card className="md:col-span-6 xl:col-span-3">
      <CardHeader className="flex items-center justify-between px-4 rtl:space-x-reverse">
        <CardDescription className=" text-base font-medium tracking-tight truncate">
          {name}
        </CardDescription>

        <CardAction className="icon-container">
          {CardIcon && <CardIcon className="" stroke="2" />}
        </CardAction>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <CardTitle className=" text-3xl font-bold w-full">
          {value || 0}
        </CardTitle>
      </CardContent>
      <div className="absolute top-0  w-1 h-full rtl:right-0 ltr:left-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Card>
  );
};

export default OverviewCard;
