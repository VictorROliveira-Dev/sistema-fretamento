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
import documentoIcon from "@/app/assets/documentos.svg";
import { useEffect, useState } from "react";
import { IDespesas, IReceitas } from "@/lib/types";
import { api } from "@/lib/axios";
import loading from "../assets/loading-dark.svg";
import DialogEditarDespesa from "./components/despesas/dialog-editar";
import DialogEditarReceita from "./components/receitas/dialog-editar";
import DialogRemoverDespesa from "./components/despesas/dialog-remover";
import { Input } from "@/components/ui/input";
import DialogAdicionarDespesa from "./components/despesas/dialog-adicionar";
import DialogAdicionarReceita from "./components/receitas/dialog-adicionar";
import DialogRemoverReceita from "./components/receitas/dialog-remover";
import { DialogInfo } from "./components/despesas/dialog-informacoes";
import DespesaPDF from "./components/despesas/dialog-document";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { DialogInformacoesReceitas } from "./components/receitas/dialog-informacoes";

export default function Financeiro() {
  const [despesas, setDespesas] = useState<IDespesas[]>([]);
  const [receitas, setReceitas] = useState<IReceitas[]>([]);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFinal, setDataFinal] = useState<string>("");
  const [veiculo, setVeiculo] = useState<string>("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setCarregando(true);
      try {
        const [despesasResponse, receitasResponse] = await Promise.all([
          api.get("/despesa"),
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

    fetchData();
  }, []);

  function getStatusPagamento(
    pago: boolean,
    valorParcial: number,
    valorTotal: number
  ) {
    if (valorParcial != valorTotal) {
      return (pago = false);
    }
    return (pago = true);
  }

  async function getByFilters(e: React.FormEvent) {
    e.preventDefault();
    try {
      setCarregando(true);
      // Objeto com os parâmetros
      const params: Record<string, string> = {};

      if (dataInicio) params["startDate"] = dataFinal;
      if (dataFinal) params["endDate"] = dataFinal;
      if (veiculo) params["prefixo"] = veiculo;

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
          router.replace("/login");
        } else {
          toast.error("Erro ao tentar remover peca.");
        }
        console.error("Erro ao buscar viagens:", error);
      }
    } finally {
      setCarregando(false);
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
                <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between mb-10">
                  <form
                    className="flex gap-2 font-bold h-[60px]"
                    onSubmit={(e) => getByFilters(e)}
                  >
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
                    <div>
                      <label htmlFor="prefixo">Prefixo Veiculo:</label>
                      <Input
                        type="text"
                        name="prefixo"
                        value={veiculo}
                        onChange={(e) => setVeiculo(e.target.value)}
                        className="w-[140px] md:w-[160px]"
                      />
                    </div>
                    <div className="flex items-end h-full">
                      <Button type="submit" className="bg-blue-600">
                        <Search className="text-white" />
                      </Button>
                    </div>
                  </form>
                  <div className="flex items-center gap-2">
                    <DialogAdicionarDespesa
                      despesas={despesas}
                      setDespesas={setDespesas}
                    />
                  </div>
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
                  <div className="h-[200px] overflow-y-scroll scrollbar-hide">
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
                            Veiculo
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
                        {despesas.map((despesa) => (
                          <TableRow
                            key={despesa.id}
                            className="hover:bg-gray-200"
                          >
                            <TableCell>
                              {new Date(despesa.vencimento).toLocaleDateString(
                                "pt-BR"
                              )}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {despesa.origemPagamento}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {despesa.responsavel
                                ? despesa.responsavel.nome
                                : "N/A"}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {despesa.viagem
                                ? despesa.viagem.veiculo!.prefixo
                                : "N/A"}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {getStatusPagamento(
                                despesa.pago,
                                despesa.valorParcial,
                                despesa.valorTotal
                              )
                                ? "sim"
                                : "nao"}
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
                                <DialogEditarDespesa
                                  despesa={despesa}
                                  setDespesas={setDespesas}
                                  despesas={despesas}
                                />
                                <DialogRemoverDespesa
                                  despesa={despesa}
                                  setDespesas={setDespesas}
                                />
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
                  <DialogAdicionarReceita
                    receitas={receitas}
                    setReceitas={setReceitas}
                  />
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
                            {new Date(receita.vencimento).toLocaleDateString(
                              "pt-BR"
                            )}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {receita.origemPagamento}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {receita.responsavel
                              ? receita.responsavel.nome
                              : "N/a"}
                          </TableCell>

                          <TableCell className="hidden sm:table-cell">
                            {receita.pago
                              ? "sim".toUpperCase()
                              : "não".toUpperCase()}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {receita.valorParcial}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {receita.valorTotal}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <DialogEditarReceita
                                receita={receita}
                                setReceitas={setReceitas}
                                receitas={receitas}
                              />
                              <DialogRemoverReceita
                                receita={receita}
                                setReceitas={setReceitas}
                              />
                              <Button className="bg-transparent shadow-none p-0 hover:bg-transparent">
                                <Image
                                  src={documentoIcon}
                                  alt="documento"
                                  width={25}
                                  className="hover:scale-110"
                                />
                              </Button>
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
