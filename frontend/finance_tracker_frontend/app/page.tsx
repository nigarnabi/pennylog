"use client";

import { useState } from "react";
import Navbar from "@/components/main/navbar";
import HeroSection from "@/components/main/heroSection";
import FinancialGoalsSection from "@/components/main/financialGoals";
import SpendingSection from "@/components/main/spending";
import SubscriptionsSection from "@/components/main/subscriptions";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <FinancialGoalsSection />
      <SpendingSection />
      <SubscriptionsSection />
    </main>
  );
}
