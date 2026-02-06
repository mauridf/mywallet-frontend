import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { TransactionsService } from "../services/transactions.service";
import { AccountsService } from "../../accounts/services/accounts.service";
import type { TransactionType } from "../types";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Loading } from "../../../components/ui/Loading";

export default function TransactionsPage() {
  const queryClient = useQueryClient();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<TransactionType>(1);
  const [accountId, setAccountId] = useState("");

  const { data: accounts, isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: AccountsService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: TransactionsService.create,
    onSuccess: () => {
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
          >
            <option value={1}>Receita</option>
            <option value={2}>Despesa</option>
            <option value={3}>Investimento</option>
          </select>

          <select
            className="border p-2 rounded"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
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

      <Card>
        <h2 className="font-bold mb-2">Histórico</h2>
        <div className="text-sm text-gray-500">
          (Listagem entra quando GET api/transactions for conectado)
        </div>
      </Card>
    </div>
  );
}
