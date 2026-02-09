export type HistoryItem = {
  year: number;
  month: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

type Props = {
  history: HistoryItem[];
};

export function GrowthCompare({ history }: Props) {
  if (history.length < 2) return null;

  const last = history[history.length - 1];
  const prev = history[history.length - 2];

  const growth = ((last.balance - prev.balance) / prev.balance) * 100;

  const isUp = growth >= 0;

  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <h3 className="font-semibold mb-2">Comparativo mensal</h3>

      <div className={`text-xl font-bold ${isUp ? "text-green-600" : "text-red-600"}`}>
        {isUp ? "▲" : "▼"} {growth.toFixed(2)}%
      </div>

      <div className="text-sm text-gray-500">
        {isUp ? "Crescimento financeiro" : "Queda financeira"}
      </div>
    </div>
  );
}
