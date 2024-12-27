import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dadosViagemIcon from "@/app/assets/dadosviagem.svg";
import Image from "next/image";
import { IReceitas } from "@/lib/types";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

interface ReceitasProps {
  receitaId: string;
}

export default function DialogInformacoesReceitas({
  receitaId,
}: ReceitasProps) {
  const [receitas, setReceitas] = useState<IReceitas[]>([]);

  useEffect(() => {
    if (!receitaId) return;

    const fetchReceita = async () => {
      try {
        const response = await api.get(`/api/receita/${receitaId}`);
        setReceitas(response.data.data ? [response.data.data] : []);
      } catch (error) {
        console.log("Erro ao buscar receitas:", error);
      }
    };

    fetchReceita();
  }, [receitaId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
          <Image
            src={dadosViagemIcon}
            alt="documento"
            width={25}
            className="hover:scale-110"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[800px]">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-bold text-center">
            Mais Informações
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-around">
          {receitas.map((receita) => (
            <div key={receita.id}>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <h2 className="font-bold">Data Emissão:</h2>
                  <p>
                    {new Date(receita.dataEmissao).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Data Compra:</h2>
                  <p>
                    {new Date(receita.dataCompra).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Origem do Pagamento:</h2>
                  <p>{receita.origemPagamento}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Número do Documento:</h2>
                  <p>{receita.numeroDocumento}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Responsável:</h2>
                  <p>{receita.responsavelId}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Data de Vencimento:</h2>
                  <p>{receita.vencimento}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Pago:</h2>
                  <p>{receita.pago}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Valor Total:</h2>
                  <p>{receita.valorTotal}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Valor Parcial:</h2>
                  <p>{receita.valorParcial}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Forma Pagamento:</h2>
                  <p>{receita.formaPagamento}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <h2 className="font-bold">Viagem:</h2>
                    <p>{receita.viagemId}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
