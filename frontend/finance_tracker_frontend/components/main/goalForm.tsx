"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type GoalFormProps = {
  onCreate: (data: {
    name: string;
    targetAmount: number;
    currentAmount: number;
    targetDate: string;
  }) => Promise<void>;
  setError?: (msg: string | null) => void;
};

export function GoalForm({ onCreate, setError }: GoalFormProps) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  const [date, setDate] = useState("");
  const [creating, setCreating] = useState(false);

  const handleSubmit = async () => {
    try {
      setCreating(true);
      setError?.(null);

      const targetNum = parseFloat(target.replace(",", "."));
      const currentNum = current ? parseFloat(current.replace(",", ".")) : 0;

      if (Number.isNaN(targetNum) || targetNum <= 0) {
        setError?.("Please enter a valid target amount.");
        setCreating(false);
        return;
      }

      if (Number.isNaN(currentNum) || currentNum < 0) {
        setError?.("Please enter a valid current amount.");
        setCreating(false);
        return;
      }

      if (!date) {
        setError?.("Please select a target date.");
        setCreating(false);
        return;
      }

      await onCreate({
        name,
        targetAmount: targetNum,
        currentAmount: currentNum,
        targetDate: date,
      });

      setName("");
      setTarget("");
      setCurrent("");
      setDate("");
    } catch (err: any) {
      console.error("Error creating goal:", err);
      setError?.(err.message ?? "Failed to create goal");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto p-6 mb-12">
      <h2 className="text-xl font-semibold mb-4">Create a new goal</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Down payment, New car, ..."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Target amount (e.g. 40000)
            </label>
            <Input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="40000"
              type="number"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Current amount (optional)
            </label>
            <Input
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="0"
              type="number"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Target date</label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={creating}>
            {creating ? "Creating..." : "Create goal"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
