import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { Card } from "../../../components/ui/Card";

type Props = {
  income: number;
  expense: number;
  investment: number;
};

export function MonthlyChart({ income, expense, investment }: Props) {
  const data = [
    { name: "Receita", value: income },
    { name: "Despesa", value: expense },
    { name: "Investimento", value: investment },
  ];

  return (
    <Card className="h-[320px]">
      <div className="text-sm text-gray-500 mb-2">Fluxo mensal</div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
