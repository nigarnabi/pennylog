"use client";

import { useState } from "react";
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

export default function AccountsPage() {
  const [editingBalance, setEditingBalance] = useState(false);
  const [balance, setBalance] = useState("$0.00");

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
                CASH
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                My cash account
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditingBalance(!editingBalance)}
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
            </div>
          </div>

          {/* Balance */}
          <div className="mb-8">
            {editingBalance ? (
              <Input
                type="text"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="text-2xl font-semibold"
                autoFocus
              />
            ) : (
              <p className="text-4xl font-semibold">{balance}</p>
            )}
          </div>

          {/* Stats */}
          <div className="space-y-3 pt-6 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Spent (this month)</span>
              <span className="font-medium">$340.50</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Account type</span>
              <span className="font-medium">DEBIT</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
