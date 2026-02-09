import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { DashboardService } from "../services/dashboard.service";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Loading } from "../../../components/ui/Loading";
import { ErrorState } from "../../../components/ui/ErrorState";
import { MonthlyChart } from "../components/MonthlyChart";
import { TransactionsService } from "../../transactions/services/transactions.service";
import { SummaryCards } from "../components/SummaryCards";
import type { MonthlyDashboard } from "../types";
import { HistoryTimeline } from "../components/HistoryTimeline";
import { GrowthCompare } from "../components/GrowthCompare";
import { TrendIndicator } from "../components/TrendIndicator";
import { FinancialIndicators } from "../components/FinancialIndicators";
import { ProjectionChart } from "../components/ProjectionChart";
import { CapitalCurve } from "../components/CapitalCurve";

function getCurrentYearMonth() {
  const d = new Date();
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}

export default function DashboardPage() {
  const now = getCurrentYearMonth();
  const [year, setYear] = useState(now.year);
  const [month, setMonth] = useState(now.month);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboard", year, month],
    queryFn: () => DashboardService.getMonthly(year, month),
  });

  const { data: transactions } = useQuery({
    queryKey: ["transactions", month],
    queryFn: () => TransactionsService.getByMonth(month),
  });

  
  const { data: historyRaw } = useQuery({
    queryKey: ["dashboard-history"],
    queryFn: () => DashboardService.getHistory(),
  });

  const history = historyRaw.map((m: MonthlyDashboard) => ({
    ...m,
    income: m.totalIncome,
    expense: m.totalExpense,
  })) || [];
  
  console.log("DASHBOARD RAW:", data);
  console.log("HISTORY:", history);

  // const trend = data && data.balance > 0 ? "up" : "down";

  const income = transactions?.filter(t => t.type === 1)
    .reduce((acc, t) => acc + t.amount, 0) || 0;

  const expense = transactions?.filter(t => t.type === 2)
    .reduce((acc, t) => acc + t.amount, 0) || 0;

  const investment = transactions?.filter(t => t.type === 3)
    .reduce((acc, t) => acc + t.amount, 0) || 0;

  const closeMonthMutation = useMutation({
    mutationFn: () => DashboardService.closeMonth(year, month),
    onSuccess: () => refetch(),
  });

  const exportMutation = useMutation({
    mutationFn: () => DashboardService.exportCSV(6),
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mywallet-export.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState text="Erro ao carregar dashboard" />;

  return (
    <div className="space-y-4">
      {/* Filtro */}
      <Card>
        <div className="flex gap-3 items-end">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Ano</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="border p-2 rounded w-28"
              aria-label="Ano"
              title="Ano"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Mês</label>
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="border p-2 rounded w-20"
              min={1}
              max={12}
              aria-label="Mês"
              title="Mês"
            />
          </div>

          <Button onClick={() => refetch()}>Atualizar</Button>
        </div>
      </Card>

      {data && <SummaryCards data={data} />}

      {transactions && (
        <MonthlyChart 
          income={income} 
          expense={expense} 
          investment={investment} 
        />
      )}

      {history.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <HistoryTimeline history={history} />
          <GrowthCompare history={history} />
          <TrendIndicator history={history} />
        </div>
      )}

      {data && transactions && (
        <FinancialIndicators
          income={income}
          expense={expense}
          investment={investment}
          balance={data.balance}
        />
      )}

      {data && (
        <ProjectionChart
          income={income}
          expense={expense}
          balance={data.balance}
        />
      )}

      {history.length > 0 && (
        <CapitalCurve
          history={history.map(h => ({
            label: `${h.month}/${h.year}`,
            balance: h.balance
          }))}
        />
      )}

      {/* Ações */}
      <div className="flex gap-3">
        <Button onClick={() => closeMonthMutation.mutate()}>
          Fechar mês
        </Button>

        <Button onClick={() => exportMutation.mutate()}>
          Exportar CSV
        </Button>
      </div>
    </div>
  );
}
