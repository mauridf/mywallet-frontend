import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { TransactionsService } from "../services/transactions.service";
import { AccountsService } from "../../accounts/services/accounts.service";
import { TransactionType } from "../types";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Loading } from "../../../components/ui/Loading";
import { EmptyState } from "../../../components/ui/EmptyState";

export default function TransactionsPage() {
  const queryClient = useQueryClient();

  // form
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<TransactionType>(TransactionType.Income);
  const [accountId, setAccountId] = useState("");

  // filtros
  const [month, setMonth] = useState("");
  const [filterAccountId, setFilterAccountId] = useState("");

  const { data: accounts } = useQuery({
    queryKey: ["accounts"],
    queryFn: AccountsService.getAll,
  });

  const {
    data: transactions,
    isLoading,
  } = useQuery({
    queryKey: ["transactions", month, filterAccountId],
    queryFn: () =>
      TransactionsService.getAll({
        month: month || undefined,
        accountId: filterAccountId || undefined,
      }),
  });

  const createMutation = useMutation({
    mutationFn: TransactionsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      setDescription("");
      setAmount(0);
    },
  });

  const handleSubmit = () => {
    if (!description || !accountId || !amount) return;

    createMutation.mutate({
      description,
      amount,
      type,
      accountId,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-4">

      {/* Criar */}
      <Card>
        <h2 className="font-bold mb-3">Nova Transação</h2>

        <div className="grid grid-cols-4 gap-3">
          <Input
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Valor"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <select
            className="border p-2 rounded"
            value={type}
            onChange={(e) => setType(Number(e.target.value) as TransactionType)}
            aria-label="Tipo de transação"
            title="Tipo de transação"
          >
            <option value={1}>Receita</option>
            <option value={2}>Despesa</option>
            <option value={3}>Investimento</option>
          </select>

          <select
            className="border p-2 rounded"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            aria-label="Conta"
            title="Conta"
          >
            <option value="">Selecione a conta</option>
            {accounts?.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3">
          <Button onClick={handleSubmit}>Criar transação</Button>
        </div>
      </Card>

      {/* Filtros */}
      <Card>
        <h2 className="font-bold mb-3">Filtros</h2>

        <div className="grid grid-cols-3 gap-3">
          <Input
            placeholder="Mês (YYYY-MM)"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            title="Filtro por mês"
            aria-label="Filtro por mês"
          />

          <select
            className="border p-2 rounded"
            value={filterAccountId}
            onChange={(e) => setFilterAccountId(e.target.value)}
            aria-label="Filtro por conta"
            title="Filtro por conta"
          >
            <option value="">Todas as contas</option>
            {accounts?.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>

          <Button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["transactions"] })
            }
          >
            Filtrar
          </Button>
        </div>
      </Card>

      {/* Histórico */}
      <Card>
        <h2 className="font-bold mb-3">Histórico</h2>

        {transactions?.length === 0 && (
          <EmptyState text="Nenhuma transação encontrada" />
        )}

        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Descrição</th>
              <th className="p-2 text-left">Valor</th>
              <th className="p-2 text-left">Tipo</th>
              <th className="p-2 text-left">Conta</th>
              <th className="p-2 text-left">Data</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="p-2">{t.description}</td>
                <td className="p-2">R$ {t.amount.toFixed(2)}</td>
                <td className="p-2">
                  {t.type === 1 && "Receita"}
                  {t.type === 2 && "Despesa"}
                  {t.type === 3 && "Investimento"}
                </td>
                <td className="p-2">{t.accountId}</td>
                <td className="p-2">
                  {new Date(t.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
