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
import { Salario } from "@/lib/types";
import { useState } from "react";
import loadingIcon from "@/app/assets/loading.svg";
import editIcon from "@/app/assets/edit.svg";
import Image from "next/image";
import { api } from "@/lib/axios";
import { toast } from "sonner";

interface EditarSalario {
  salario: Salario;
  salarios: Salario[];
  setSalarios: React.Dispatch<React.SetStateAction<Salario[]>>;
}

export function EditarSalario({
  salario,
  salarios,
  setSalarios,
}: EditarSalario) {
  const [salarioAtualizado, setSalarioAtualizado] = useState<Salario>(salario);
  const [loading, setLoading] = useState(false);
  async function handleExpenseSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.put(
        `/despesamensal/${salario.id}`,
        salarioAtualizado
      );

      if (!response.data.isSucces) {
        toast("Erro ao tentar atualizar, tente novamente");
        return;
      }

      const salariosAtualizados = salarios.filter((d) => d.id !== salario.id);
      setSalarios([...salariosAtualizados, salarioAtualizado]);
      toast("Atualizado com sucesso");
    } catch {
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
              <Label htmlFor="DataPagamento">Dia do Vale</Label>
              <Input
                min={1}
                max={31}
                type="number"
                id="DataPagamento"
                required
                value={salarioAtualizado.diaVale}
                onChange={(e) =>
                  setSalarioAtualizado({
                    ...salarioAtualizado,
                    diaVale: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="DataPagamento">Dia do Salario</Label>
              <Input
                min={1}
                max={31}
                type="number"
                id="DataPagamento"
                required
                value={salarioAtualizado.diaSalario}
                onChange={(e) =>
                  setSalarioAtualizado({
                    ...salarioAtualizado,
                    diaSalario: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ValorTotal">Valor Salario</Label>
              <Input
                type="number"
                step="0.01"
                id="ValorTotal"
                required
                value={salarioAtualizado.valorTotal}
                onChange={(e) =>
                  setSalarioAtualizado({
                    ...salarioAtualizado,
                    valorTotal: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ValorTotal">Valor Vale</Label>
              <Input
                type="number"
                step="0.01"
                id="ValorTotal"
                required
                value={salarioAtualizado.valorVale}
                onChange={(e) =>
                  setSalarioAtualizado({
                    ...salarioAtualizado,
                    valorVale: Number(e.target.value),
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
