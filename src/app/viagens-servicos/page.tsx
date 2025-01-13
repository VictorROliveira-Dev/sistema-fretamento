"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DialogAdicionar from "./components/dialog-adicionar";
import DialogEditar from "./components/dialog-editar";
import { DialogExcluir } from "./components/dialog_excluir";
import { useEffect, useState } from "react";
import { Viagem } from "@/lib/types";
import { api } from "@/lib/axios";
import ViagemPDF from "./components/dialog-document";
import { TravelDialog } from "./components/dialog-informacoes";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import loading from "../assets/loading-dark.svg";
import { parseISO } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";

export default function ViagensServicos() {
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const [veiculo, setVeiculo] = useState<string>("");
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [carregando, setCarregando] = useState(false);

  async function fetchViagens() {
    setCarregando(true);
    const response = await api.get("/viagem");

    if (!response.data.isSucces) {
      console.log(response.data.message);
      return;
    }
    console.log(response.data.data);
    setViagens(response.data.data);
    setCarregando(false);
  }
  useEffect(() => {
    fetchViagens();
  }, []);

  async function getByFilters(e: React.FormEvent) {
    e.preventDefault();
    try {
      // Objeto com os parâmetros
      const params: Record<string, string> = {};

      if (minDate) params["startDate"] = minDate;
      if (maxDate) params["endDate"] = maxDate;
      if (veiculo) params["prefixoVeiculo"] = veiculo;

      // Constrói a query string com os parâmetros
      const queryString = new URLSearchParams(params).toString();

      // Faz a requisição com a query dinâmica
      const response = await api.get(`/Viagem?${queryString}`);
      setViagens(response.data.data);

      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar viagens:", error);
    }
  }

  return (
    <section className="bg-[#070180] px-4 py-6 md:pt-12 md:h-[800px]">
      <div className="h-[700px] md:w-[1400px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Fretamentos
          </p>
        </div>
        <div className="flex items-center p-10">
          <div className="mx-auto md:w-full space-y-4">
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between">
              <form
                onSubmit={getByFilters}
                className="flex flex-col md:items-end md:flex-row gap-2 font-bold"
              >
                <div>
                  <label htmlFor="fantasia">De:</label>
                  <Input
                    name="fantasia"
                    className="border-2 font-medium text-black md:w-min"
                    placeholder="Digite o identificador..."
                    onChange={(e) => setMinDate(e.target.value)}
                    type="date"
                    value={minDate}
                  />
                </div>
                <div className="">
                  <label htmlFor="fantasia">até:</label>
                  <Input
                    name="fantasia"
                    className="border-2 font-medium text-black md:w-min"
                    placeholder="Digite o identificador..."
                    type="date"
                    onChange={(e) => setMaxDate(e.target.value)}
                    value={maxDate}
                  />
                </div>
                <div>
                  <label htmlFor="cnpj">Veículo:</label>
                  <Input
                    name="cnpj"
                    className="border-2 font-medium text-black w-[250px]"
                    placeholder="Digite o prefixo..."
                    onChange={(e) => setVeiculo(e.target.value)}
                  />
                </div>
                <Button type="submit" className="bg-blue-600">
                  <Search className="text-white" />
                </Button>
              </form>

              <div className="flex items-center gap-2">
                <DialogAdicionar setViagens={setViagens} viagens={viagens} />
              </div>
            </div>

            {carregando ? (
              <div className="flex items-center justify-center p-10">
                <Image
                  src={loading}
                  alt="loading"
                  className="text-center animate-spin"
                  width={50}
                  height={50}
                />
              </div>
            ) : (
              <div className="h-[400px] overflow-y-scroll scrollbar-hide">
                <Table>
                  <TableHeader className="border-b-2">
                    <TableRow>
                      <TableHead className="text-black font-bold text-center">
                        Motorista
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Veiculo
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Cliente
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Cidade Saída
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Data Saída
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Cidade Destino
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Data Chegada
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Valor Contratado
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Status Viagem
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-center">
                    {viagens.map((viagem) => (
                      <TableRow className="hover:bg-gray-200" key={viagem.id}>
                        <TableCell>
                          {viagem.motoristaViagens &&
                          viagem.motoristaViagens.length > 0 &&
                          viagem.motoristaViagens[0].motorista
                            ? viagem.motoristaViagens[0].motorista.nome
                            : "Sem motorista"}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {viagem.veiculo?.prefixo}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {viagem.cliente?.nome}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {viagem.rota.saida.cidadeSaida}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {format(
                            toZonedTime(
                              parseISO(viagem.dataHorarioSaida.data),
                              "UTC"
                            ),
                            "dd/MM/yyyy"
                          )}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {viagem.rota.retorno.cidadeSaida}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {format(
                            toZonedTime(
                              parseISO(viagem.dataHorarioRetorno.data),
                              "UTC"
                            ),
                            "dd/MM/yyyy"
                          )}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {viagem.valorContratado}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {viagem.status}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DialogEditar
                              setViagens={setViagens}
                              viagens={viagens}
                              viagemprop={viagem}
                            />
                            <ViagemPDF dadosViagens={viagem} />
                            <DialogExcluir
                              id={viagem.id}
                              setViagens={setViagens}
                              viagens={viagens}
                            />
                            <TravelDialog viagem={viagem} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
