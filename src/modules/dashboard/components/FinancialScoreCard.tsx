import { Card } from "../../../components/ui/Card";

type Props = { score: number };

export function FinancialScoreCard({ score }: Props) {
  return (
    <Card>
      <div className="text-sm text-gray-500">Score financeiro</div>
      <div className="text-xl font-bold">
        {score}/100
      </div>
    </Card>
  );
}
