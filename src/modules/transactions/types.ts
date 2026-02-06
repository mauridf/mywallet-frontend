export const TransactionType = {
  Income: 1,
  Expense: 2,
  Investment: 3,
} as const;

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  accountId: string;
  createdAt: string;
};

export type CreateTransactionRequest = {
  description: string;
  amount: number;
  type: TransactionType;
  accountId: string;
};
