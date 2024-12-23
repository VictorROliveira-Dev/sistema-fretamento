import { useState, useEffect } from "react";
import Image from "next/image";
import dadosViagemIcon from "../../assets/dadosviagem.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { Servico, Veiculo } from "@/lib/types";

interface IManutencao {
  id: number;
  dataVencimento: string;
  dataLancamento: string;
  dataRealizada: string;
  tipo: string;
  servicoId: number;
  veiculoId: number;
  kmPrevista: number;
  kmAtual: number;
  kmRealizada: number;
  custo: number;
  nomeServico?: string;
  nomeVeiculo?: string;
}
interface ManutencoesProps {
  manutencaoId: number;
}

export default function DialogInformacoes({ manutencaoId }: ManutencoesProps) {
  const [manutencoes, setManutencoes] = useState<IManutencao[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca todas as informações de uma vez
        const [manutencoesResponse, veiculosResponse, servicosResponse] =
          await Promise.all([
            api.get("/manutencao"),
            api.get("/veiculo"),
            api.get("/servico"),
          ]);

        setManutencoes(manutencoesResponse.data.data ?? []);
        setVeiculos(veiculosResponse.data.data ?? []);
        setServicos(servicosResponse.data.data ?? []);
        console.log(veiculosResponse.data.data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);

  // Funções para encontrar o nome do veículo e do serviço pelo ID
  const getVeiculoNome = (veiculoId: number) => {
    const veiculo = veiculos.find(
      (v) => v.id.toString() === veiculoId.toString()
    );
    return veiculo ? veiculo.placa : "Desconhecido";
  };

  const getServicoNome = (servicoId: number) => {
    const servico = servicos.find(
      (s) => s.id.toString() === servicoId.toString()
    );
    return servico ? servico.nomeServico : "Desconhecido";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent shadow-none p-0 hover:bg-transparent hover:scale-110">
          <Image
            src={dadosViagemIcon}
            alt="documento"
            className="w-8 md:w-6"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:w-[800px] max-h-screen overflow-y-scroll">
        <DialogHeader className="mb-5">
          <DialogTitle className="font-bold text-center">
            Mais Informações
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-around">
          {manutencoes.map((manutencao) => (
            <div key={manutencao.id}>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <h2 className="font-bold">Data de Vencimento:</h2>
                  <p>
                    {new Date(manutencao.dataVencimento).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Data de Lançamento:</h2>
                  <p>
                    {new Date(manutencao.dataLancamento).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Data Realizada:</h2>
                  <p>
                    {new Date(manutencao.dataRealizada).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Tipo:</h2>
                  <p>{manutencao.tipo}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Serviço:</h2>
                  <p>{getVeiculoNome(manutencao.veiculoId)}</p>{" "}
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Veículo:</h2>
                  <p>{getServicoNome(manutencao.servicoId)}</p>{" "}
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">KM Prevista:</h2>
                  <p>{manutencao.kmPrevista} KM</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">KM Atual:</h2>
                  <p>{manutencao.kmAtual} KM</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">KM Realizada:</h2>
                  <p>{manutencao.kmRealizada}</p>
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Custo:</h2>
                  <p>{manutencao.custo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
