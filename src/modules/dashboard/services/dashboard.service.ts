import { api } from "../../../services/api";
import type { MonthlyDashboard } from "../types";

export const DashboardService = {
  getMonthly: async (year: number, month: number): Promise<MonthlyDashboard> => {
    const res = await api.get<MonthlyDashboard>(
      `/api/dashboard/monthly?year=${year}&month=${month}`
    );
    return res.data;
  },

  getHistory: async () => {
    const res = await api.get("api/dashboard/history");
    return res.data;
  },

  exportCSV: async (months = 6) => {
    const res = await api.get("api/dashboard/export/csv", {
      params: { months },
      responseType: "blob",
    });
    return res.data;
  },

  closeMonth: async (year: number, month: number): Promise<MonthlyDashboard> => {
    const res = await api.post("api/dashboard/close-month", null, {
      params: { year, month },
    });
    return res.data;
  },
};
