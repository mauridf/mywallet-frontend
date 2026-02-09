import { Card } from "../../../components/ui/Card";

type Props = { savingRate: number };

export function SavingRateCard({ savingRate }: Props) {
  return (
    <Card>
      <div className="text-sm text-gray-500">Saving Rate</div>
      <div className="text-xl font-bold text-green-600">
        {savingRate.toFixed(1)}%
      </div>
    </Card>
  );
}
