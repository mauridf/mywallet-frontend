import { api } from "../../../services/api";
import type { CreateTransactionRequest, Transaction } from "../types";

export const TransactionsService = {
  create: async (data: CreateTransactionRequest): Promise<Transaction> => {
    const res = await api.post("api/transactions", data);
    return res.data;
  },
};
