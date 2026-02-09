import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card } from "../../../components/ui/Card";
import { MonthlyDashboard } from "../types";

type Props = {
  data: MonthlyDashboard;
};

export function SummaryCards({ data }: Props) {
  return (
    <div className="grid grid-cols-5 gap-4">
      <Card className="flex items-center gap-3">
        <DollarSign className="text-green-500" />
        <div>
          <div className="text-sm text-gray-500">Receita</div>
          <div className="font-bold">R$ {data.totalIncome.toFixed(2)}</div>
        </div>
      </Card>

      <Card className="flex items-center gap-3">
        <TrendingDown className="text-red-500" />
        <div>
          <div className="text-sm text-gray-500">Despesa</div>
          <div className="font-bold">R$ {data.totalExpense.toFixed(2)}</div>
        </div>
      </Card>

      <Card className="flex items-center gap-3">
        <TrendingUp className="text-blue-500" />
        <div>
          <div className="text-sm text-gray-500">Balanço</div>
          <div className="font-bold">R$ {data.balance.toFixed(2)}</div>
        </div>
      </Card>

      <Card className="flex items-center gap-3">
        <Wallet className="text-purple-500" />
        <div>
          <div className="text-sm text-gray-500">Mês/Ano</div>
          <div className="font-bold">
            {data.month}/{data.year}
          </div>
        </div>
      </Card>
    </div>
  );
}
