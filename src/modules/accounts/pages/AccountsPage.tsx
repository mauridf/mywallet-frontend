import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AccountsService } from "../services/accounts.service";
import type { Account } from "../types";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Loading } from "../../../components/ui/Loading";
import { EmptyState } from "../../../components/ui/EmptyState";
import { ErrorState } from "../../../components/ui/ErrorState";

export default function AccountsPage() {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [editing, setEditing] = useState<Account | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["accounts"],
    queryFn: AccountsService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: AccountsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      setName("");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      AccountsService.update(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      setEditing(null);
      setName("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: AccountsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  const handleSubmit = () => {
    if (!name.trim()) return;

    if (editing) {
      updateMutation.mutate({ id: editing.id, name });
    } else {
      createMutation.mutate({ name });
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState text="Erro ao carregar contas" />;

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-bold mb-3">
          {editing ? "Editar conta" : "Nova conta"}
        </h2>

        <div className="flex gap-2">
          <Input
            placeholder="Nome da conta"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleSubmit}>
            {editing ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="font-bold mb-3">Minhas contas</h2>

        {data?.length === 0 && <EmptyState text="Nenhuma conta cadastrada" />}

        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Nome</th>
              <th className="text-left p-2">Saldo</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((acc) => (
              <tr key={acc.id} className="border-b">
                <td className="p-2">{acc.name}</td>
                <td className="p-2">R$ {acc.balance.toFixed(2)}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <Button
                    onClick={() => {
                      setEditing(acc);
                      setName(acc.name);
                    }}
                  >
                    Editar
                  </Button>

                  <Button
                    onClick={() => deleteMutation.mutate(acc.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
