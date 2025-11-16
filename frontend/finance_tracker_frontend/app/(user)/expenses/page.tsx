"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { week: "Week 1", current: 400, previous: 240 },
  { week: "Week 2", current: 300, previous: 380 },
  { week: "Week 3", current: 200, previous: 290 },
  { week: "Week 4", current: 278, previous: 190 },
];

export default function ExpensesPage() {
  const [period, setPeriod] = useState("this-month");
  const [account, setAccount] = useState("all");
  const [view, setView] = useState<"categories" | "hashtags" | "merchants">(
    "categories"
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-balance">Expenses</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This month</SelectItem>
            <SelectItem value="last-month">Last month</SelectItem>
            <SelectItem value="last-3-months">Last 3 months</SelectItem>
          </SelectContent>
        </Select>

        <Select value={account} onValueChange={setAccount}>
          <SelectTrigger className="md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All accounts</SelectItem>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="checking">Checking</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        {["categories", "hashtags", "merchants"].map((v) => (
          <Button
            key={v}
            variant={view === v ? "default" : "outline"}
            onClick={() => setView(v as typeof view)}
            className="capitalize"
          >
            {v}
          </Button>
        ))}
      </div>

      {/* Chart */}
      <Card className="p-6 mb-8">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="current"
                stroke="var(--primary)"
                strokeWidth={2}
                name="Current month spending"
                dot={{ fill: "var(--primary)" }}
              />
              <Line
                type="monotone"
                dataKey="previous"
                stroke="var(--muted-foreground)"
                strokeWidth={2}
                name="Previous month spending"
                dot={{ fill: "var(--muted-foreground)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Empty State */}
      <Card className="p-12 text-center">
        <p className="text-lg text-muted-foreground">
          There's no spending to display.
        </p>
      </Card>
    </div>
  );
}
