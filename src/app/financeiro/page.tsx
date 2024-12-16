"use client";
import removeIcon from "@/app/assets/remove.svg";
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

export default function Financeiro() {
  const [despesas, setDespesas] = useState<IDespesas[]>([]);
  const [receitas, setReceitas] = useState<IReceitas[]>([]);
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFinal, setDataFinal] = useState<string>("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setCarregando(true);
      try {
        const [despesasResponse, receitasResponse] = await Promise.all([
          api.get("/despesa/getall"),
          api.get("/api/receita/getall"),
        ]);

        const despesasData = despesasResponse.data.data || [];
        const receitasData = receitasResponse.data.data || [];
        // Função auxiliar para buscar o nome do responsável
        const getResponsavelNome = async (responsavelId: string) => {
          if (!responsavelId) return "";

          try {
            // Tenta obter o responsável de cada tipo (motorista, cliente, fornecedor)
            const endpoints = [
              api.get(`/motorista/${responsavelId}`),
              api.get(`/cliente/${responsavelId}`),
              api.get(`/api/fornecedor/${responsavelId}`),
            ];

            const [motoristaResponse, clienteResponse, fornecedorResponse] =
              await Promise.all(endpoints.map((req) => req.catch(() => null)));

            if (motoristaResponse) return motoristaResponse.data.data.nome;
            if (clienteResponse) return clienteResponse.data.data.nome;
            if (fornecedorResponse) return fornecedorResponse.data.data.nome;

            return ""; // Retorna vazio caso não encontre
          } catch (error) {
            console.log("Erro ao buscar responsável", error);
            return ""; // Retorna vazio em caso de erro
          }
        };

        // Busca os nomes dos responsáveis e retorna as despesas com as informações completas
        const despesasComResponsavel = await Promise.all(
          despesasData.map(async (despesa: IDespesas) => {
            const responsavelNome = await getResponsavelNome(
              despesa.responsavelId.toString()
            );
            return { ...despesa, responsavelNome };
          })
        );
        // Filtrar despesas com base no intervalo de datas
        const despesasFiltradas = despesasComResponsavel.filter((despesa) => {
          if (!dataInicio && !dataFinal) return true;
          const dataVencimento = new Date(despesa.vencimento);
          const inicio = dataInicio ? new Date(dataInicio) : null;
          const final = dataFinal ? new Date(dataFinal) : null;

          if (inicio && final) {
            return dataVencimento >= inicio && dataVencimento <= final;
          } else if (inicio) {
            return dataVencimento >= inicio;
          } else if (final) {
            return dataVencimento <= final;
          }
          return true;
        });
        // Filtrar receitas com base no intervalo de datas
        const receitasFiltradas = receitasData.filter((receita: IReceitas) => {
          if (!dataInicio && !dataFinal) return true;
          const dataVencimento = new Date(receita.vencimento);
          const inicio = dataInicio ? new Date(dataInicio) : null;
          const final = dataFinal ? new Date(dataFinal) : null;

          if (inicio && final) {
            return dataVencimento >= inicio && dataVencimento <= final;
          } else if (inicio) {
            return dataVencimento >= inicio;
          } else if (final) {
            return dataVencimento <= final;
          }
          return true;
        });

        // Atualiza o estado com as despesas e receitas
        setDespesas(despesasFiltradas);
        setReceitas(receitasFiltradas);
      } catch (error) {
        console.log("Erro ao tentar recuperar os dados", error);
      } finally {
        setCarregando(false);
      }
    };

    fetchData();
  }, [dataInicio, dataFinal]);

  return (
    <section className="bg-[#070180] pt-12 h-[424px] max-h-[1000px]">
      <div className="h-[400px] w-[1000px] max-h-[430px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Finanças
          </p>
        </div>
        <div className="flex items-center md:h-screen h-[800px]">
          <div className="mx-auto md:max-w-4xl md:w-[1000px] space-y-4">
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
                <div className="flex items-center justify-between">
                  <form className="flex gap-2 font-bold">
                    <div>
                      <label htmlFor="inicio">Data inicio:</label>
                      <Input
                        type="date"
                        name="inicio"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="final">Data Final:</label>
                      <Input
                        type="date"
                        name="final"
                        value={dataFinal}
                        onChange={(e) => setDataFinal(e.target.value)}
                      />
                    </div>
                  </form>
                  <DialogAdicionarDespesa
                    despesas={despesas}
                    setDespesas={setDespesas}
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
                  <div className="h-[200px] overflow-y-scroll scrollbar-hide">
                    <Table>
                      <TableHeader className="border-b-2">
                        <TableRow>
                          <TableHead className="text-black font-bold text-center">
                            Vencimento
                          </TableHead>
                          <TableHead className="text-black font-bold text-center">
                            Origem
                          </TableHead>
                          <TableHead className="text-black font-bold text-center">
                            Responsável
                          </TableHead>
                          <TableHead className="text-black font-bold text-center">
                            Pago
                          </TableHead>
                          <TableHead className="text-black font-bold text-center">
                            Centro de Custo
                          </TableHead>
                          <TableHead className="text-black font-bold text-center">
                            Valor Parcial
                          </TableHead>
                          <TableHead className="text-black font-bold text-center">
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
                            <TableCell>{despesa.origemPagamento}</TableCell>
                            <TableCell>{despesa.responsavelNome}</TableCell>
                            <TableCell>
                              {despesa.pago ? "sim" : "nao"}
                            </TableCell>
                            <TableCell>{despesa.centroCusto}</TableCell>
                            <TableCell>{despesa.valorParcial}</TableCell>
                            <TableCell>{despesa.valorTotal}</TableCell>
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
                )}
              </TabsContent>
              <TabsContent value="receitas">
                <div className="flex items-center justify-between">
                  <form className="flex gap-2 font-bold">
                    <div>
                      <label htmlFor="inicio">Data inicio:</label>
                      <Input
                        type="date"
                        name="inicio"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="final">Data Final:</label>
                      <Input
                        type="date"
                        name="final"
                        value={dataFinal}
                        onChange={(e) => setDataFinal(e.target.value)}
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
                        <TableHead className="text-black font-bold text-center">
                          Origem
                        </TableHead>
                        <TableHead className="text-black font-bold text-center">
                          Responsável
                        </TableHead>
                        <TableHead className="text-black font-bold text-center">
                          Pago
                        </TableHead>
                        <TableHead className="text-black font-bold text-center">
                          Centro de Custo
                        </TableHead>
                        <TableHead className="text-black font-bold text-center">
                          Valor Parcial
                        </TableHead>
                        <TableHead className="text-black font-bold text-center">
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
                          <TableCell>{receita.origemPagamento}</TableCell>
                          <TableCell>{receita.responsavelId}</TableCell>
                          <TableCell>
                            {receita.pago
                              ? "sim".toUpperCase()
                              : "não".toUpperCase()}
                          </TableCell>
                          <TableCell>{receita.centroCusto}</TableCell>
                          <TableCell>{receita.valorParcial}</TableCell>
                          <TableCell>{receita.valorTotal}</TableCell>
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
