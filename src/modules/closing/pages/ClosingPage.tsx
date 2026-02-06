import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ClosingService } from "../services/closing.service";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";

function getNow() {
  const d = new Date();
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}

export default function ClosingPage() {
  const now = getNow();
  const [year, setYear] = useState(now.year);
  const [month, setMonth] = useState(now.month);

  const mutation = useMutation({
    mutationFn: () => ClosingService.closeMonth(year, month),
  });

  return (
    <div className="space-y-4">

      <Card>
        <h2 className="font-bold mb-3">Fechamento Mensal</h2>

        <div className="flex gap-3 items-end">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Ano</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="border p-2 rounded w-28"
              aria-label="Ano"
              title="Ano"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Mês</label>
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="border p-2 rounded w-20"
              min={1}
              max={12}
              aria-label="Mês"
              title="Mês"
            />
          </div>

          <Button onClick={() => mutation.mutate()}>
            Fechar mês
          </Button>
        </div>
      </Card>

      {mutation.data && (
        <Card>
          <h3 className="font-bold mb-2">Snapshot do Fechamento</h3>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500">Receita</div>
              <div className="font-bold text-green-600">
                R$ {mutation.data.totalIncome.toFixed(2)}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Despesa</div>
              <div className="font-bold text-red-600">
                R$ {mutation.data.totalExpense.toFixed(2)}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Balanço</div>
              <div className="font-bold">
                R$ {mutation.data.balance.toFixed(2)}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Período</div>
              <div className="font-bold">
                {mutation.data.month}/{mutation.data.year}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
