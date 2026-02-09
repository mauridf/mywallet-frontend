type Props = {
  income: number;
  expense: number;
  investment: number;
  balance: number;
};

export function FinancialIndicators({ income, expense, investment, balance }: Props) {
  const burnRate = expense;
  const savingRate = income > 0 ? ((income - expense) / income) * 100 : 0;
  const runway = burnRate > 0 ? balance / burnRate : Infinity;

  const score =
    (savingRate > 20 ? 30 : 10) +
    (runway > 6 ? 30 : 10) +
    (income > expense ? 20 : 0) +
    (investment > 0 ? 20 : 0);

  return (
    <div className="grid grid-cols-5 gap-4">
      <RunwayCard runway={runway} />
      <BurnRateCard burnRate={burnRate} />
      <SavingRateCard savingRate={savingRate} />
      <FinancialScoreCard score={score} />
      <HealthIndexCard score={score} />
    </div>
  );
}
