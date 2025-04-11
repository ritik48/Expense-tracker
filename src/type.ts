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

export type PendingQueueItem =
  | { type: "add"; item: ExpenseItem }
  | { type: "update"; item: ExpenseItem }
  | { type: "delete"; id: string };

export type Sync = {
  isOnline: boolean;
  syncStatus: "syncing" | "synced" | "error";
};
