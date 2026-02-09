import { Card } from "../../../components/ui/Card";

type Props = { score: number };

export function HealthIndexCard({ score }: Props) {
  const label =
    score > 80 ? "Excelente" :
    score > 60 ? "Bom" :
    score > 40 ? "Risco" : "Crítico";

  return (
    <Card>
      <div className="text-sm text-gray-500">Health Index</div>
      <div className="text-xl font-bold">
        {label}
      </div>
    </Card>
  );
}
