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
import { IDespesas } from "@/lib/types";
import { useEffect, useState } from "react";

interface DespesasProps {
  despesaId: string;
  despesas: IDespesas[]; // Recebe a lista de despesas como prop
}

export default function DialogInformacoesDespesas({
  despesaId,
  despesas = [], // Define um valor padrão para despesas
}: DespesasProps) {
  // Filtra a despesa específica pelo ID
  const despesa = despesas.find((d) => d.id === despesaId);

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
          {despesa ? (
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
                  <h2 className="font-bold">Centro de Custo:</h2>
                  <p>{despesa.centroCusto}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Número do Documento:</h2>
                  <p>{despesa.numeroDocumento}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Responsável:</h2>
                  <p>{despesa.responsavel?.nome}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Data de Vencimento:</h2>
                  <p>{despesa.vencimento}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Pago:</h2>
                  <p>{despesa.pago ? "Sim" : "Não"}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Valor Total:</h2>
                  <p>R$ {despesa.valorTotal.toFixed(2)}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Valor Parcial:</h2>
                  <p>R$ {despesa.valorParcial.toFixed(2)}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Forma Pagamento:</h2>
                  <p>{despesa.formaPagamento}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <h2 className="font-bold">Viagem Saída:</h2>
                    <p>{despesa.viagem.rota.saida.cidadeSaida}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <h2 className="font-bold">Viagem Retorno:</h2>
                    <p>{despesa.viagem.rota.retorno.cidadeSaida}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Despesa não encontrada.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
