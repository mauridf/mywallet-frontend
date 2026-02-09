import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { Card } from "../../../components/ui/Card";

type Props = {
  data: {
    label: string;
    income: number;
    expense: number;
    balance: number;
  }[];
};

export function EvolutionChart({ data }: Props) {
  return (
    <Card className="h-[360px]">
      <div className="text-sm text-gray-500 mb-2">Evolução financeira</div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="#22c55e" />
          <Line type="monotone" dataKey="expense" stroke="#ef4444" />
          <Line type="monotone" dataKey="balance" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
