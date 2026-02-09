import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../../../components/ui/Card";

type Props = {
  income: number;
  expense: number;
  balance: number;
};

export function ProjectionChart({ income, expense, balance }: Props) {
  const delta = income - expense;

  const data = [
    { label: "Atual", value: balance },
    { label: "3m", value: balance + delta * 3 },
    { label: "6m", value: balance + delta * 6 },
    { label: "12m", value: balance + delta * 12 },
  ];

  return (
    <Card className="h-[320px]">
      <div className="text-sm text-gray-500 mb-2">Projeção financeira</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#22c55e" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
