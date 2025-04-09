export type User = {
  name: string;
  email?: string;
  password?: string;
  expiresAt: number;
};

export type ExpenseItem = {
  id: string;
  title: string;
  user: string;
  category: string;
  amount: number;
  date: string;
};
