"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Despesa, IReceitas } from "@/lib/types";
import { api } from "@/lib/axios";
import loading from "../assets/loading-dark.svg";
import { Input } from "@/components/ui/input";
import DialogRemoverReceita from "./components/receitas/dialog-remover";
import { DialogInfo } from "./components/despesas/dialog-informacoes";
import DespesaPDF from "./components/despesas/dialog-document";
import { toast } from "sonner";
import axios from "axios";
import { Search } from "lucide-react";
import { DialogInformacoesReceitas } from "./components/receitas/dialog-informacoes";
import GeneratePDF from "./components/receitas/recibo-receita";
import { parseISO } from "date-fns";
import { format, toZonedTime } from "date-fns-tz";
import { Badge } from "@/components/ui/badge";

export default function Financeiro() {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [receitas, setReceitas] = useState<IReceitas[]>([]);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFinal, setDataFinal] = useState<string>("");
  const [despesaCode, setDespesaCode] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [statusFiltro, setStatusFiltro] = useState("todas");

  const fetchData = async (searchParam: string | null) => {
    setCarregando(true);
    try {
      const urlDespesa = searchParam
        ? `/despesa?despesaCode=${searchParam}`
        : "/despesa";
      const [despesasResponse, receitasResponse] = await Promise.all([
        api.get(urlDespesa),
        api.get("/api/receita"),
      ]);
      const despesasData = despesasResponse.data.data || [];
      const receitasData = receitasResponse.data.data || [];
      // Atualiza o estado com as despesas e receitas
      setDespesas(despesasData);
      setReceitas(receitasData);
      console.log("Despesas:", despesasData);
    } catch (error) {
      console.log("Erro ao tentar recuperar os dados", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const codigo = searchParams.get("despesaCode");
    if (codigo) {
      setDespesaCode(Number(codigo));
    }

    fetchData(codigo);
  }, []);

  async function getByFilters(e: React.FormEvent) {
    e.preventDefault();
    try {
      setCarregando(true);
      // Objeto com os parâmetros
      const params: Record<string, string> = {};

      if (dataInicio) params["startDate"] = dataFinal;
      if (dataFinal) params["endDate"] = dataFinal;

      // Constrói a query string com os parâmetros
      const queryString = new URLSearchParams(params).toString();

      // Faz a requisição com a query dinâmica
      const response = await api.get(`/despesa?${queryString}`);
      if (!response.data.isSucces) {
        toast("erro ao tentar buscar dados");
        return;
      }

      setDespesas(response.data.data);

      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          localStorage.removeItem("token");
        } else {
          toast.error("Erro ao tentar remover peca.");
        }
        console.error("Erro ao buscar viagens:", error);
      }
    } finally {
      setCarregando(false);
    }
  }

  const despesasFiltradas = despesas.filter((despesa) => {
    return true; // Retorna todas as despesas
  });

  async function buscarPendentes(status: string) {
    try {
      if (status === "todas") {
        fetchData(null);
        return;
      }
      const response = await api.get(`/despesa/despesastatus?status=${status}`);
      if (!response.data.isSucces) {
        toast("Erro ao tentar filtrar despesas");
        return;
      }

      setDespesas(response.data.data);
    } catch (error) {
      toast("Erro ao tentar filtrar ");
    }
  }

  return (
    <section className="bg-[#070180] px-4 py-6 md:pt-12 md:h-[800px]">
      <div className="h-[700px] md:w-[1400px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Finanças
          </p>
        </div>
        <div className="flex md:h-screen p-10">
          <div className="mx-auto md:w-full">
            <Tabs defaultValue="despesas" className="flex flex-col">
              <TabsList className="gap-4">
                <TabsTrigger value="despesas" className="font-bold">
                  Despesas
                </TabsTrigger>
                <TabsTrigger value="receitas" className="font-bold">
                  Receitas
                </TabsTrigger>
              </TabsList>
              <TabsContent value="despesas">
                <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between mb-10 md:mb-0">
                  <form
                    className="flex flex-col md:flex-row gap-2 mb-56 md:mb-0 font-bold h-[60px]"
                    onSubmit={(e) => getByFilters(e)}
                  >
                    <div className="md:flex">
                      <div>
                        <label htmlFor="inicio">Data inicio:</label>
                        <Input
                          type="date"
                          name="inicio"
                          value={dataInicio}
                          onChange={(e) => setDataInicio(e.target.value)}
                          className="w-[180px] md:w-[160px]"
                        />
                      </div>
                      <div>
                        <label htmlFor="final">Data Final:</label>
                        <Input
                          type="date"
                          name="final"
                          value={dataFinal}
                          onChange={(e) => setDataFinal(e.target.value)}
                          className="w-[180px] md:w-[160px]"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-end h-full">
                        <Button type="submit" className="bg-blue-600">
                          <Search className="text-white" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="status">Status:</label>
                      <select
                        name="status"
                        value={statusFiltro}
                        onChange={(e) => {
                          setStatusFiltro(e.target.value);
                          buscarPendentes(e.target.value);
                        }}
                        className="w-[180px] md:w-[160px] border rounded-md px-2 py-2"
                      >
                        <option value="todas">Todas</option>
                        <option value="paga">Pagas</option>
                        <option value="pendente">Não Pagas</option>
                      </select>
                    </div>
                  </form>
                </div>

                {carregando ? (
                  <div className="flex items-center justify-center">
                    <Image
                      src={loading}
                      alt="loading"
                      className="animate-spin"
                      width={50}
                    />
                  </div>
                ) : (
                  <div className="h-[200px] md:h-[100%] overflow-y-scroll scrollbar-hide">
                    <Table>
                      <TableHeader className="border-b-2">
                        <TableRow>
                          <TableHead className="text-black font-bold text-center">
                            Data Compra
                          </TableHead>
                          <TableHead className="text-black font-bold text-center">
                            Vencimento
                          </TableHead>
                          <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                            Forma Pagamento
                          </TableHead>
                          <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                            Pago
                          </TableHead>
                          <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                            Centro de Custo
                          </TableHead>
                          <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                            Valor Parcial
                          </TableHead>
                          <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                            Valor Total
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="text-center">
                        {despesasFiltradas.map((despesa) => (
                          <TableRow
                            key={despesa.id}
                            className="hover:bg-gray-200"
                          >
                            <TableCell>
                              {format(
                                toZonedTime(
                                  parseISO(despesa.dataCompra),
                                  "UTC"
                                ),
                                "dd/MM/yyyy"
                              )}
                            </TableCell>
                            <TableCell>
                              {despesa.vencimento
                                ? format(
                                    toZonedTime(
                                      parseISO(despesa.vencimento),
                                      "UTC"
                                    ),
                                    "dd/MM/yyyy"
                                  )
                                : ""}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {despesa.formaPagamento}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {despesa.pago ? (
                                <Badge className="bg-green-600">Paga</Badge>
                              ) : (
                                <Badge className="bg-red-600">Pendente</Badge>
                              )}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {despesa.centroCusto}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {despesa.valorParcial}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {despesa.valorTotal}
                            </TableCell>

                            <TableCell>
                              <div className="flex items-center gap-2">
                                <DespesaPDF despesa={despesa} />
                                <DialogInfo despesa={despesa} />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="receitas">
                <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between mb-10">
                  <form className="flex gap-2 font-bold">
                    <div>
                      <label htmlFor="inicio">Data inicio:</label>
                      <Input
                        type="date"
                        name="inicio"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                        className="w-[140px] md:w-[160px]"
                      />
                    </div>
                    <div>
                      <label htmlFor="final">Data Final:</label>
                      <Input
                        type="date"
                        name="final"
                        value={dataFinal}
                        onChange={(e) => setDataFinal(e.target.value)}
                        className="w-[140px] md:w-[160px]"
                      />
                    </div>
                  </form>
                </div>
                {carregando ? (
                  <div className="flex items-center justify-center">
                    <Image
                      src={loading}
                      alt="loading"
                      className="animate-spin"
                      width={50}
                    />
                  </div>
                ) : (
                  <Table>
                    <TableHeader className="border-b-2">
                      <TableRow>
                        <TableHead className="text-black font-bold text-center">
                          Vencimento
                        </TableHead>
                        <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                          Origem
                        </TableHead>
                        <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                          Responsável
                        </TableHead>
                        <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                          Pago
                        </TableHead>
                        <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                          Valor Parcial
                        </TableHead>
                        <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                          Valor Total
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-center">
                      {receitas.map((receita) => (
                        <TableRow
                          key={receita.id}
                          className="hover:bg-gray-200"
                        >
                          <TableCell>
                            {format(
                              toZonedTime(parseISO(receita.vencimento), "UTC"),
                              "dd/MM/yyyy"
                            )}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {receita.origemPagamento}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {receita.viagem
                              ? receita.viagem.cliente?.nome
                              : "N/a"}
                          </TableCell>

                          <TableCell className="hidden sm:table-cell">
                            {receita.pago
                              ? "sim".toUpperCase()
                              : "não".toUpperCase()}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {receita.valorPago}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {receita.valorTotal}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <DialogRemoverReceita
                                receita={receita}
                                setReceitas={setReceitas}
                              />
                              <GeneratePDF receita={receita} />
                              <DialogInformacoesReceitas receita={receita} />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
