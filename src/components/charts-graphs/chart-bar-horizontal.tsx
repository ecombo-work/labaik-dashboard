"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
import { getCountryName } from "@/lib/utils/country-name";
import { useDirLang } from "@/hooks/use-dir-lang";

export const description = "A horizontal bar chart";

// const chartConfig = {
//   count: {
//     label: "Count",
//     color: "var(--chart-1)",
//   },
// } satisfies ChartConfig

export function ChartBarHorizontal({
  data,
  config,
  is_country,
  title,
  description,
}: {
  data: any[];
  config: ChartConfig;
  is_country?: boolean;
  title?: string;
  description?: string;
}) {
  const { dir, lang } = useDirLang();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config}
          className="aspect-auto h-[350px] w-full mt-2"
        >
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            // margin={{
            //   left: 20,
            //   right: 10,
            // }}
            barCategoryGap={10}
          >
            <XAxis
              type="number"
              dataKey="total_count"
              //   orientation={dir === "rtl" ? "top" : "bottom"}
            />
            <YAxis
              dataKey={is_country ? "country" : "non_country"}
              type="category"
              tickLine={false}
              tickMargin={25}
              axisLine={true}
              fontSize={12}
              tickFormatter={(value) =>
                getCountryName(value, lang)?.split(" ").join("\n") ??
                String(value)
              }
              tick={({ x, y, payload }) => (
                <text
                  x={x}
                  y={y}
                  textAnchor={dir === "rtl" ? "end" : "start"}
                  transform={`rotate(-45, ${x}, ${y})`}
                  fontSize={14}
                >
                  {getCountryName(payload.value, lang)?.split(" ").join("\n") ??
                    String(payload.value)}
                </text>
              )}
              width={50}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    getCountryName(value, lang) ?? String(value)
                  }
                />
              }
            />
            <Bar
              dataKey="total_count"
              fill="var(--chart-1)"
              radius={dir === "rtl" ? [0, 8, 8, 0] : [0, 8, 8, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
