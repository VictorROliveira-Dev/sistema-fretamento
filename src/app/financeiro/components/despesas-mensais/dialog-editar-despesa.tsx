import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DespesaMensal } from "@/lib/types";
import { useState } from "react";
import loadingIcon from "@/app/assets/loading.svg";
import editIcon from "@/app/assets/edit.svg";
import Image from "next/image";
import { api } from "@/lib/axios";
import { toast } from "sonner";

interface EditarDespesa {
  despesa: DespesaMensal;
  despesas: DespesaMensal[];
  setDespesas: React.Dispatch<React.SetStateAction<DespesaMensal[]>>;
}

export function EditarDespesa({
  despesa,
  despesas,
  setDespesas,
}: EditarDespesa) {
  const [despesaAtualizada, setDespesaAtualizada] =
    useState<DespesaMensal>(despesa);
  const [loading, setLoading] = useState(false);
  async function handleExpenseSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.put(
        `/despesamensal/despesamensal/${despesa.id}`,
        despesaAtualizada
      );

      if (!response.data.isSucces) {
        toast("Erro ao tentar atualizar, tente novamente");
        return;
      }

      const despesasAtualizadas = despesas.filter((d) => d.id !== despesa.id);
      setDespesas([...despesasAtualizadas, despesaAtualizada]);
      toast("atualizado com sucesso");
    } catch (error) {
      toast("Erro ao tentar atualizar, tente novamente");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 transition-all cursor-pointer">
            <Image
              className="w-10 md:w-6"
              src={editIcon}
              alt="Editar"
              width={25}
            />
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Registrar Nova Despesa Mensal</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => handleExpenseSubmit(e)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="DataPagamento">Data de Pagamento</Label>
              <Input
                min={1}
                max={31}
                type="number"
                id="DataPagamento"
                required
                value={despesaAtualizada.diaPagamento}
                onChange={(e) =>
                  setDespesaAtualizada({
                    ...despesaAtualizada,
                    diaPagamento: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ValorTotal">Valor Total</Label>
              <Input
                type="number"
                step="0.01"
                id="ValorTotal"
                required
                value={despesaAtualizada.valorTotal}
                onChange={(e) =>
                  setDespesaAtualizada({
                    ...despesaAtualizada,
                    valorTotal: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="CentroDeCusto">Centro de Custo</Label>
              <Input
                id="CentroDeCusto"
                required
                value={despesaAtualizada.centroDeCusto}
                onChange={(e) =>
                  setDespesaAtualizada({
                    ...despesaAtualizada,
                    centroDeCusto: e.target.value,
                  })
                }
              />
            </div>

            <Button type="submit">
              {loading ? (
                <Image
                  src={loadingIcon}
                  alt="loading"
                  className="text-center animate-spin"
                />
              ) : (
                "Salvar"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
