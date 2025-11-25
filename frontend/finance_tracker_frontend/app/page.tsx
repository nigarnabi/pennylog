"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/main/navbar";
import HeroSection from "@/components/main/heroSection";
import FinancialGoalsSection from "@/components/main/financialGoals";
import SpendingSection from "@/components/main/spending";
import SubscriptionsSection from "@/components/main/subscriptions";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`,
          {
            credentials: "include",
          }
        );
        if (res.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);
  return (
    <main className="bg-background text-foreground">
      <Navbar isLoggedIn={isLoggedIn} />
      <HeroSection />
      <FinancialGoalsSection />
      <SpendingSection />
      <SubscriptionsSection />
    </main>
  );
}
