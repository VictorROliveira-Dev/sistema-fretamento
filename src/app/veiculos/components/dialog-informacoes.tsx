"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dadosViagemIcon from "@/app/assets/dadosviagem.svg";
import Image from "next/image";
import { Veiculo } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Armchair,
  Calendar,
  Car,
  Fuel,
  Gauge,
  MapPin,
  Tag,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface VeiculoProps {
  veiculo: Veiculo;
}

export default function DialogInformacoes({ veiculo }: VeiculoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110 cursor-pointer transition-all">
          <Image
            src={dadosViagemIcon}
            alt="documento"
            width={25}
            className="w-6 md:w-6"
          />
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Car className="h-5 w-5" />
            {veiculo.modelo} {veiculo.marca}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">
                Informações Principais
              </h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span>Prefixo: {veiculo.prefixo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Ano: {veiculo.ano}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span>Tipo: {veiculo.tipo}</span>
                </div>
              </div>
            </section>
            <Separator />
            <section>
              <h3 className="text-lg font-semibold mb-3">
                Informações Técnicas
              </h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <span>Quilometragem Atual: {veiculo.kmAtual} km</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fuel className="h-4 w-4 text-muted-foreground" />
                  <span>Capacidade do Tanque: {veiculo.capacidadeTank}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Armchair className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Quantidade de Poltronas: {veiculo.quantidadePoltronas}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span>Carroceria: {veiculo.carroceria}</span>
                </div>
              </div>
            </section>
            <Separator />
            <section>
              <h3 className="text-lg font-semibold mb-3">Documentação</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span>Placa: {veiculo.placa.toUpperCase()}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p>
                      Local Emplacado: {veiculo.localEmplacado} {veiculo.uf}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
