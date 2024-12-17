import { useState, useEffect } from "react";
import Image from "next/image"; 
import dadosViagemIcon from "../assets/dadosViagemIcon.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";

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
  nomeServico?: string; // Propriedade para armazenar o nome do serviço
  nomeVeiculo?: string; // Propriedade para armazenar o nome do veículo
}

interface ManutencoesProps {
  manutencaoId: number;
}

export default function DialogInformacoes({ manutencaoId }: ManutencoesProps) {
  const [manutencoes, setManutencoes] = useState<IManutencao[]>([]);

  useEffect(() => {
    if (!manutencaoId) return;

    const fetchManutencao = async () => {
      try {
        const response = await api.get(`/manutencao/${manutencaoId}`);
        const manutencao = response.data.data;

        if (manutencao) {
          // Obtém o nome do serviço e do veículo
          const [servicoResponse, veiculoResponse] = await Promise.all([
            api.get(`/servico/${manutencao.servicoId}`),
            api.get(`/veiculo/${manutencao.veiculoId}`),
          ]);

          manutencao.nomeServico =
            servicoResponse.data.data?.nome || "Serviço não encontrado";
          manutencao.nomeVeiculo =
            veiculoResponse.data.data?.nome || "Veículo não encontrado";

          setManutencoes([manutencao]);
        } else {
          setManutencoes([]);
        }
      } catch (error) {
        console.log("Erro ao buscar manutenções:", error);
      }
    };

    fetchManutencao();
  }, [manutencaoId]);

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
                  <p>{manutencao.nomeServico}</p>{" "}
                </div>
                <div className="flex gap-2">
                  <h2 className="font-bold">Veículo:</h2>
                  <p>{manutencao.nomeVeiculo}</p>{" "}
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
