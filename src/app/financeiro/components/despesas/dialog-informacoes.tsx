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
import { IDespesas, Motorista } from "@/lib/types";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

interface DespesasProps {
  despesaId: string;
}

export default function DialogInformacoesDespesas({
  despesaId,
}: DespesasProps) {
  const [despesas, setDespesas] = useState<IDespesas[]>([]);

  useEffect(() => {
    if (!despesaId) return;

    const fetchDespesa = async () => {
      try {
        const response = await api.get(`/despesa/${despesaId}`);
        setDespesas(response.data.data ? [response.data.data] : []);
      } catch (error) {
        console.log("Erro ao buscar despesas:", error);
      }
    };

    fetchDespesa();
  }, [despesaId]);

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
      <DialogContent className="md:w-[800px]">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-bold text-center">
            Mais Informações
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-around">
          {despesas.map((despesa) => (
            <div key={despesa.id}>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <h2 className="font-bold">Data Emissão:</h2>
                  <p>
                    {new Date(despesa.dataEmissao).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Data Compra:</h2>
                  <p>
                    {new Date(despesa.dataCompra).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Origem do Pagamento:</h2>
                  <p>{despesa.origemPagamento}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Número do Documento:</h2>
                  <p>{despesa.numeroDocumento}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Responsável:</h2>
                  <p>{despesa.responsavelNome}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Data de Vencimento:</h2>
                  <p>{despesa.vencimento}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Pago:</h2>
                  <p>{despesa.pago}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Valor Total:</h2>
                  <p>{despesa.valorTotal}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Valor Parcial:</h2>
                  <p>{despesa.valorParcial}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Forma Pagamento:</h2>
                  <div className="flex gap-2">
                    <p>{despesa.centroCusto}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <h2 className="font-bold">Viagem:</h2>
                    <p>{despesa.viagemId}</p>
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
