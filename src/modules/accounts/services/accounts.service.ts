import { api } from "../../../services/api";
import type { Account, CreateAccountRequest, UpdateAccountRequest } from "../types";

export const AccountsService = {
  getAll: async (): Promise<Account[]> => {
    const res = await api.get("api/accounts");
    return res.data;
  },

  getById: async (id: string): Promise<Account> => {
    const res = await api.get(`api/accounts/${id}`);
    return res.data;
  },

  create: async (data: CreateAccountRequest): Promise<Account> => {
    const res = await api.post("api/accounts", data);
    return res.data;
  },

  update: async (id: string, data: UpdateAccountRequest): Promise<Account> => {
    const res = await api.put(`api/accounts/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`api/accounts/${id}`);
  },
};
