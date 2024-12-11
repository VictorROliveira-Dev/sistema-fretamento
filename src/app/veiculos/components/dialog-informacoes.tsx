"use client";
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
import { useEffect, useState } from "react";
import { Veiculo } from "@/lib/types";
import { api } from "@/lib/axios";

interface VeiculoProps {
  veiculoId: string;
}

export default function DialogInformacoes({ veiculoId }: VeiculoProps) {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  useEffect(() => {
    if (!veiculoId) return;

    const fetchVeiculos = async () => {
      try {
        const response = await api.get(`/veiculo/${veiculoId}`);
        setVeiculos(response.data.data ? [response.data.data] : []);
      } catch (error) {
        console.log("erro ao buscar ao veículos", error);
      }
    };
    fetchVeiculos();
  }, [veiculoId]);

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
          {veiculos.map((veiculo) => (
            <div key={veiculo.id}>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <h2 className="font-bold">Prefixo:</h2>
                  <p>{veiculo.prefixo}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Marca:</h2>
                  <p>{veiculo.marca}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Carroceria:</h2>
                  <p>{veiculo.carroceria}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Qtd. Poltronas:</h2>
                  <p>{veiculo.quantidadePoltronas}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Km Atual:</h2>
                  <p>{veiculo.kmAtual}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Ano Veículo:</h2>
                  <p>{veiculo.ano}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Local Emplacamento:</h2>
                  <p>{veiculo.localEmplacado}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Capacidade do Tanque:</h2>
                  <p>{veiculo.capacidadeTank}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Modelo:</h2>
                  <p>{veiculo.modelo}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Placa:</h2>
                  <p>{veiculo.placa}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">UF Emplacamento:</h2>
                  <p>{veiculo.uf}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Tipo Veículo:</h2>
                  <p>{veiculo.tipo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
