"use client";

import { useEffect, useState, useCallback } from "react";
import type { Goal } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch goals ---
  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${BASE_URL}/goals`, {
        credentials: "include",
      });

      if (res.status === 401) {
        setError("You are not signed in.");
        setGoals([]);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to fetch goals");
      }

      const data = await res.json();
      setGoals(data);
    } catch (err: any) {
      console.error("Error fetching goals:", err);
      setError(err.message ?? "Failed to fetch goals");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  // --- Create goal ---
  async function createGoal(input: {
    name: string;
    targetAmount: number; // euros
    currentAmount: number; // euros
    targetDate: string; // yyyy-mm-dd
  }) {
    const { name, targetAmount, currentAmount, targetDate } = input;

    const body = {
      name,
      targetAmount: Math.round(targetAmount * 100),
      currentAmount: Math.round(currentAmount * 100),
      targetDate: new Date(targetDate).toISOString(),
    };

    const res = await fetch(`${BASE_URL}/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.error || "Failed to create goal");
    }

    setGoals((prev) => [...prev, data]);
    return data as Goal;
  }

  // --- Update goal ---
  async function updateGoal(
    id: number,
    input: {
      name: string;
      targetAmount: number; // euros
      currentAmount: number; // euros
      targetDate: string; // yyyy-mm-dd
    }
  ) {
    const { name, targetAmount, currentAmount, targetDate } = input;

    const body = {
      name,
      targetAmount: Math.round(targetAmount * 100),
      currentAmount: Math.round(currentAmount * 100),
      targetDate: new Date(targetDate).toISOString(),
    };

    const res = await fetch(`${BASE_URL}/goals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.error || "Failed to update goal");
    }

    setGoals((prev) => prev.map((g) => (g.id === id ? data : g)));
    return data as Goal;
  }

  // --- Delete goal ---
  async function deleteGoal(id: number) {
    const res = await fetch(`${BASE_URL}/goals/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok && res.status !== 204) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.error || "Failed to delete goal");
    }

    setGoals((prev) => prev.filter((g) => g.id !== id));
  }

  return {
    goals,
    loading,
    error,
    setError,
    createGoal,
    updateGoal,
    deleteGoal,
    refetch: fetchGoals,
  };
}
