import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Manutencao } from "@/lib/types";
import {
  Wrench,
  Calendar,
  Gauge,
  Clock,
  Tag,
  DollarSign,
  Car,
} from "lucide-react";

import Image from "next/image";
import documentoIcon from "@/app/assets/dadosviagem.svg";

interface ManutencaoDialogProps {
  manutencao: Manutencao;
}

export function DialogInfo({ manutencao }: ManutencaoDialogProps) {
  const formatDate = (date: string) => new Date(date).toLocaleDateString();
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
          <Image
            src={documentoIcon}
            alt="documento"
            width={25}
            className="hover:scale-110"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Wrench className="h-5 w-5" />
            Manutenção #{manutencao ? manutencao.id : ""}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Informações Principais */}
            <section>
              <h3 className="text-lg font-semibold mb-3">
                Informações Principais
              </h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span>Tipo: {manutencao ? manutencao.tipo : " "}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Custo: {manutencao ? formatCurrency(manutencao.custo) : ""}
                  </span>
                </div>
              </div>
            </section>

            <Separator />

            {/* Datas */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Datas</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Lançamento:{" "}
                    {manutencao ? formatDate(manutencao.dataLancamento) : " "}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Vencimento:{" "}
                    {manutencao ? formatDate(manutencao.dataVencimento) : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Realizada:{" "}
                    {manutencao ? formatDate(manutencao.dataRealizada) : ""}
                  </span>
                </div>
              </div>
            </section>

            <Separator />

            {/* Quilometragem */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Quilometragem</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <span>
                    KM Atual:{" "}
                    {manutencao ? manutencao.kmAtual.toLocaleString() : ""} km
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <span>
                    KM Prevista:{" "}
                    {manutencao ? manutencao.kmPrevista.toLocaleString() : ""}{" "}
                    km
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <span>
                    KM Realizada:{" "}
                    {manutencao ? manutencao.kmRealizada.toLocaleString() : ""}{" "}
                    km
                  </span>
                </div>
              </div>
            </section>

            <Separator />

            {/* IDs Relacionados */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Referências</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Serviço:{" "}
                    {manutencao.servico ? manutencao.servico.nomeServico : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Veículo:{" "}
                    {manutencao.veiculo ? manutencao.veiculo.prefixo : ""} -{" "}
                    {manutencao.veiculo ? manutencao.veiculo.placa : ""}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}