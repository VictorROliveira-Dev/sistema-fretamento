"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { FormEvent, useState } from "react";
import { IReceitas } from "@/lib/types";
import { api } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import loading from "@/app/assets/loading.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import editIcon from "@/app/assets/edit.svg";
interface DespesasProps {
  setReceitas: React.Dispatch<React.SetStateAction<IReceitas[]>>;
  receitas: IReceitas[];
  receita: IReceitas;
}

export default function DialogEditarReceita({
  setReceitas,
  receitas,
  receita,
}: DespesasProps) {
  const [receitaEditada, setReceitaEditada] = useState<IReceitas>(receita);
  const [editando, setEditando] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEditando(true);

    try {
      const response = await api.put(`/receita/${receita.id}`, receitaEditada);
      if (!response.data.isSucces) {
        toast(response.data.message);
      }
      const receitasAtualizadas = receitas.filter((d) => d.id !== receita.id);
      setReceitas([...receitasAtualizadas, receitaEditada]);
      toast.success("receita atualizada com sucesso");
      setEditando(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        } else {
          toast.error("Erro ao tentar atualizar receita.");
        }
      }
    } finally {
      setEditando(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 cursor-pointer transition-all">
          <Image
            src={editIcon}
            alt="Editar"
            width={25}
            className="hover:scale-110"
          />
        </span>
      </DialogTrigger>
      <DialogContent className="md:w-[850px] h-screen md:h-auto flex flex-col items-center overflow-y-scroll md:overflow-auto">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-black">Editar Receita</DialogTitle>
        </DialogHeader>
        <fieldset className="border p-4 rounded w-full">
          <legend className="font-semibold">Informacoes</legend>
          <form
            className="w-full flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap gap-4 w-full justify-center">
              <div>
                <label htmlFor="centrocusto">Centro de Custo:</label>
                <Select
                  required
                  name="centrocusto"
                  value={receitaEditada.centroCusto}
                  onValueChange={(value) =>
                    setReceitaEditada({ ...receitaEditada, centroCusto: value })
                  }
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Centro de Custo</SelectLabel>
                      <SelectItem value="terceiros">Terceiros</SelectItem>
                      <SelectItem value="multas">Multas</SelectItem>
                      <SelectItem value="viagens">Viagens</SelectItem>
                      <SelectItem value="estacionamento">
                        Estacionamento
                      </SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="dataPagamento">Data Pagamento:</label>
                <Input
                  type="date"
                  name="dataPagamento"
                  className="border-2 font-medium w-[250px]"
                  value={receitaEditada.dataPagamento}
                  onChange={(e) =>
                    setReceitaEditada({
                      ...receitaEditada,
                      dataPagamento: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="vencimento">Data Vencimento:</label>
                <Input
                  type="date"
                  name="vencimento"
                  className="border-2 font-medium w-[250px]"
                  value={receitaEditada.vencimento}
                  onChange={(e) =>
                    setReceitaEditada({
                      ...receitaEditada,
                      vencimento: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="valorTotal">Valor Total:</label>
                <Input
                  type="number"
                  name="valorTotal"
                  placeholder="Digite o valor..."
                  className="border-2 font-medium w-[250px]"
                  value={
                    receitaEditada.valorTotal === 0
                      ? ""
                      : receitaEditada.valorTotal
                  }
                  onChange={(e) =>
                    setReceitaEditada({
                      ...receitaEditada,
                      valorTotal: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div>
                <label htmlFor="formaPagamento">Forma Pagamento:</label>
                <Select
                  required
                  name="formaPagamento"
                  value={receitaEditada.formaPagamento}
                  onValueChange={(value) =>
                    setReceitaEditada({
                      ...receitaEditada,
                      formaPagamento: value,
                    })
                  }
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Selecione a forma..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Pagamentos</SelectLabel>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="credito">Cartão Crédito</SelectItem>
                      <SelectItem value="debito">Cartão Débito</SelectItem>
                      <SelectItem value="dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="documento">Numero documento:</label>
                <Input
                  type="text"
                  name="documento"
                  placeholder="Digite o valor..."
                  className="border-2 font-medium w-[250px]"
                  value={receitaEditada.numeroDocumento}
                  onChange={(e) =>
                    setReceitaEditada({
                      ...receitaEditada,
                      numeroDocumento: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter className="flex items-center gap-2 mt-10">
              <Button type="submit" className="w-[250px]">
                {editando ? (
                  <Image
                    src={loading}
                    alt="loading"
                    className="text-center animate-spin"
                  />
                ) : (
                  "Salvar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </fieldset>
      </DialogContent>
    </Dialog>
  );
}
