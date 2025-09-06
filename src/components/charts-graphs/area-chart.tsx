"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useDirLang } from "@/hooks/use-dir-lang";
import { formatDate } from "date-fns";
export const description = "A simple area chart";

interface ChartAreaDefaultProps {
  title: string;
  description: string;
  data: { key: string; value: number }[] | undefined;
  config: ChartConfig;
  isStep?: boolean;
}
export function ChartAreaDefault({
  title,
  description,
  data,
  config,
  isStep = false,
}: ChartAreaDefaultProps) {
  const { dir } = useDirLang();
  const isRTL = dir === "rtl";

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="aspect-auto h-[250px] w-full mt-2"
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >

            <CartesianGrid vertical={false} />
            <XAxis
              angle={isRTL ? 45 : 0}
              AxisComp={XAxis}
              dataKey="key"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              interval={1}
              reversed={isRTL}
            />
             <YAxis domain={["dataMin - 0", "dataMax +0.5"]} hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="value"
              type={isStep ? "step" : "monotone"}
              // type="basisOpen"
              fill="var(--color-base)"
              fillOpacity={0.4}
              stroke="var(--color-base)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
