"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useQuery } from "@tanstack/react-query";
import { getChartsDataAction } from "@/services/stats";
function ChartsContainer() {
  const { data, isPending } = useQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsDataAction(),
  });

  if (isPending) return <h2 className="text-xl font-medium">Please wait...</h2>;
  if (!data || data.length < 1) return null;
  return (
    <section className="p-6 bg-muted rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Monthly Applications Breakdown
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            stroke="var(--muted-foreground)"
            tickMargin={10}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12 }}
            stroke="var(--muted-foreground)"
            tickMargin={10}
          />
          <Tooltip />
          <Bar
            dataKey="count"
            fill="#4ca154"
            barSize={60}
            radius={[4, 4, 0, 0]} // Rounded bar corners
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
export default ChartsContainer;
