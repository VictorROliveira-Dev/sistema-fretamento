"use client";
import removeIcon from "@/app/assets/remove.svg";
import documentoIcon from "@/app/assets/documentos.svg";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import FormInput from "@/components/form-input";
import DialogAdicionar from "./components/dialog-adicionar";
import DialogEditar from "./components/dialog-editar";
import { Manutencao, Servico, Veiculo } from "@/lib/types";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import DialogRemover from "./components/dialog-remover";

export default function Manutencoes() {
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [buscarManutencao, setBuscarManutencao] = useState("");

  const manutencoesFiltradas = manutencoes.filter((manutencao) => {
    if (!manutencao) return false;
    return manutencao.tipo
      .toLowerCase()
      .includes(buscarManutencao.toLowerCase());
  });

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
    <section className="bg-[#070180] pt-12 h-[425px]">
      <div className="h-[400px] w-[1000px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Manutenções
          </p>
        </div>
        <div className="flex items-center p-10">
          <div className="mx-auto space-y-4 w-full">
            <div className="flex items-center justify-between w-full">
              <form className="flex flex-col gap-2 font-bold">
                <FormInput
                  label="Tipo:"
                  name="tipo"
                  placeholder="Digite o tipo..."
                  value={buscarManutencao}
                  onChange={(e) => setBuscarManutencao(e.target.value)}
                />
              </form>
              <DialogAdicionar
                manutencoes={manutencoes}
                setManutencoes={setManutencoes}
              />
            </div>
            <div className="h-[200px] overflow-y-scroll scrollbar-hide">
              <Table>
                <TableHeader className="border-b-2">
                  <TableRow>
                    <TableHead className="text-black font-bold text-center">
                      Tipo
                    </TableHead>
                    <TableHead className="text-black font-bold text-center">
                      Veículo
                    </TableHead>
                    <TableHead className="text-black font-bold text-center">
                      Serviço
                    </TableHead>
                    <TableHead className="text-black font-bold text-center">
                      Km Prevista
                    </TableHead>
                    <TableHead className="text-black font-bold text-center">
                      KM Atual
                    </TableHead>
                    <TableHead className="text-black font-bold text-center">
                      KM Realizada
                    </TableHead>
                    <TableHead className="text-black font-bold text-center">
                      Vencimento
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-center">
                  {manutencoesFiltradas.map((manutencao) => (
                    <TableRow key={manutencao.id} className="hover:bg-gray-200">
                      <TableCell>{manutencao.tipo.toUpperCase()}</TableCell>
                      <TableCell>
                        {getVeiculoNome(manutencao.veiculoId)}
                      </TableCell>
                      <TableCell>
                        {getServicoNome(manutencao.servicoId)}
                      </TableCell>
                      <TableCell>{manutencao.kmPrevista}</TableCell>
                      <TableCell>{manutencao.kmAtual}</TableCell>
                      <TableCell>{manutencao.kmRealizada}</TableCell>
                      <TableCell>
                        {new Date(manutencao.dataVencimento).toLocaleDateString(
                          "pt-BR"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <DialogEditar
                            manutencoes={manutencoes}
                            setManutencoes={setManutencoes}
                            manutencao={manutencao}
                          />
                          <DialogRemover
                            manutencao={manutencao}
                            setManutencoes={setManutencoes}
                          />
                          <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                            <Image
                              src={documentoIcon}
                              alt="documento"
                              width={25}
                              className="hover:scale-110"
                            />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
