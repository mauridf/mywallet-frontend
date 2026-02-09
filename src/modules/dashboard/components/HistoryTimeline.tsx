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

export function HistoryTimeline({ history }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <h3 className="font-semibold mb-3">Evolução mensal</h3>

      <div className="space-y-2">
        {history.map((m, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span>{m.month}/{m.year}</span>
            <span className="text-green-600">+ R$ {m.totalIncome}</span>
            <span className="text-red-600">- R$ {m.totalExpense}</span>
            <span className="font-semibold">R$ {m.balance}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
