import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "../../../components/ui/Card";

type Props = {
  trend: "up" | "down";
};

export function TrendIndicator({ trend }: Props) {
  return (
    <Card className="flex items-center gap-3">
      {trend === "up" ? (
        <TrendingUp className="text-green-600" />
      ) : (
        <TrendingDown className="text-red-600" />
      )}
      <div>
        <div className="text-sm text-gray-500">Tendência</div>
        <div className="font-bold">
          {trend === "up" ? "Crescimento financeiro" : "Queda financeira"}
        </div>
      </div>
    </Card>
  );
}
