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
import { api } from "@/lib/axios";
import { Despesa, Viagem } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import loading from "@/app/assets/loading.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
interface ViagemResponse {
  viagem: Viagem;
  despesas: Despesa[];
  totalDespesa: number;
  valorPago: number;
  valorLiquidoViagem: number;
}

interface AdicionarProps {
  receitaId: number;
  viagemResponse: ViagemResponse;
  setViagemResponse: React.Dispatch<React.SetStateAction<ViagemResponse>>;
}

export function AdicionarPagamento({
  receitaId,
  viagemResponse,
  setViagemResponse,
}: AdicionarProps) {
  const router = useRouter();
  const [dataPagamento, setDataPagamento] = useState<string>();
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [carregando, setCarregando] = useState<boolean>(false);

  async function gerarPagamento(e: React.FormEvent) {
    e.preventDefault();
    try {
      setCarregando(true);
      if (valorTotal <= 0) {
        toast("digite um valor valido para o pagamento");
      }

      const response = await api.post("/pagamento", {
        valorPago: valorTotal,
        dataPagamento: dataPagamento,
        receitaId: receitaId,
      });

      if (!response.data.isSucces) {
        toast("erro ao tentar gerar pagamento");
      }

      if (viagemResponse.viagem.receita) {
        setViagemResponse({
          ...viagemResponse,
          viagem: {
            ...viagemResponse.viagem,
            receita: {
              ...viagemResponse.viagem.receita,
              pagamentos: [
                ...viagemResponse.viagem.receita?.pagamentos,
                response.data.data,
              ],
            },
          },
          valorPago: viagemResponse.valorPago + valorTotal,
        });
      }

      toast("pagamento adicionado com sucesso");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
    } finally {
      setCarregando(false);
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <span className="rounded-md bg-green-600 p-2 text-white cursor-pointer absolute right-2 top-2">
            Adicionar Nova
          </span>
        </DialogTrigger>
        <DialogContent className="w-max h-max overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Novo Pagamento de Viagem</DialogTitle>
          </DialogHeader>
          <section>
            <form
              onSubmit={(e) => gerarPagamento(e)}
              className="p-2 flex gap-2 items-end w-full"
            >
              <div className="flex-1">
                <Label>Valor Pago</Label>
                <Input
                  type="number"
                  value={valorTotal}
                  onChange={(e) => setValorTotal(Number(e.target.value))}
                />
              </div>
              <div className="flex-1">
                <Label>Valor Pago</Label>
                <Input
                  type="date"
                  value={dataPagamento}
                  onChange={(e) => setDataPagamento(e.target.value)}
                />
              </div>
              <Button className="bg-red-500">
                {carregando ? (
                  <Image
                    src={loading}
                    alt="carregando"
                    className="text-center animate-spin"
                  />
                ) : (
                  "Confirmar"
                )}
              </Button>
            </form>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
