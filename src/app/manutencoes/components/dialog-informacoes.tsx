"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Despesa, Manutencao } from "@/lib/types";
import {
  Wrench,
  Calendar,
  Gauge,
  Clock,
  Tag,
  DollarSign,
  Car,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Info {
  manutencao: Manutencao;
  onClose: () => void;
}

export function DialogInfo({ manutencao, onClose }: Info) {
  const [despesa, setDespesa] = useState<Despesa | null>();
  const router = useRouter();
  const formatDate = (date: string) => new Date(date).toLocaleDateString();
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function fetch() {
    try {
      const response = await api.get(`despesa/${manutencao.id}/manutencao`);
      if (!response.data.isSucces) {
        toast("erro ao buscar dados");
      }

      setDespesa(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
    }
  }

  useEffect(() => {});

  return (
    <Dialog open={true}>
      <DialogContent className="max-w-[90vw] md:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogClose>
            <Button
              className="absolute right-2 bg-white text-black z-20 top-2"
              onClick={() => onClose()}
            >
              X
            </Button>
          </DialogClose>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Wrench className="h-5 w-5" />
            Manutenção #{manutencao ? manutencao.id : ""}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">
                Informações Principais
              </h3>
              {manutencao.kmRealizada ? (
                <Badge className="bg-green-600">Realizada</Badge>
              ) : (
                <Badge className="bg-blue-600">Prevista</Badge>
              )}

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
                {despesa && (
                  <Button className="bg-blue-600 text-white">
                    Ver Despesa
                  </Button>
                )}
              </div>
            </section>
            <Separator />
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
                    Data Prevista:{" "}
                    {manutencao ? formatDate(manutencao.dataPrevista) : ""}
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
