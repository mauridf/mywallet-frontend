import { api } from "../../../services/api";
import type { ClosingSnapshot } from "../types";

export const ClosingService = {
  closeMonth: async (year: number, month: number): Promise<ClosingSnapshot> => {
    const res = await api.post("api/dashboard/close-month", null, {
      params: { year, month },
    });
    return res.data;
  },
};
