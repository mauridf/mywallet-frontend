import { Card } from "../../../components/ui/Card";

type Props = { burnRate: number };

export function BurnRateCard({ burnRate }: Props) {
  return (
    <Card>
      <div className="text-sm text-gray-500">Burn Rate</div>
      <div className="text-xl font-bold text-red-600">
        R$ {burnRate.toFixed(2)}/mês
      </div>
    </Card>
  );
}
