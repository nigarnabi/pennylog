"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Trash2, Edit2, X, Check } from "lucide-react";
import type { Goal } from "@/lib/types";
import { formatMoney, getMonthsLeft } from "@/lib/utils";

type GoalCardProps = {
  goal: Goal;
  onUpdate: (data: {
    name: string;
    targetAmount: number; // euros
    currentAmount: number; // euros
    targetDate: string; // yyyy-mm-dd
  }) => Promise<void>;
  onDelete: () => Promise<void>;
  setError?: (msg: string | null) => void;
};

export function GoalCard({
  goal,
  onUpdate,
  onDelete,
  setError,
}: GoalCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState(goal.name);
  const [target, setTarget] = useState((goal.targetAmount / 100).toString());
  const [current, setCurrent] = useState((goal.currentAmount / 100).toString());
  const [date, setDate] = useState(() => {
    if (!goal.targetDate) return "";
    const d = new Date(goal.targetDate);
    return d.toISOString().slice(0, 10);
  });

  const percentage =
    goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
  const monthsLeft = getMonthsLeft(goal.targetDate);
  const Icon = Target;

  const cancelEditing = () => {
    setIsEditing(false);
    setSaving(false);
    setName(goal.name);
    setTarget((goal.targetAmount / 100).toString());
    setCurrent((goal.currentAmount / 100).toString());
    if (goal.targetDate) {
      const d = new Date(goal.targetDate);
      setDate(d.toISOString().slice(0, 10));
    } else {
      setDate("");
    }
    setError?.(null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError?.(null);

      const targetNum = parseFloat(target.replace(",", "."));
      const currentNum = current ? parseFloat(current.replace(",", ".")) : 0;

      if (Number.isNaN(targetNum) || targetNum <= 0) {
        setError?.("Please enter a valid target amount.");
        setSaving(false);
        return;
      }

      if (Number.isNaN(currentNum) || currentNum < 0) {
        setError?.("Please enter a valid current amount.");
        setSaving(false);
        return;
      }

      if (!date) {
        setError?.("Please select a target date.");
        setSaving(false);
        return;
      }

      await onUpdate({
        name,
        targetAmount: targetNum,
        currentAmount: currentNum,
        targetDate: date,
      });

      setIsEditing(false);
    } catch (err: any) {
      console.error("Error updating goal:", err);
      setError?.(err.message ?? "Failed to update goal");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this goal?"
    );
    if (!confirmDelete) return;

    try {
      setError?.(null);
      await onDelete();
    } catch (err: any) {
      console.error("Error deleting goal:", err);
      setError?.(err.message ?? "Failed to delete goal");
    }
  };

  return (
    <Card className="p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          {isEditing ? (
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="font-semibold text-lg"
            />
          ) : (
            <h3 className="font-semibold text-lg">{goal.name}</h3>
          )}
        </div>

        {/* Body */}
        {isEditing ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">
                  Target amount
                </label>
                <Input
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  type="number"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">
                  Current amount
                </label>
                <Input
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  type="number"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">
                Target date
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>

            {/* Amount */}
            <p className="text-sm text-muted-foreground">
              {formatMoney(goal.currentAmount, goal.currency)} /{" "}
              {formatMoney(goal.targetAmount, goal.currency)}
            </p>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm font-medium text-primary">
          {monthsLeft !== null
            ? `${monthsLeft} months left to goal`
            : "No target date set"}
        </p>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={cancelEditing}
                disabled={saving}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                variant="default"
                size="icon"
                onClick={handleSave}
                disabled={saving}
              >
                <Check className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
