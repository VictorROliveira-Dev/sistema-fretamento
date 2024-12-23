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
import DialogInformacoesDespesas, { DialogInfo } from "./components/despesas/dialog-informacoes";
import DialogInformacoesReceitas from "./components/receitas/dialog-informacoes";
import DespesaPDF from "./components/despesas/dialog-document";

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
  }, [dataInicio, dataFinal]);

  return (
    <section className="bg-[#070180] px-4 py-6 md:pt-12 md:h-[425px] md:max-h-[1000px]">
      <div className="md:h-[400px] h-[550px] md:w-[1000px] mx-auto rounded-md bg-white flex flex-col">
        <div className="bg-black w-full">
          <p className="font-bold text-white text-center">
            Visualizar Finanças
          </p>
        </div>
        <div className="flex items-center md:h-screen p-10">
          <div className="mx-auto md:w-full space-y-4">
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
                <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between">
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
                              {despesa.pago ? "sim" : "nao"}
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
                                <DialogInfo despesa={despesa}/>
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
                <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between">
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
                            {receita.responsavel.nome}
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
                              <DialogInformacoesReceitas
                                receitaId={receita.id}
                              />
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
