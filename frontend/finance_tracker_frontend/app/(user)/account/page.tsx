"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Account } from "@/lib/types";
import { formatMoney } from "@/lib/utils";

export default function AccountsPage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingBalance, setEditingBalance] = useState(false);
  const [balanceInput, setBalanceInput] = useState(""); // human-readable (e.g. "123.45")
  const [savingBalance, setSavingBalance] = useState(false);

  // Fetch account on mount
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts`,
          {
            credentials: "include",
          }
        );

        if (res.status === 401) {
          setError("You are not signed in.");
          setAccount(null);
          return;
        }

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to load account");
        }

        const data = await res.json();
        setAccount(data);
      } catch (err: any) {
        console.error("Error loading account:", err);
        setError(err.message ?? "Failed to load account");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);

  const startEditingBalance = () => {
    if (!account) return;
    // convert cents → string in currency units
    const value = (account.currentBalance || 0) / 100;
    setBalanceInput(value.toFixed(2));
    setError(null);
    setEditingBalance(true);
  };

  const cancelEditingBalance = () => {
    setEditingBalance(false);
    setError(null);
  };

  const saveBalance = async () => {
    if (!account) return;
    const parsed = parseFloat(balanceInput.replace(",", "."));
    if (Number.isNaN(parsed)) {
      setError("Please enter a valid number for balance.");
      return;
    }

    const newCents = Math.round(parsed * 100);

    try {
      setSavingBalance(true);
      setError(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/accounts`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ currentBalance: newCents }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to update balance");
      }

      const updated = await res.json();
      setAccount((prev) => (prev ? { ...prev, ...updated } : updated));
      setEditingBalance(false);
    } catch (err: any) {
      console.error("Error updating balance:", err);
      setError(err.message ?? "Failed to update balance");
    } finally {
      setSavingBalance(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <p className="text-sm text-muted-foreground">Loading account...</p>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="p-6 lg:p-8">
        <h1 className="text-3xl font-semibold mb-4">Accounts</h1>
        <p className="text-sm text-muted-foreground">
          {error || "No account found for this user."}
        </p>
      </div>
    );
  }

  const balanceDisplay = formatMoney(account.currentBalance, account.currency);
  const spentDisplay = formatMoney(
    account.spentThisMonth ?? 0,
    account.currency
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-balance">Accounts</h1>
      </div>

      <div className="flex justify-center">
        <Card className="w-full max-w-md p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                {account.name || "CASH"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {account.description || "My cash account"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {editingBalance ? (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={cancelEditingBalance}
                    disabled={savingBalance}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={saveBalance}
                    disabled={savingBalance}
                  >
                    {savingBalance ? "Saving..." : "Save"}
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={startEditingBalance}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Account</DropdownMenuItem>
                      <DropdownMenuItem>Delete Account</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>

          {/* Balance */}
          <div className="mb-4">
            {editingBalance ? (
              <Input
                type="text"
                value={balanceInput}
                onChange={(e) => setBalanceInput(e.target.value)}
                className="text-2xl font-semibold"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    saveBalance();
                  }
                }}
              />
            ) : (
              <p className="text-4xl font-semibold">{balanceDisplay}</p>
            )}
          </div>

          {error && (
            <p className="text-xs text-red-600 mb-2" role="alert">
              {error}
            </p>
          )}

          {/* Stats */}
          <div className="space-y-3 pt-6 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Spent (this month)</span>
              <span className="font-medium">{spentDisplay}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Account type</span>
              <span className="font-medium">{account.type}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
