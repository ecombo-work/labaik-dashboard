"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

interface ChartBarDefaultProps {
  data: { key: string; value: number }[];
  config: ChartConfig;
}

export function ChartBarDefault({ data, config }: ChartBarDefaultProps) {
  return (
    <Card className="h-[500px]">
      <CardContent>
        <ChartContainer className="h-[450px] w-full" config={config}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              scale="auto"
              dataKey="key"
              tickLine={false}
              tickMargin={15}
              axisLine={true}
                // angle={25}
                // fontSize={10}
                // height={50}
                // width={10}
              tickFormatter={(value) => value.split(" ").join("\n")} 
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="value"
              fill="var(--color-base)"
              radius={[8, 8, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
