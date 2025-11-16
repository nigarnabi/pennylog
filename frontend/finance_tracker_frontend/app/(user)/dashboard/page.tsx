"use client";

import { BarChart3, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { month: "Jan", spending: 2400 },
  { month: "Feb", spending: 1398 },
  { month: "Mar", spending: 9800 },
  { month: "Apr", spending: 3908 },
  { month: "May", spending: 4800 },
  { month: "Jun", spending: 3800 },
];

const checklistItems = [
  { id: 1, label: "Connect account", completed: false },
  { id: 2, label: "Add first expense", completed: false },
  { id: 3, label: "Set a goal", completed: false },
];

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-balance">Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Total Balance
          </p>
          <p className="text-3xl font-semibold">$12,450.50</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Total Income (month)
          </p>
          <p className="text-3xl font-semibold">$5,200.00</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Total Expenses (month)
          </p>
          <p className="text-3xl font-semibold">$2,840.75</p>
        </Card>
      </div>

      {/* Charts and Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-6">Monthly Spending</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="spending"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ fill: "var(--primary)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Checklist */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Getting Started
          </h2>
          <div className="space-y-3">
            {checklistItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-sm font-medium flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      className="w-4 h-4 rounded"
                      readOnly
                    />
                    {item.label}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-6">Get Started</Button>
        </Card>
      </div>
    </div>
  );
}
