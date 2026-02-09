import { Card } from "../../../components/ui/Card";

type Props = { runway: number };

export function RunwayCard({ runway }: Props) {
  return (
    <Card>
      <div className="text-sm text-gray-500">Runway</div>
      <div className="text-xl font-bold">
        {Number.isFinite(runway) ? `${runway.toFixed(1)} meses` : "∞"}
      </div>
    </Card>
  );
}
