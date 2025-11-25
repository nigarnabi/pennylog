import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleLogout = async (): Promise<void> => {
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};
export function formatMoney(cents: number, currency = "EUR") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format((cents || 0) / 100);
}

export function getMonthsLeft(targetDate: string | null): number | null {
  if (!targetDate) return null;
  const now = new Date();
  const target = new Date(targetDate);
  if (Number.isNaN(target.getTime())) return null;

  const yearsDiff = target.getFullYear() - now.getFullYear();
  const monthsDiff = target.getMonth() - now.getMonth();
  const totalMonths = yearsDiff * 12 + monthsDiff;

  return totalMonths >= 0 ? totalMonths : 0;
}
