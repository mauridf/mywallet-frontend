import { Card } from "../../../components/ui/Card";

type Props = {
  current: number;
  previous: number;
};

export function MonthComparison({ current, previous }: Props) {
  const diff = current - previous;
  const percent = previous !== 0 ? (diff / previous) * 100 : 0;

  const isPositive = diff >= 0;

  return (
    <Card>
      <div className="text-sm text-gray-500">Comparativo mensal</div>
      <div className={`text-2xl font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? "+" : ""}{percent.toFixed(1)}%
      </div>
      <div className="text-sm text-gray-400">
        {isPositive ? "Crescimento" : "Queda"} em relação ao mês anterior
      </div>
    </Card>
  );
}
