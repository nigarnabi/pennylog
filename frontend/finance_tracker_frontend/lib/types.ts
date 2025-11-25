export type Account = {
  id: number;
  name: string;
  description: string | null;
  type: string;
  currency: string;
  currentBalance: number;
  spentThisMonth?: number;
};

export type Goal = {
  id: number;
  name: string;
  targetAmount: number; // cents
  currentAmount: number; // cents
  currency: string;
  targetDate: string | null; // ISO string or null
};
