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
import { Despesa, DespesaMensal, IReceitas, Salario } from "@/lib/types";
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
import { FinancialDialogs } from "./components/despesas-mensais/adicionar-salario";
import { RemoverDialog } from "./components/despesas-mensais/remover-despesa";
import { EditarDespesa } from "./components/despesas-mensais/dialog-editar-despesa";
import { EditarSalario } from "./components/despesas-mensais/dialog-editar-salario";
import { RemoverSalario } from "./components/despesas-mensais/remover-salario";

export default function Financeiro() {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [receitas, setReceitas] = useState<IReceitas[]>([]);
  const [salarios, setSalarios] = useState<Salario[]>([]);
  const [despesasMensais, setDespesasMensais] = useState<DespesaMensal[]>([]);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFinal, setDataFinal] = useState<string>("");
  const [carregando, setCarregando] = useState(false);
  const [statusFiltro, setStatusFiltro] = useState("todas");
  const [defaultValue, setDefaultValue] = useState("despesas");

  const fetchData = async (
    searchParam: string | null,
    receita: string | null
  ) => {
    setCarregando(true);
    try {
      const urlDespesa = searchParam
        ? `/despesa?despesaCode=${searchParam}`
        : "/despesa";

      const urlReceita = receita
        ? `/api/receita?receitaId=${receita}`
        : "/api/receita";
      const [
        despesasResponse,
        receitasResponse,
        salariosResponse,
        despesasMensaisResponse,
      ] = await Promise.all([
        api.get(urlDespesa),
        api.get(urlReceita),
        api.get("/despesaMensal"),
        api.get("/despesaMensal/despesamensal"),
      ]);
      const despesasData = despesasResponse.data.data || [];
      const receitasData = receitasResponse.data.data || [];
      const despesasMensais = despesasMensaisResponse.data.data || [];
      const salarios = salariosResponse.data.data;
      // Atualiza o estado com as despesas e receitas
      setDespesas(despesasData);
      setReceitas(receitasData);
      setDespesasMensais(despesasMensais);
      setSalarios(salarios);
      console.log("Despesas:", despesasData);
    } catch (error) {
      console.log("Erro ao tentar recuperar os dados", error);
    } finally {
      setCarregando(false);
    }
  };

  function verificarVencimento(date: string) {
    const diaAtual = new Date();
    const dataVericada = new Date(date);
    if (diaAtual >= dataVericada) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const codigo = searchParams.get("despesaCode");
    const receitaCode = searchParams.get("receita");
    if (codigo) {
      fetchData(codigo, null);
    } else if (receitaCode) {
      setDefaultValue("receitas");
      fetchData(null, receitaCode);
    } else {
      fetchData(null, null);
    }
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

  const despesasFiltradas = despesas.filter(() => {
    return true; // Retorna todas as despesas
  });

  async function buscarPendentes(status: string) {
    try {
      if (status === "todas") {
        fetchData(null, null);
        return;
      }
      const response = await api.get(`/despesa/despesastatus?status=${status}`);
      if (!response.data.isSucces) {
        toast("Erro ao tentar filtrar despesas");
        return;
      }

      setDespesas(response.data.data);
    } catch {
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
        <div className="flex md:h-screen p-10 overflow-y-scroll">
          <div className="mx-auto md:w-full">
            <Tabs value={defaultValue} className="flex flex-col">
              <TabsList className="gap-4">
                <TabsTrigger
                  value="despesas"
                  onClick={() => setDefaultValue("despesas")}
                  className="font-bold"
                >
                  Despesas
                </TabsTrigger>
                <TabsTrigger
                  value="mensais"
                  onClick={() => setDefaultValue("mensais")}
                  className="font-bold"
                >
                  Gastos Mensais
                </TabsTrigger>
                <TabsTrigger
                  value="receitas"
                  onClick={() => setDefaultValue("receitas")}
                  className="font-bold"
                >
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
                          Responsável
                        </TableHead>
                        <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                          Pago
                        </TableHead>
                        <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                          Valor Total
                        </TableHead>
                        <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                          Valor Parcial
                        </TableHead>
                        <TableHead className="text-black font-bold text-center hidden sm:table-cell">
                          Pendente
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="text-center">
                      {receitas.map((receita) => (
                        <TableRow
                          key={receita.id}
                          className="hover:bg-gray-200"
                        >
                          <TableCell
                            className={`font-bold ${
                              verificarVencimento(receita.vencimento) &&
                              "text-red-600 "
                            }`}
                          >
                            {format(
                              toZonedTime(parseISO(receita.vencimento), "UTC"),
                              "dd/MM/yyyy"
                            )}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {receita.viagem
                              ? receita.viagem.cliente?.nome
                              : "N/a"}
                          </TableCell>

                          <TableCell
                            className={`hidden sm:table-cell font-bold ${
                              receita.pago ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {receita.pago
                              ? "sim".toUpperCase()
                              : "não".toUpperCase()}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {receita.valorTotal}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {receita.valorPago}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {receita.valorTotal - receita.valorPago}
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
              <TabsContent value="mensais">
                <div className="flex justify-end w-full">
                  <FinancialDialogs
                    setDespesas={setDespesasMensais}
                    despesas={despesasMensais}
                    salarios={salarios}
                    setSalarios={setSalarios}
                  />
                </div>
                <div className="flex flex-col md:flex-row md:justify-evenly w-full gap-4">
                  {/* Salaries Table */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold prose prose-lg">
                      Salários
                    </h2>
                    <div className="rounded-md border shadow-sm">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Dia do Vale</TableHead>
                            <TableHead>Dia do Salário</TableHead>
                            <TableHead>Valor Total</TableHead>
                            <TableHead>Valor Vale</TableHead>
                            <TableHead>A Receber</TableHead>
                            <TableHead>Responsável</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {salarios.map((salario) => (
                            <TableRow key={salario.id}>
                              <TableCell>{salario.diaVale}</TableCell>
                              <TableCell>{salario.diaSalario}</TableCell>
                              <TableCell>
                                {(
                                  salario.valorTotal + salario.valorVale
                                ).toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </TableCell>
                              <TableCell>
                                {salario.valorVale.toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </TableCell>
                              <TableCell>
                                {(
                                  salario.valorTotal +
                                  salario.valorVale -
                                  salario.valorVale
                                ).toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </TableCell>
                              <TableCell>
                                {salario.responsavel
                                  ? salario.responsavel.nome
                                  : ""}
                              </TableCell>
                              <TableCell className="flex gap-2">
                                <RemoverSalario
                                  salarios={salarios}
                                  setSalarios={setSalarios}
                                  id={salario.id}
                                />
                                <EditarSalario
                                  salarios={salarios}
                                  setSalarios={setSalarios}
                                  salario={salario}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Monthly Expenses Table */}
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold prose prose-lg">
                      Despesas Mensais
                    </h2>
                    <div className="rounded-md border shadow-sm">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Data de Pagamento</TableHead>
                            <TableHead>Valor Total</TableHead>
                            <TableHead>Centro de Custo</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {despesasMensais.map((despesa) => (
                            <TableRow key={despesa.id}>
                              <TableCell>{despesa.diaPagamento}</TableCell>
                              <TableCell>
                                {despesa.valorTotal.toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </TableCell>
                              <TableCell>{despesa.centroDeCusto}</TableCell>
                              <TableCell className="flex gap-2">
                                <RemoverDialog
                                  despesas={despesasMensais}
                                  setDespesas={setDespesasMensais}
                                  id={despesa.id}
                                />
                                <EditarDespesa
                                  setDespesas={setDespesasMensais}
                                  despesas={despesasMensais}
                                  despesa={despesa}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
