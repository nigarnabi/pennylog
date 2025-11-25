"use client";

import { Button } from "@/components/ui/button";
import { GoalForm } from "@/components/main/goalForm";
import { GoalCard } from "@/components/main/goalCard";
import type { Goal } from "@/lib/types";
import { useGoals } from "@/lib/useGoals";
import { useState } from "react";
export default function GoalsPage() {
  const {
    goals,
    loading,
    error,
    setError,
    createGoal,
    updateGoal,
    deleteGoal,
  } = useGoals();

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-balance">Goals</h1>
        <Button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? "Cancel" : "Add goal"}
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground mb-8">
          Loading your goals...
        </p>
      ) : goals.length === 0 ? (
        <p className="text-sm text-muted-foreground mb-8">
          You don&apos;t have any goals yet. Create one below to get started.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              setError={setError}
              onUpdate={async (data) => {
                await updateGoal(goal.id, data);
              }}
              onDelete={() => deleteGoal(goal.id)}
            />
          ))}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 mb-4" role="alert">
          {error}
        </p>
      )}

      {showForm && (
        <GoalForm
          onCreate={async (data) => {
            await createGoal(data);
            setShowForm(false);
          }}
          setError={setError}
        />
      )}

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
        {!showForm && (
          <Button size="lg" onClick={() => setShowForm(true)}>
            Set up my goals
          </Button>
        )}
      </div>
    </div>
  );
}
