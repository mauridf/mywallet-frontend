import { Card } from "../../../components/ui/Card";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>Saldo Total</Card>
      <Card>Receita Mensal</Card>
      <Card>Despesa Mensal</Card>
      <Card>Balanço</Card>

      <div className="col-span-4">
        <Card>Gráfico mensal</Card>
      </div>

      <div className="col-span-4">
        <Card>Histórico</Card>
      </div>
    </div>
  );
}
