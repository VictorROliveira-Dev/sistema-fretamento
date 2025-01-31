"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import DialogAdicionar from "./components/dialog-adicionar";
import DialogEditar from "./components/dialog-editar";
import { Manutencao } from "@/lib/types";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import DialogRemover from "./components/dialog-remover";
import loading from "../assets/loading-dark.svg";
import { DialogInfo } from "./components/dialog-informacoes";
import { Button } from "@/components/ui/button";
import editIcon from "@/app/assets/edit.svg";
import removeIcon from "@/app/assets/remove.svg";
import documentoIcon from "@/app/assets/dadosviagem.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { SelectValue } from "@radix-ui/react-select";
import { parseISO } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";

type ManutencaoParams = {
  situacao?: boolean | null;
  startDate?: Date | null;
  veiculo?: string | null;
};

export default function Manutencoes() {
  const [situacao, setSituacao] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [veiculo, setVeiculo] = useState<string | null>(null);
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);
  const [buscarManutencao, setBuscarManutencao] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [selectedManutencao, setSelectedManutencao] =
    useState<Manutencao | null>(null);
  const [dialogType, setDialogType] = useState<string>("");

  const manutencoesFiltradas = manutencoes.filter((manutencao) => {
    if (buscarManutencao === " ") {
      return manutencoes;
    }
    return manutencao.tipo
      .toLowerCase()
      .includes(buscarManutencao.toLowerCase());
  });
  const fetchData = async () => {
    setCarregando(true);
    try {
      // Busca todas as informações de uma vez
      const [manutencoesResponse, veiculosResponse] = await Promise.all([
        api.get("/manutencao"),
        api.get("/veiculo"),
        api.get("/servico"),
      ]);

      setManutencoes(manutencoesResponse.data.data ?? []);
      console.log(veiculosResponse.data.data);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  async function getManutencoes(
    params: ManutencaoParams,
    setManutencoes: (data: any) => void
  ): Promise<void> {
    const { situacao, startDate, veiculo } = params;

    // Cria os parâmetros de consulta dinamicamente
    const queryParams = new URLSearchParams();

    if (situacao !== undefined && situacao !== null) {
      queryParams.append("situacao", situacao.toString());
    }

    if (startDate) {
      queryParams.append("startDate", startDate.toISOString());
    }

    if (veiculo) {
      queryParams.append("veiculo", veiculo);
    }

    try {
      const response = await api.get(`/manutencao?${queryParams.toString()}`);

      if (!response.data.isSucces) {
        toast("Erro ao buscar as manutenções");
      }

      const data = response.data.data;
      setManutencoes(data);
    } catch (error) {
      console.error("Erro ao buscar manutenções:", error);
    }
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Converte os valores para o formato esperado no back-end
    const params: ManutencaoParams = {
      situacao: situacao !== null ? situacao === "true" : null,
      startDate: startDate ? new Date(startDate) : null,
      veiculo: veiculo || null,
    };

    await getManutencoes(params, setManutencoes);
  };

  return (
    <section className="bg-[#070180] px-4 py-6 md:pt-12 md:h-[650px]">
      <div className="h-[700px] md:w-[1400px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Manutenções
          </p>
        </div>
        <div className="flex items-center p-10">
          <div className="mx-auto space-y-4 md:w-full">
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between w-full">
              <div className="flex flex-col md:flex-row items-end gap-2">
                <div>
                  <label htmlFor="tipo">Tipo:</label>
                  <Select
                    name="tipo"
                    value={buscarManutencao}
                    onValueChange={(value) => setBuscarManutencao(value)}
                  >
                    <SelectTrigger className="w-[250px]">
                      <SelectValue>Selecionar tipo</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value=" ">Todos</SelectItem>
                        <SelectItem value="preventiva">Preventiva</SelectItem>
                        <SelectItem value="corretiva">Corretiva</SelectItem>
                        <SelectItem value="preditiva">Preditiva</SelectItem>
                        <SelectItem value="ordem">Ordens de Serviço</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <form
                  onSubmit={(e) => handleSubmit(e)}
                  className="flex flex-col md:flex-row gap-2 md:items-end font-bold"
                >
                  <div>
                    <Label>Prefixo Veiculo</Label>
                    <Input
                      value={veiculo ? veiculo : ""}
                      placeholder="Prefixo do veiculo..."
                      onChange={(e) => setVeiculo(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Data Mínima</Label>

                    <Input
                      value={startDate ? startDate : ""}
                      type="date"
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select
                      name="tipo"
                      value={situacao ? situacao : ""}
                      onValueChange={(value) =>
                        setSituacao(value === " " ? null : value)
                      }
                    >
                      <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Todas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value=" ">Todas</SelectItem>
                          <SelectItem value="true">Realizada</SelectItem>
                          <SelectItem value="false">Prevista</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="bg-blue-600 text-white">
                    <Search />
                  </Button>
                </form>
              </div>

              <DialogAdicionar
                manutencoes={manutencoes}
                setManutencoes={setManutencoes}
              />
            </div>
            {carregando ? (
              <div className="flex items-center justify-center">
                <Image
                  src={loading}
                  alt="loading"
                  className="text-center animate-spin"
                  width={50}
                  height={50}
                />
              </div>
            ) : (
              <div className="h-[200px] md:h-[400px] overflow-y-scroll scrollbar-hide">
                <Table>
                  <TableHeader className="border-b-2">
                    <TableRow>
                      <TableHead className="text-black font-bold text-center">
                        Tipo
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Veículo
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Serviço
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Status
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        KM Prevista
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        KM Realizada
                      </TableHead>
                      <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                        Data Prevista
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-center">
                    {manutencoesFiltradas.map((manutencao) => (
                      <TableRow
                        key={manutencao.id}
                        className="hover:bg-gray-200"
                      >
                        <TableCell>{manutencao.tipo.toUpperCase()}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {manutencao.veiculo
                            ? manutencao.veiculo.placa
                            : "s/n"}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {manutencao.servico
                            ? manutencao.servico.nomeServico
                            : "s/n"}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {manutencao.kmRealizada ? "Realizada" : "Prevista"}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {manutencao.kmPrevista}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {manutencao.kmRealizada}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {format(
                            toZonedTime(
                              parseISO(manutencao.dataPrevista),
                              "UTC"
                            ),
                            "dd/MM/yyyy"
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              className="bg-transparent shadow-none hover:bg-white"
                              onClick={() => {
                                setSelectedManutencao(manutencao);
                                setDialogType("edit");
                              }}
                            >
                              <Image
                                src={editIcon}
                                alt="Editar"
                                width={25}
                                className="w-6 md:w-6"
                              />
                            </Button>
                            <Button
                              className="bg-transparent shadow-none hover:bg-white"
                              onClick={() => {
                                setSelectedManutencao(manutencao);
                                setDialogType("remove");
                              }}
                            >
                              <Image
                                src={removeIcon}
                                alt="Remover"
                                className="w-6 md:w-6"
                              />
                            </Button>
                            <Button
                              className="bg-transparent shadow-none hover:bg-white"
                              onClick={() => {
                                setSelectedManutencao(manutencao);
                                setDialogType("info");
                              }}
                            >
                              <Image
                                src={documentoIcon}
                                alt="documento"
                                width={25}
                                className="w-6 md:w-6"
                              />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            {dialogType === "edit" && selectedManutencao && (
              <DialogEditar
                manutencoes={manutencoes}
                setManutencoes={setManutencoes}
                manutencao={selectedManutencao}
                onClose={() => {
                  setDialogType("");
                  setSelectedManutencao(null);
                }}
              />
            )}

            {dialogType === "remove" && selectedManutencao && (
              <DialogRemover
                manutencao={selectedManutencao}
                setManutencoes={setManutencoes}
                onClose={() => {
                  setDialogType("");
                  setSelectedManutencao(null);
                }}
              />
            )}

            {dialogType === "info" && selectedManutencao && (
              <DialogInfo
                manutencao={selectedManutencao}
                onClose={() => {
                  setDialogType("");
                  setSelectedManutencao(null);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
