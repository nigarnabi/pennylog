"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Target } from "lucide-react";

const goals = [
  {
    id: 1,
    name: "Down payment",
    icon: Target,
    saved: 11200,
    target: 40000,
    monthsLeft: 18,
  },
  {
    id: 2,
    name: "New car",
    icon: Zap,
    saved: 5800,
    target: 35000,
    monthsLeft: 24,
  },
];

export default function GoalsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-balance">Goals</h1>
      </div>

      {/* Goal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const percentage = (goal.saved / goal.target) * 100;
          return (
            <Card
              key={goal.id}
              className="p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{goal.name}</h3>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* Amount */}
                <p className="text-sm text-muted-foreground">
                  ${goal.saved.toLocaleString()} / $
                  {goal.target.toLocaleString()}
                </p>
              </div>

              {/* Footer */}
              <p className="text-sm font-medium text-primary">
                {goal.monthsLeft} months left to goal
              </p>
            </Card>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-balance">
          Set a personal savings schedule and reach your financial dreams
        </h2>
        <div className="space-y-2 mb-8">
          <p className="text-muted-foreground">
            Enter the target amount and date.
          </p>
          <p className="text-muted-foreground">
            Define your monthly contributions.
          </p>
          <p className="text-muted-foreground">And just follow the plan.</p>
        </div>
        <Button size="lg">Set up my goals</Button>
      </div>
    </div>
  );
}
