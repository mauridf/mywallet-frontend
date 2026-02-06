export enum TransactionType {
  Income = 1,
  Expense = 2,
  Investment = 3,
}

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  createdAt: string;
};

export type CreateTransactionRequest = {
  description: string;
  amount: number;
  type: TransactionType;
  accountId: string;
};
