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

export function TrendIndicator({ history }: Props) {
  if (history.length < 3) return null;

  const balances = history.map(h => h.balance);
  const trendUp = balances[balances.length - 1] > balances[balances.length - 2];

  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <h3 className="font-semibold mb-2">Tendência financeira</h3>

      <div className={`text-lg font-bold ${trendUp ? "text-green-600" : "text-red-600"}`}>
        {trendUp ? "Tendência positiva 📈" : "Tendência negativa 📉"}
      </div>
    </div>
  );
}
