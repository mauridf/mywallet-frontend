import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { DashboardService } from "../services/dashboard.service";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Loading } from "../../../components/ui/Loading";
import { ErrorState } from "../../../components/ui/ErrorState";
import { MonthlyChart } from "../components/MonthlyChart";
import { TransactionsService } from "../../transactions/services/transactions.service";

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

  console.log("DASHBOARD RAW:", data);

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

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <div className="text-sm text-gray-500">Receita</div>
          <div className="text-xl font-bold text-green-600">
            R$ {data?.totalIncome.toFixed(2)}
          </div>
        </Card>

        <Card>
          <div className="text-sm text-gray-500">Despesa</div>
          <div className="text-xl font-bold text-red-600">
            R$ {data?.totalExpense.toFixed(2)}
          </div>
        </Card>

        <Card>
          <div className="text-sm text-gray-500">Balanço</div>
          <div className="text-xl font-bold">
            R$ {data?.balance.toFixed(2)}
          </div>
        </Card>

        <Card>
          <div className="text-sm text-gray-500">Mês/Ano</div>
          <div className="text-xl font-bold">
            {data?.month}/{data?.year}
          </div>
        </Card>
      </div>

      {transactions && (
        <MonthlyChart 
          income={income} 
          expense={expense} 
          investment={investment} 
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
